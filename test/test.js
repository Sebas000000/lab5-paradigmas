var val = require('../libs/unalib');
var assert = require('assert');

describe('Pruebas Unitarias de UNA Lib', function () {

  // Pruebas heredadas / base
  describe('Pruebas Base del Sistema', function () {
    describe('funcion is_valid_phone', function () {
      it('deberia devolver true para 8297-8547', function () {
        assert.equal(val.is_valid_phone('8297-8547'), true);
      });

      it('deberia devolver false para 8297p-8547', function () {
        assert.equal(val.is_valid_phone('8297p-8547'), false);
      });
    });
  });

  // Requerimiento 7.1: Validación de URLs de Imágenes
  describe('7.1 Validación de URLs de Imágenes', function () {

    describe('Detección y validación de extensiones de imagen (is_valid_url_image)', function () {
      it('deberia validar correctamente imagenes en formatos comunes (jpg, jpeg, png, gif, webp, svg)', function () {
        assert.equal(val.is_valid_url_image('http://image.com/image.jpg'), true);
        assert.equal(val.is_valid_url_image('https://example.com/foto.jpeg'), true);
        assert.equal(val.is_valid_url_image('https://cdn.site.org/assets/logo.png'), true);
        assert.equal(val.is_valid_url_image('http://image.com/image.gif'), true);
        assert.equal(val.is_valid_url_image('https://images.unsplash.com/photo.webp'), true);
        assert.equal(val.is_valid_url_image('https://vector.dev/icon.svg'), true);
      });

      it('deberia soportar extensiones en mayusculas y URLs con parametros de consulta (query params)', function () {
        assert.equal(val.is_valid_url_image('https://example.com/PHOTO.JPG'), true);
        assert.equal(val.is_valid_url_image('https://cdn.site.com/image.png?size=large&v=2'), true);
        assert.equal(val.is_valid_url_image('http://sub.domain.co/gallery/pic.gif#view'), true);
      });

      it('deberia devolver false para URLs que no apunten a imagenes', function () {
        assert.equal(val.is_valid_url_image('http://image.com/archivo.exe'), false);
        assert.equal(val.is_valid_url_image('https://sitio.com/pagina.html'), false);
        assert.equal(val.is_valid_url_image('https://sitio.com/documento.pdf'), false);
        assert.equal(val.is_valid_url_image('https://google.com'), false);
        assert.equal(val.is_valid_url_image('not-a-url'), false);
        assert.equal(val.is_valid_url_image(''), false);
        assert.equal(val.is_valid_url_image(null), false);
      });
    });

    describe('Visualizacion correcta de imagenes en mensajes (validarMensaje)', function () {
      it('deberia mostrar la imagen directamente mediante la etiqueta <img> al ingresar una URL de imagen', function () {
        var msg = JSON.stringify({
          nombre: 'Ana',
          mensaje: 'https://images.unsplash.com/photo-1546768292-fb12f6c92568.jpg',
          color: '#4f46e5'
        });
        var result = JSON.parse(val.validarMensaje(msg));
        assert.equal(result.mensaje.includes('<img'), true, 'Debe contener la etiqueta <img>');
        assert.equal(result.mensaje.includes('src="https://images.unsplash.com/photo-1546768292-fb12f6c92568.jpg"'), true, 'Debe incluir la URL en el atributo src');
        assert.equal(result.mensaje.includes('alt="Imagen compartida"'), true, 'Debe tener atributo alt');
      });

      it('deberia integrar la etiqueta <img> cuando la imagen viene con texto descriptivo', function () {
        var msg = JSON.stringify({
          nombre: 'Luis',
          mensaje: 'Mira esta foto: https://cdn.pixabay.com/photo/nature.png',
          color: '#10b981'
        });
        var result = JSON.parse(val.validarMensaje(msg));
        assert.equal(result.mensaje.includes('Mira esta foto:'), true);
        assert.equal(result.mensaje.includes('<img'), true);
        assert.equal(result.mensaje.includes('src="https://cdn.pixabay.com/photo/nature.png"'), true);
      });
    });

  });

  // Requerimiento 7.2: Validación de URLs de Videos
  describe('7.2 Validación de URLs de Videos', function () {

    describe('Validacion de videos de YouTube (is_valid_yt_video)', function () {
      it('deberia validar formatos comunes de YouTube (watch, youtu.be, embed)', function () {
        assert.equal(val.is_valid_yt_video('https://www.youtube.com/watch?v=qYwlqx-JLok'), true);
        assert.equal(val.is_valid_yt_video('https://youtu.be/qYwlqx-JLok'), true);
        assert.equal(val.is_valid_yt_video('https://www.youtube.com/embed/qYwlqx-JLok'), true);
        assert.equal(val.is_valid_yt_video('http://youtube.com/v/qYwlqx-JLok'), true);
      });

      it('deberia validar URLs de YouTube con parametros adicionales (tiempo, listas, si params)', function () {
        assert.equal(val.is_valid_yt_video('https://www.youtube.com/watch?v=qYwlqx-JLok&t=42s'), true);
        assert.equal(val.is_valid_yt_video('https://youtu.be/qYwlqx-JLok?si=abcdef12345'), true);
        assert.equal(val.is_valid_yt_video('https://youtu.be/ebXbLfLACGM?si=3zbOrvN5Y8ud54av'), true);
      });

      it('deberia rechazar URLs que no sean de YouTube', function () {
        assert.equal(val.is_valid_yt_video('https://vimeo.com/123456'), false);
        assert.equal(val.is_valid_yt_video('https://google.com'), false);
        assert.equal(val.is_valid_yt_video('https://youtube.com/about'), false);
        assert.equal(val.is_valid_yt_video(''), false);
      });
    });

    describe('Validacion de videos directos (is_valid_direct_video)', function () {
      it('deberia validar URLs directas de video (.mp4, .webm, .ogg)', function () {
        assert.equal(val.is_valid_direct_video('https://techslides.com/demos/sample-videos/small.mp4'), true);
        assert.equal(val.is_valid_direct_video('http://techslides.com/sample.webm'), true);
        assert.equal(val.is_valid_direct_video('https://media.w3.org/video.ogg'), true);
      });

      it('deberia rechazar archivos que no sean video', function () {
        assert.equal(val.is_valid_direct_video('https://sitio.com/documento.zip'), false);
        assert.equal(val.is_valid_direct_video('https://sitio.com/musica.mp3'), false);
      });
    });

    describe('Integracion adecuada del reproductor de video (validarMensaje)', function () {
      it('deberia insertar reproductor iframe embebido al ingresar URL de YouTube', function () {
        var msg = JSON.stringify({
          nombre: 'Maria',
          mensaje: 'https://www.youtube.com/watch?v=qYwlqx-JLok',
          color: '#6366f1'
        });
        var result = JSON.parse(val.validarMensaje(msg));
        assert.equal(result.mensaje.includes('<iframe'), true, 'Debe insertar elemento <iframe>');
        assert.equal(result.mensaje.includes('youtube-nocookie.com/embed/qYwlqx-JLok'), true, 'Debe incluir URL embebida con ID correcto');
        assert.equal(result.mensaje.includes('allowfullscreen'), true, 'Debe permitir pantalla completa');
      });

      it('deberia insertar reproductor iframe embebido con URL corta youtu.be con parametros (ebXbLfLACGM)', function () {
        var msg = JSON.stringify({
          nombre: 'Usuario',
          mensaje: 'https://youtu.be/ebXbLfLACGM?si=3zbOrvN5Y8ud54av',
          color: '#6366f1'
        });
        var result = JSON.parse(val.validarMensaje(msg));
        assert.equal(result.mensaje.includes('<iframe'), true);
        assert.equal(result.mensaje.includes('youtube-nocookie.com/embed/ebXbLfLACGM'), true);
      });

      it('deberia insertar reproductor <video controls> al ingresar URL de video directo', function () {
        var msg = JSON.stringify({
          nombre: 'Carlos',
          mensaje: 'https://example.com/demo.mp4',
          color: '#ec4899'
        });
        var result = JSON.parse(val.validarMensaje(msg));
        assert.equal(result.mensaje.includes('<video controls'), true, 'Debe insertar elemento <video controls>');
        assert.equal(result.mensaje.includes('src="https://example.com/demo.mp4"'), true, 'Debe tener la fuente correcta');
      });
    });

  });

  // Requerimiento 7.3: Prevención de Inyección de Scripts
  describe('7.3 Prevención de Inyección de Scripts', function () {

    it('deberia detectar y eliminar etiquetas <script> y su contenido malicioso', function () {
      var maliciousMsg = JSON.stringify({
        nombre: 'Atacante',
        mensaje: '<script>alert("Ataque XSS ejecutado");</script>Mensaje legitimo',
        color: '#000000'
      });
      var result = JSON.parse(val.validarMensaje(maliciousMsg));
      assert.equal(result.mensaje.includes('<script>'), false);
      assert.equal(result.mensaje.includes('</script>'), false);
      assert.equal(result.mensaje.includes('alert("Ataque XSS ejecutado")'), false);
      assert.equal(result.mensaje.includes('Mensaje legitimo'), true);
    });

    it('deberia eliminar etiquetas <script> con mayusculas y atributos externos', function () {
      var maliciousMsg = JSON.stringify({
        nombre: 'Atacante',
        mensaje: '<SCRIPT SRC="https://evil.com/xss.js"></SCRIPT>Hola',
        color: '#000000'
      });
      var result = JSON.parse(val.validarMensaje(maliciousMsg));
      assert.equal(result.mensaje.includes('<SCRIPT'), false);
      assert.equal(result.mensaje.includes('evil.com'), false);
      assert.equal(result.mensaje.includes('Hola'), true);
    });

    it('deberia neutralizar manejadores de eventos en linea maliciosos (onerror, onload, onclick)', function () {
      var maliciousMsg = JSON.stringify({
        nombre: 'Usuario',
        mensaje: '<img src="invalido" onerror="alert(document.cookie)">Texto seguro',
        color: '#000000'
      });
      var result = JSON.parse(val.validarMensaje(maliciousMsg));
      assert.equal(result.mensaje.includes('onerror'), false);
      assert.equal(result.mensaje.includes('alert(document.cookie)'), false);
    });

    it('deberia bloquear pseudo-protocolos javascript: y data:text/html', function () {
      var maliciousMsg = JSON.stringify({
        nombre: 'Usuario',
        mensaje: 'javascript:alert(1)',
        color: '#000000'
      });
      var result = JSON.parse(val.validarMensaje(maliciousMsg));
      assert.equal(result.mensaje.includes('javascript:'), false);
      assert.equal(result.mensaje.includes('alert(1)'), false);
    });

    it('deberia sanitizar el nombre de usuario contra inyecciones XSS', function () {
      var maliciousMsg = JSON.stringify({
        nombre: '<script>alert("Nombre XSS");</script>Hacker',
        mensaje: 'Hola grupo',
        color: '#000000'
      });
      var result = JSON.parse(val.validarMensaje(maliciousMsg));
      assert.equal(result.nombre.includes('<script>'), false);
      assert.equal(result.nombre.includes('Hacker'), true);
    });

    it('deberia escapar caracteres especiales HTML en texto regular para evitar quiebre de contexto', function () {
      var msg = JSON.stringify({
        nombre: 'Dev',
        mensaje: '<b>Negrita</b> & "Comillas" y <etiqueta>',
        color: '#000000'
      });
      var result = JSON.parse(val.validarMensaje(msg));
      assert.equal(result.mensaje.includes('&lt;b&gt;'), true);
      assert.equal(result.mensaje.includes('&amp;'), true);
      assert.equal(result.mensaje.includes('&quot;'), true);
    });

    it('deberia bloquear URLs que no apunten a imagenes o videos validos (enlaces arbitrarios / phishing)', function () {
      var msg = JSON.stringify({
        nombre: 'Sospechoso',
        mensaje: 'https://sitio-malicioso.com/phishing/login.php',
        color: '#000000'
      });
      var result = JSON.parse(val.validarMensaje(msg));
      assert.equal(result.mensaje.includes('URL no permitida'), true);
      assert.equal(result.mensaje.includes('<img'), false);
      assert.equal(result.mensaje.includes('<iframe'), false);
      assert.equal(result.mensaje.includes('<video'), false);
    });

    it('deberia validar correctamente la integridad de datos con el alias validateMessage', function () {
      var msg = JSON.stringify({
        nombre: 'Tester',
        mensaje: 'Mensaje de verificacion',
        color: '#3b82f6'
      });
      var resultado1 = val.validarMensaje(msg);
      var resultado2 = val.validateMessage(msg);
      assert.equal(resultado1, resultado2);
    });

  });

});
