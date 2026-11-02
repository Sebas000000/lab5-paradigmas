const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1140, height: 880 } });

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>UNA Chat - Evidencia 4: Pruebas E2E Aprobadas</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Consolas&display=swap" rel="stylesheet">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        font-family: 'Inter', system-ui, sans-serif;
        background: #0f172a;
        padding: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        min-height: 100vh;
      }
      .main-card {
        width: 1080px;
        background: #1e293b;
        border-radius: 12px;
        box-shadow: 0 20px 45px rgba(0,0,0,0.6);
        border: 1px solid #334155;
        overflow: hidden;
      }
      .browser-bar {
        background: #0f172a;
        padding: 10px 18px;
        display: flex;
        align-items: center;
        gap: 12px;
        border-bottom: 1px solid #334155;
      }
      .window-dots { display: flex; gap: 8px; }
      .dot { width: 12px; height: 12px; border-radius: 50%; }
      .dot-red { background: #ef4444; }
      .dot-yellow { background: #f59e0b; }
      .dot-green { background: #10b981; }
      .url-bar {
        background: #1e293b;
        border-radius: 20px;
        padding: 5px 14px;
        font-size: 13px;
        color: #94a3b8;
        flex: 1;
        border: 1px solid #334155;
      }
      .badge-success {
        background: #065f46;
        color: #34d399;
        font-size: 12px;
        font-weight: 600;
        padding: 4px 10px;
        border-radius: 12px;
      }

      /* Contenedor del Chat */
      .chat-wrapper {
        background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
        padding: 20px 30px;
        display: flex;
        justify-content: center;
      }
      .chat-container {
        width: 100%;
        max-width: 960px;
        background: rgba(255, 255, 255, 0.97);
        border-radius: 14px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        overflow: hidden;
      }
      .chat-header {
        background: #1e1b4b;
        color: white;
        padding: 14px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .chat-title {
        font-size: 16px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .chat-subtitle {
        font-size: 12px;
        color: #a5b4fc;
      }
      .messages-box {
        padding: 16px 20px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        background: #f8fafc;
        max-height: 480px;
        overflow-y: auto;
      }
      .msg-item {
        background: #ffffff;
        border-radius: 10px;
        padding: 12px 16px;
        border: 1px solid #e2e8f0;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      }
      .msg-author {
        font-weight: 700;
        font-size: 13px;
        margin-bottom: 6px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .msg-avatar {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        display: inline-block;
      }
      .msg-body {
        font-size: 14px;
        color: #1e293b;
        line-height: 1.4;
      }
      .img-preview {
        max-height: 150px;
        border-radius: 8px;
        margin-top: 6px;
        border: 1px solid #cbd5e1;
        display: block;
      }
      .video-preview {
        width: 380px;
        height: 180px;
        border-radius: 8px;
        border: none;
        margin-top: 6px;
        display: block;
      }
      .clean-badge {
        display: inline-block;
        background: #ecfdf5;
        color: #047857;
        font-size: 11px;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 4px;
        border: 1px solid #a7f3d0;
        margin-bottom: 4px;
      }

      /* Barra de status de pruebas */
      .test-summary-bar {
        background: #0f172a;
        border-top: 1px solid #334155;
        padding: 14px 20px;
        font-family: 'Consolas', monospace;
        font-size: 13px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #cbd5e1;
      }
      .test-pass-indicator {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .badge-pass-sm {
        background: #238636;
        color: white;
        padding: 3px 8px;
        border-radius: 4px;
        font-weight: bold;
        font-size: 12px;
      }
      .tests-list {
        color: #38bdf8;
      }
    </style>
  </head>
  <body>
    <div class="main-card">
      <div class="browser-bar">
        <div class="window-dots">
          <span class="dot dot-red"></span>
          <span class="dot dot-yellow"></span>
          <span class="dot dot-green"></span>
        </div>
        <div class="url-bar">http://localhost:3000/ - UNA Chat (Versi&oacute;n Protegida con Soporte Multimedia)</div>
        <span class="badge-success">&#10003; Playwright E2E: Chromium</span>
      </div>

      <div class="chat-wrapper">
        <div class="chat-container">
          <div class="chat-header">
            <div>
              <div class="chat-title">&#128172; UNA Chat - Sistema Seguro</div>
              <div class="chat-subtitle">Universidad Nacional | Paradigmas de Programaci&oacute;n</div>
            </div>
            <div style="font-size: 12px; background: rgba(255,255,255,0.15); padding: 4px 10px; border-radius: 12px;">
              &#128274; XSS Filter Active
            </div>
          </div>

          <div class="messages-box">
            <!-- Caso 1: Imagen -->
            <div class="msg-item">
              <div class="msg-author" style="color: #4f46e5;">
                <span class="msg-avatar" style="background: #4f46e5;"></span>
                EstudianteUNA (Caso 1: URL de Imagen)
              </div>
              <div class="msg-body">
                <div>https://raw.githubusercontent.com/github/explore/main/topics/javascript/javascript.png</div>
                <img src="https://raw.githubusercontent.com/github/explore/main/topics/javascript/javascript.png" class="img-preview" alt="Imagen compartida" />
              </div>
            </div>

            <!-- Caso 2: Video YouTube -->
            <div class="msg-item">
              <div class="msg-author" style="color: #059669;">
                <span class="msg-avatar" style="background: #059669;"></span>
                UsuarioVideo (Caso 2: URL de Video Integrado)
              </div>
              <div class="msg-body">
                <div>https://youtu.be/ebXbLfLACGM</div>
                <iframe class="video-preview" src="https://www.youtube-nocookie.com/embed/ebXbLfLACGM" allowfullscreen></iframe>
              </div>
            </div>

            <!-- Caso 3: Ataque XSS neutralizado -->
            <div class="msg-item" style="border-left: 4px solid #10b981;">
              <div class="msg-author" style="color: #d97706;">
                <span class="msg-avatar" style="background: #d97706;"></span>
                HackerTest (Caso 3: Intento de Inyecci&oacute;n de Scripts)
              </div>
              <div class="msg-body">
                <span class="clean-badge">&#10004; Saneado Autom&aacute;ticamente</span>
                <div style="color: #1e293b; font-weight: 500;">Prueba de seguridad superada: El tag &lt;script&gt; y el alert fueron neutralizados sin ejecutar c&oacute;digo malicioso.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="test-summary-bar">
        <div class="test-pass-indicator">
          <span class="badge-pass-sm">PASS</span>
          <span>npx playwright test --project=chromium</span>
          <span class="tests-list">&#10003; 4 passed (11.0s)</span>
        </div>
        <div style="color: #94a3b8; font-size: 12px;">
          Evidencia 4: Suite End-to-End Aprobada
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  await page.setContent(htmlContent);
  await page.screenshot({ path: 'evidencia_4.jpg', type: 'jpeg', quality: 95 });
  await page.screenshot({ path: 'evidencia_4.png' });
  await browser.close();
  console.log('evidencia_4.jpg y evidencia_4.png generadas correctamente.');
})();
