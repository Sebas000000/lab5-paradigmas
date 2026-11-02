// Modulo de validacion y utilidades para UNA Lib

module.exports = {

  // Valida si un numero telefonico tiene un formato valido
  is_valid_phone: function (phone) {
    if (!phone || typeof phone !== 'string') return false;
    var isValid = false;
    var re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i;

    try {
      isValid = re.test(phone.trim());
    } catch (e) {
      console.log(e);
    }
    return isValid;
  },

  // Valida si una URL apunta a una imagen con extension valida
  is_valid_url_image: function (url) {
    if (!url || typeof url !== 'string') return false;
    var isValid = false;
    // Soporta http y https con extensiones de imagen comunes (jpg, jpeg, png, gif, bmp, webp, svg)
    var re = /^https?:\/\/[^\s$.?#].[^\s]*\.(?:jpg|jpeg|png|gif|bmp|webp|svg)(?:[\?#][^\s]*)?$/i;

    try {
      isValid = re.test(url.trim());
    } catch (e) {
      console.log(e);
    }
    return isValid;
  },

  // Valida si una URL corresponde a un video de YouTube valido
  is_valid_yt_video: function (url) {
    if (!url || typeof url !== 'string') return false;
    var isValid = false;
    var re = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})(?:[^\s]*)?$/i;

    try {
      isValid = re.test(url.trim());
    } catch (e) {
      console.log(e);
    }
    return isValid;
  },

  // Valida si una URL corresponde a un video directo (mp4, webm, ogg, mov)
  is_valid_direct_video: function (url) {
    if (!url || typeof url !== 'string') return false;
    var isValid = false;
    var re = /^https?:\/\/[^\s$.?#].[^\s]*\.(?:mp4|webm|ogg|ogv|mov)(?:[\?#][^\s]*)?$/i;

    try {
      isValid = re.test(url.trim());
    } catch (e) {
      console.log(e);
    }
    return isValid;
  },

  // Valida si una URL es de cualquier video soportado (YouTube o directo)
  is_valid_video: function (url) {
    return this.is_valid_yt_video(url) || this.is_valid_direct_video(url);
  },

  // Detecta si una cadena parece ser una URL
  is_url: function (str) {
    if (!str || typeof str !== 'string') return false;
    var re = /^(?:https?:\/\/|www\.)[^\s/$.?#].[^\s]*$/i;
    return re.test(str.trim());
  },

  // Extrae el ID de 11 caracteres de un video de YouTube
  getYTVideoId: function (url) {
    if (!url || typeof url !== 'string') return '';
    var match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/i);
    return match ? match[1] : '';
  },

  // Genera el codigo iframe incrustado para YouTube
  getEmbeddedCode: function (url) {
    var id = this.getYTVideoId(url);
    if (!id) return '';
    return '<iframe width="420" height="240" src="https://www.youtube-nocookie.com/embed/' + id + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="max-width: 100%; border-radius: 8px; margin-top: 6px;"></iframe>';
  },

  // Genera el tag de reproductor para videos directos (HTML5)
  getVideoTag: function (url) {
    var cleanUrl = this.sanitizeUrl(url);
    return '<video controls style="max-width: 420px; width: 100%; max-height: 280px; border-radius: 8px; margin-top: 6px;"><source src="' + cleanUrl + '">Su navegador no soporta el reproductor de video.</video>';
  },

  // Genera el tag HTML de imagen segura
  getImageTag: function (url) {
    var cleanUrl = this.sanitizeUrl(url);
    return '<img src="' + cleanUrl + '" alt="Imagen compartida" referrerpolicy="no-referrer" style="max-height: 350px; max-width: 100%; border-radius: 8px; margin-top: 6px; display: block;" />';
  },

  // Sanitiza una URL para uso seguro en atributos HTML src
  sanitizeUrl: function (url) {
    if (!url || typeof url !== 'string') return '';
    return url.replace(/["'<>]/g, '').trim();
  },

  // Escapa caracteres especiales de HTML para prevenir inyecciones XSS
  escapeHTML: function (str) {
    if (!str || typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },

  // Elimina scripts y codigo malicioso
  cleanMaliciousCode: function (str) {
    if (!str || typeof str !== 'string') return '';
    var cleaned = str;
    // Elimina tags <script>...</script> y su contenido
    cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    // Elimina pseudo-protocolos completos javascript:, data:, vbscript:
    cleaned = cleaned.replace(/javascript\s*:\s*[^\s"'>]*/gi, '');
    cleaned = cleaned.replace(/vbscript\s*:\s*[^\s"'>]*/gi, '');
    cleaned = cleaned.replace(/data\s*:\s*text\/html[^\s"'>]*/gi, '');
    // Elimina controladores de eventos inline: onload, onerror, onclick, etc.
    cleaned = cleaned.replace(/on\w+\s*=\s*(["'][^"']*["']|[^\s>]+)/gi, '');
    // Neutraliza llamadas maliciosas comunes (alert, eval, prompt, confirm)
    cleaned = cleaned.replace(/(?:alert|eval|prompt|confirm)\s*\([^)]*\)/gi, '');
    return cleaned;
  },

  // Metodo principal para validar y procesar mensajes del chat
  validarMensaje: function (msg) {
    // Manejo de entrada invalida
    if (!msg) {
      return JSON.stringify({ nombre: 'Sistema', mensaje: '', color: '#000000' });
    }

    try {
      var obj;
      if (typeof msg === 'string') {
        try {
          obj = JSON.parse(msg);
        } catch (parseErr) {
          obj = { mensaje: msg, nombre: 'Anonimo', color: '#000000' };
        }
      } else if (typeof msg === 'object') {
        obj = msg;
      } else {
        obj = { mensaje: String(msg), nombre: 'Anonimo', color: '#000000' };
      }

      // Validar y sanitizar nombre
      var nombre = obj.nombre || 'Anonimo';
      nombre = this.cleanMaliciousCode(nombre);
      nombre = this.escapeHTML(nombre);
      obj.nombre = nombre.trim() || 'Anonimo';

      // Validar color hexadecimal
      var colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      if (!obj.color || !colorRegex.test(obj.color)) {
        obj.color = '#000000';
      }

      var rawMensaje = (obj.mensaje !== undefined && obj.mensaje !== null) ? String(obj.mensaje).trim() : '';

      // Primero limpiar codigo malicioso y scripts
      var cleanMensaje = this.cleanMaliciousCode(rawMensaje);

      // Evaluar si el mensaje completo es una URL
      var words = cleanMensaje.split(/\s+/);
      var isSingleUrl = words.length === 1 && (this.is_url(cleanMensaje) || /^https?:\/\//i.test(cleanMensaje));

      if (isSingleUrl) {
        var targetUrl = cleanMensaje;
        // Solo permitir URLs de imagen o video validos
        if (this.is_valid_url_image(targetUrl)) {
          obj.mensaje = this.getImageTag(targetUrl);
        } else if (this.is_valid_yt_video(targetUrl)) {
          obj.mensaje = this.getEmbeddedCode(targetUrl);
        } else if (this.is_valid_direct_video(targetUrl)) {
          obj.mensaje = this.getVideoTag(targetUrl);
        } else {
          // URL no es imagen ni video valido -> rechazar / no permitir
          obj.mensaje = '<span style="color: #d9534f; font-style: italic;">[URL no permitida: Solo se permiten enlaces a im&aacute;genes o videos v&aacute;lidos]</span>';
        }
      } else {
        // El mensaje contiene texto, o multiples palabras con posibles URLs
        var urlFinder = /(https?:\/\/[^\s]+)/gi;
        var urlsFound = cleanMensaje.match(urlFinder);

        if (urlsFound && urlsFound.length > 0) {
          var processedText = cleanMensaje;
          for (var i = 0; i < urlsFound.length; i++) {
            var foundUrl = urlsFound[i];
            if (this.is_valid_url_image(foundUrl)) {
              processedText = processedText.replace(foundUrl, '<br>' + this.getImageTag(foundUrl));
            } else if (this.is_valid_yt_video(foundUrl)) {
              processedText = processedText.replace(foundUrl, '<br>' + this.getEmbeddedCode(foundUrl));
            } else if (this.is_valid_direct_video(foundUrl)) {
              processedText = processedText.replace(foundUrl, '<br>' + this.getVideoTag(foundUrl));
            } else {
              // Si la URL dentro del texto no es imagen ni video valido, se bloquea
              processedText = processedText.replace(foundUrl, '<span style="color: #d9534f; font-style: italic;">[URL no permitida]</span>');
            }
          }
          obj.mensaje = processedText;
        } else {
          // Es texto plano: escapar HTML para prevenir inyecciones
          obj.mensaje = this.escapeHTML(cleanMensaje);
        }
      }

      return JSON.stringify(obj);
    } catch (e) {
      console.log('Error procesando mensaje:', e);
      return JSON.stringify({ nombre: 'Error', mensaje: 'Error al procesar el mensaje', color: '#d9534f' });
    }
  },

  // Alias retrocompatible para validarMensaje
  validateMessage: function (msg) {
    return this.validarMensaje(msg);
  }

};