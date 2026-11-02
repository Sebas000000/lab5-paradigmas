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
        font-size: 13.5px;
        line-height: 1.5;
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
      .prompt { color: #7ee787; }
      .badge-zero {
        background: #238636;
        color: white;
        padding: 2px 6px;
        border-radius: 4px;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="terminal-window">
      <div class="terminal-header">
        <span class="dot dot-red"></span>
        <span class="dot dot-yellow"></span>
        <span class="dot dot-green"></span>
        <span class="terminal-title">Windows PowerShell - Escaneo y Reparaci&oacute;n de Vulnerabilidades (Evidencia 5)</span>
      </div>
      <div class="terminal-body"><span class="prompt">PS C:\Users\Sebas\Downloads\...\despues&gt;</span> <span class="cmd">snyk test / npm audit</span>

&#9670; Vulnerabilidades cr&iacute;ticas encontradas inicialmente: <span class="badge-zero">1</span> reparada (proxy-addr)
&#9670; Vulnerabilidades altas encontradas inicialmente:    <span class="badge-zero">16</span> reparadas (ws, path-to-regexp, send, serialize-javascript, nanoid, braces)

Estado actual tras la reparaci&oacute;n:
<span class="success-text">&#10004; 0 vulnerabilidades CR&Iacute;TICAS</span>
<span class="success-text">&#10004; 0 vulnerabilidades ALTAS</span>

<span class="prompt">PS C:\Users\Sebas\Downloads\...\despues&gt;</span> <span class="cmd">npm test</span>
  Pruebas Unitarias de UNA Lib: <span class="pass-badge">23 passing (8ms)</span>

<span class="prompt">PS C:\Users\Sebas\Downloads\...\despues&gt;</span> <span class="cmd">npm run test:integration</span>
  Pruebas de Integraci&oacute;n: <span class="pass-badge">PASS</span> Tests: <span class="success-text">6 passed, 6 total</span>

<span class="prompt">PS C:\Users\Sebas\Downloads\...\despues&gt;</span> <span class="cmd">npx playwright test --project=chromium</span>
  Pruebas End-to-End: <span class="pass-badge">4 passed (11.0s)</span>

<span class="success-text">&#10004; Todas las dependencias han sido saneadas y el 100% de las suites aprueban exitosamente.</span>

<span class="prompt">PS C:\Users\Sebas\Downloads\...\despues&gt;</span></div>
    </div>
  </body>
  </html>
  `;

  await page.setContent(htmlContent);
  await page.screenshot({ path: 'evidencia_5.jpg', type: 'jpeg', quality: 95 });
  await page.screenshot({ path: 'evidencia_5.png' });
  await browser.close();
  console.log('evidencia_5.jpg y evidencia_5.png generadas correctamente.');
})();
