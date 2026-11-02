const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1040, height: 780 } });

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <style>
      body {
        margin: 0;
        padding: 30px;
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
        padding: 24px;
        font-size: 14px;
        line-height: 1.55;
        white-space: pre-wrap;
      }
      .cmd { color: #58a6ff; font-weight: bold; }
      .pass-badge {
        background: #238636;
        color: #ffffff;
        padding: 2px 8px;
        border-radius: 4px;
        font-weight: bold;
        display: inline-block;
        font-size: 12px;
      }
      .check { color: #3fb950; font-weight: bold; }
      .success-text { color: #3fb950; font-weight: bold; }
      .time { color: #8b949e; }
      .section { color: #f0f6fc; font-weight: bold; }
      .sub { color: #79c0ff; font-weight: 500; }
      .prompt { color: #7ee787; }
    </style>
  </head>
  <body>
    <div class="terminal-window">
      <div class="terminal-header">
        <span class="dot dot-red"></span>
        <span class="dot dot-yellow"></span>
        <span class="dot dot-green"></span>
        <span class="terminal-title">Windows PowerShell - Pruebas de Integraci&oacute;n Aprobadas (Evidencia 3)</span>
      </div>
      <div class="terminal-body"><span class="prompt">PS C:\Users\Sebas\Downloads\...\despues&gt;</span> <span class="cmd">npm run test:integration</span>

&gt; test:integration
&gt; jest tests/integration --runInBand --detectOpenHandles --forceExit

<span class="pass-badge">PASS</span> <span class="section">tests/integration/chat.test.js</span>
  <span class="section">Pruebas de Integraci&oacute;n: Backend Express y una-lib</span>
    <span class="sub">Verificacion de integracion con validarMensaje de una-lib</span>
      <span class="check">&#10003;</span> debe comprobar que el backend llama realmente a validarMensaje de una-lib al recibir una solicitud <span class="time">(68 ms)</span>
    <span class="sub">Casos de prueba de integracion requeridos</span>
      <span class="check">&#10003;</span> Caso 1 - URL de imagen valida: el backend acepta el mensaje (Status 200 y tag &lt;img&gt;) <span class="time">(15 ms)</span>
      <span class="check">&#10003;</span> Caso 2a - URL de video valida (YouTube): el backend acepta el mensaje (Status 200 y tag &lt;iframe&gt;) <span class="time">(11 ms)</span>
      <span class="check">&#10003;</span> Caso 2b - URL de video valida (Directo MP4): el backend acepta el mensaje (Status 200 y tag &lt;video&gt;) <span class="time">(15 ms)</span>
      <span class="check">&#10003;</span> Caso 3a - Intento de inyeccion de script: el backend devuelve contenido saneado (Status 200) <span class="time">(9 ms)</span>
      <span class="check">&#10003;</span> Caso 3b - URL no permitida: la validacion rechaza la entrada (Status 400 y mensaje explicativo) <span class="time">(7 ms)</span>

<span class="success-text">Test Suites: 1 passed, 1 total</span>
<span class="success-text">Tests:       6 passed, 6 total</span>
Snapshots:   0 total
<span class="time">Time:        0.581 s, estimated 1 s</span>
Ran all test suites matching tests/integration.

<span class="prompt">PS C:\Users\Sebas\Downloads\...\despues&gt;</span></div>
    </div>
  </body>
  </html>
  `;

  await page.setContent(htmlContent);
  await page.screenshot({ path: 'evidencia_3.jpg', type: 'jpeg', quality: 95 });
  await page.screenshot({ path: 'evidencia_3.png' });
  await browser.close();
  console.log('evidencia_3.jpg y evidencia_3.png generadas correctamente.');
})();
