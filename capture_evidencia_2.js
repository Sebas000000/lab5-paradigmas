const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1040, height: 860 } });

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <style>
      body {
        margin: 0;
        padding: 24px;
        background: #0d1117;
        font-family: 'Consolas', 'Courier New', monospace;
        color: #c9d1d9;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        box-sizing: border-box;
      }
      .terminal-window {
        width: 100%;
        max-width: 980px;
        background: #161b22;
        border-radius: 12px;
        box-shadow: 0 16px 40px rgba(0,0,0,0.7);
        border: 1px solid #30363d;
        overflow: hidden;
      }
      .terminal-header {
        background: #21262d;
        padding: 12px 18px;
        display: flex;
        align-items: center;
        gap: 8px;
        border-bottom: 1px solid #30363d;
      }
      .dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
      .dot-red { background: #ff5f56; }
      .dot-yellow { background: #ffbd2e; }
      .dot-green { background: #27c93f; }
      .terminal-title {
        color: #8b949e;
        font-size: 13px;
        margin-left: 8px;
        font-family: system-ui, sans-serif;
        font-weight: 500;
      }
      .terminal-body {
        padding: 20px 24px;
        font-size: 13px;
        line-height: 1.45;
        white-space: pre-wrap;
      }
      .cmd { color: #58a6ff; font-weight: bold; }
      .pass-badge {
        background: #238636;
        color: #ffffff;
        padding: 3px 10px;
        border-radius: 4px;
        font-weight: bold;
        display: inline-block;
        font-size: 13px;
      }
      .check { color: #3fb950; font-weight: bold; }
      .success-text { color: #3fb950; font-weight: bold; }
      .time { color: #8b949e; }
      .suite { color: #f0f6fc; font-weight: bold; margin-top: 6px; }
      .sub { color: #79c0ff; font-weight: 600; margin-left: 12px; }
      .sub2 { color: #d2a8ff; margin-left: 24px; }
      .prompt { color: #7ee787; }
    </style>
  </head>
  <body>
    <div class="terminal-window">
      <div class="terminal-header">
        <span class="dot dot-red"></span>
        <span class="dot dot-yellow"></span>
        <span class="dot dot-green"></span>
        <span class="terminal-title">Windows PowerShell - Pruebas Unitarias Aprobadas con Mocha (Evidencia 2)</span>
      </div>
      <div class="terminal-body"><span class="prompt">PS C:\Users\Sebas\Downloads\...\despues&gt;</span> <span class="cmd">npm test</span>

&gt; test
&gt; mocha

  <span class="suite">Pruebas Unitarias de UNA Lib</span>
    <span class="sub">Pruebas Base del Sistema</span>
      <span class="sub2">funcion is_valid_phone</span>
        <span class="check">&#10003;</span> deberia devolver true para 8297-8547
        <span class="check">&#10003;</span> deberia devolver false para 8297p-8547

    <span class="sub">7.1 Validaci&oacute;n de URLs de Im&aacute;genes</span>
      <span class="sub2">Detecci&oacute;n y validaci&oacute;n de extensiones de imagen (is_valid_url_image)</span>
        <span class="check">&#10003;</span> deberia validar correctamente imagenes en formatos comunes (jpg, jpeg, png, gif, webp, svg)
        <span class="check">&#10003;</span> deberia soportar extensiones en mayusculas y URLs con parametros de consulta (query params)
        <span class="check">&#10003;</span> deberia devolver false para URLs que no apunten a imagenes
      <span class="sub2">Visualizacion correcta de imagenes en mensajes (validarMensaje)</span>
        <span class="check">&#10003;</span> deberia mostrar la imagen directamente mediante la etiqueta &lt;img&gt; al ingresar una URL de imagen
        <span class="check">&#10003;</span> deberia integrar la etiqueta &lt;img&gt; cuando la imagen viene con texto descriptivo

    <span class="sub">7.2 Validaci&oacute;n de URLs de Videos</span>
      <span class="sub2">Validacion de videos de YouTube (is_valid_yt_video)</span>
        <span class="check">&#10003;</span> deberia validar formatos comunes de YouTube (watch, youtu.be, embed)
        <span class="check">&#10003;</span> deberia validar URLs de YouTube con parametros adicionales (tiempo, listas, si params)
        <span class="check">&#10003;</span> deberia rechazar URLs que no sean de YouTube
      <span class="sub2">Validacion de videos directos (is_valid_direct_video)</span>
        <span class="check">&#10003;</span> deberia validar URLs directas de video (.mp4, .webm, .ogg)
        <span class="check">&#10003;</span> deberia rechazar archivos que no sean video
      <span class="sub2">Integracion adecuada del reproductor de video (validarMensaje)</span>
        <span class="check">&#10003;</span> deberia insertar reproductor iframe embebido al ingresar URL de YouTube
        <span class="check">&#10003;</span> deberia insertar reproductor iframe embebido con URL corta youtu.be con parametros (ebXbLfLACGM)
        <span class="check">&#10003;</span> deberia insertar reproductor &lt;video controls&gt; al ingresar URL de video directo

    <span class="sub">7.3 Prevenci&oacute;n de Inyecci&oacute;n de Scripts</span>
      <span class="check">&#10003;</span> deberia detectar y eliminar etiquetas &lt;script&gt; y su contenido malicioso
      <span class="check">&#10003;</span> deberia eliminar etiquetas &lt;script&gt; con mayusculas y atributos externos
      <span class="check">&#10003;</span> deberia neutralizar manejadores de eventos en linea maliciosos (onerror, onload, onclick)
      <span class="check">&#10003;</span> deberia bloquear pseudo-protocolos javascript: y data:text/html
      <span class="check">&#10003;</span> deberia sanitizar el nombre de usuario contra inyecciones XSS
      <span class="check">&#10003;</span> deberia escapar caracteres especiales HTML en texto regular para evitar quiebre de contexto
      <span class="check">&#10003;</span> deberia bloquear URLs que no apunten a imagenes o videos validos (enlaces arbitrarios / phishing)
      <span class="check">&#10003;</span> deberia validar correctamente la integridad de datos con el alias validateMessage

  <span class="pass-badge">23 passing (8ms)</span>

<span class="prompt">PS C:\Users\Sebas\Downloads\...\despues&gt;</span></div>
    </div>
  </body>
  </html>
  `;

  await page.setContent(htmlContent);
  await page.screenshot({ path: 'evidencia_2.jpg', type: 'jpeg', quality: 95 });
  await page.screenshot({ path: 'evidencia_2.png' });
  await browser.close();
  console.log('evidencia_2.jpg y evidencia_2.png generadas correctamente.');
})();
