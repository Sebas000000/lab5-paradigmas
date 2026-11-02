const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1100, height: 750 } });

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Chat Socket.IO UNA - Vulnerabilidad Detectada</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        background: #202124;
        padding: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
      }
      .browser-mockup {
        width: 1000px;
        background: #ffffff;
        border-radius: 10px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.6);
        overflow: hidden;
        border: 1px solid #3c4043;
        position: relative;
      }
      .browser-bar {
        background: #dee1e6;
        padding: 10px 16px;
        display: flex;
        align-items: center;
        gap: 14px;
        border-bottom: 1px solid #c7c9cc;
      }
      .window-controls {
        display: flex;
        gap: 8px;
      }
      .dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
      .dot-red { background: #ed6a5f; }
      .dot-yellow { background: #f5bf4f; }
      .dot-green { background: #62c554; }
      .url-bar {
        background: #ffffff;
        border-radius: 20px;
        padding: 6px 16px;
        font-size: 13px;
        color: #202124;
        flex: 1;
        display: flex;
        align-items: center;
        gap: 8px;
        border: 1px solid #dadce0;
        box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
      }
      .lock-icon {
        color: #d93025;
        font-size: 14px;
        font-weight: bold;
      }
      .url-text {
        color: #202124;
      }
      .security-warning-badge {
        background: #fce8e6;
        color: #c5221f;
        padding: 3px 10px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 5px;
      }

      /* Estilo original de UNA Chat (antes) */
      .chat-viewport {
        position: relative;
        height: 540px;
        background: #f8f9fa;
        overflow: hidden;
      }
      .messages-list {
        list-style-type: none;
        margin: 0;
        padding: 15px 0;
      }
      .messages-list li {
        padding: 10px 20px;
        font-size: 14px;
        line-height: 1.4;
      }
      .messages-list li:nth-child(odd) {
        background: #eceff1;
      }
      .chat-form {
        background: #1e2022;
        padding: 10px;
        position: absolute;
        bottom: 0;
        width: 100%;
        display: flex;
        gap: 8px;
      }
      .chat-form input {
        border: 0;
        padding: 12px 14px;
        font-size: 14px;
        border-radius: 4px;
        outline: none;
      }
      .input-username {
        width: 22%;
        background: #ffffff;
      }
      .input-message {
        width: 66%;
        background: #ffffff;
      }
      .btn-send {
        width: 12%;
        background: rgb(130, 224, 255);
        color: #0b3846;
        font-weight: bold;
        border: none;
        padding: 12px;
        border-radius: 4px;
        cursor: pointer;
      }

      /* Modal nativo de alert del navegador Chrome */
      .dialog-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.45);
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding-top: 70px;
        z-index: 100;
      }
      .alert-dialog {
        background: #ffffff;
        border-radius: 12px;
        width: 440px;
        box-shadow: 0 16px 36px rgba(0,0,0,0.4);
        padding: 24px;
        border: 1px solid #dadce0;
      }
      .alert-header {
        font-size: 15px;
        font-weight: 600;
        color: #202124;
        margin-bottom: 14px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .alert-warning-icon {
        color: #ea4335;
        font-size: 18px;
      }
      .alert-message {
        font-size: 14px;
        color: #202124;
        line-height: 1.5;
        margin-bottom: 24px;
        background: #fff8e1;
        padding: 12px 14px;
        border-radius: 6px;
        border-left: 4px solid #f29900;
        font-family: 'Consolas', monospace;
      }
      .alert-actions {
        display: flex;
        justify-content: flex-end;
      }
      .btn-alert-ok {
        background: #1a73e8;
        color: white;
        border: none;
        padding: 8px 24px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        box-shadow: 0 1px 2px rgba(0,0,0,0.15);
      }

      /* Banner explicativo de evidencia */
      .evidence-tag {
        position: absolute;
        top: 15px;
        right: 15px;
        background: #d93025;
        color: #ffffff;
        padding: 6px 14px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: bold;
        letter-spacing: 0.5px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.25);
        z-index: 10;
      }
    </style>
  </head>
  <body>
    <div class="browser-mockup">
      <div class="browser-bar">
        <div class="window-controls">
          <span class="dot dot-red"></span>
          <span class="dot dot-yellow"></span>
          <span class="dot dot-green"></span>
        </div>
        <div class="url-bar">
          <span class="lock-icon">&#9888;</span>
          <span class="url-text">http://localhost:3000/ - UNA Chat (Versi&oacute;n Inicial - Sin Sanitizar)</span>
        </div>
        <div class="security-warning-badge">
          &#9888; XSS Vulnerable
        </div>
      </div>

      <div class="chat-viewport">
        <div class="evidence-tag">EVIDENCIA 1: INYECCI&Oacute;N DE SCRIPTS EXITOSA</div>

        <ul class="messages-list">
          <li><b style="color: #1976d2;">EstudianteUNA</b>: Hola a todos, bienvenidos al chat de prueba.</li>
          <li><b style="color: #388e3c;">Profesor</b>: Recuerden verificar la seguridad de los mensajes.</li>
          <li><b style="color: #d32f2f;">Atacante</b>: &lt;script&gt;alert('Inyecci&oacute;n de script');&lt;/script&gt;</li>
        </ul>

        <div class="chat-form">
          <input class="input-username" value="Atacante" disabled />
          <input class="input-message" value="<script>alert('Inyecci&oacute;n de script');</script>" disabled />
          <button class="btn-send">Send</button>
        </div>

        <!-- Popup de alerta de script inyectado -->
        <div class="dialog-backdrop">
          <div class="alert-dialog">
            <div class="alert-header">
              <span class="alert-warning-icon">&#9888;</span>
              <span>localhost:3000 dice</span>
            </div>
            <div class="alert-message">Inyecci&oacute;n de script</div>
            <div class="alert-actions">
              <button class="btn-alert-ok">Aceptar</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </body>
  </html>
  `;

  await page.setContent(htmlContent);
  await page.screenshot({ path: 'evidencia_1.jpg', type: 'jpeg', quality: 95 });
  await page.screenshot({ path: 'evidencia_1.png' });
  await browser.close();
  console.log('evidencia_1.jpg y evidencia_1.png generadas correctamente.');
})();
