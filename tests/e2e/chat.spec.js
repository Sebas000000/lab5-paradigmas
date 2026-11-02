// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Pruebas End-to-End con Playwright: UNA Chat', () => {

  test.beforeEach(async ({ page }) => {
    // Navegar a la URL del chat
    await page.goto('/');
  });

  test('1. Enviar una URL de imagen y verificar que la imagen se muestra y termina de cargar en el chat', async ({ page }) => {
    // Usar localizadores (getByRole, fill, click)
    const usernameInput = page.locator('#nombre');
    const messageInput = page.locator('#m');
    const sendButton = page.getByRole('button', { name: /enviar/i });

    // URL de imagen ligera, estable y rapida
    const testImageUrl = 'https://raw.githubusercontent.com/github/explore/main/topics/javascript/javascript.png';

    // Escribir nombre y URL de imagen
    await usernameInput.fill('UsuarioImagen');
    await messageInput.fill(testImageUrl);
    await sendButton.click();

    // Verificar que la imagen aparece en la lista de mensajes
    const image = page.locator('#messages img').last();
    await expect(image).toBeVisible({ timeout: 10000 });

    // Verificar que la imagen termina de cargar en el chat
    const isLoaded = await image.evaluate((img) => {
      if (img.complete && img.naturalWidth > 0) return true;
      return new Promise((resolve) => {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      });
    });
    expect(isLoaded).toBe(true);

    // Guardar captura como evidencia
    await page.screenshot({ path: 'evidencia_4.png' });
  });

  test('2. Enviar una URL de video y verificar que el reproductor aparece y carga el contenido', async ({ page }) => {
    const usernameInput = page.locator('#nombre');
    const messageInput = page.locator('#m');
    const sendButton = page.getByRole('button', { name: /enviar/i });

    const testVideoUrl = 'https://youtu.be/ebXbLfLACGM';

    // Rellenar y enviar
    await usernameInput.fill('UsuarioVideo');
    await messageInput.fill(testVideoUrl);
    await sendButton.click();

    // Verificar que el iframe del reproductor aparece integrado
    const videoIframe = page.locator('#messages iframe').last();
    await expect(videoIframe).toBeVisible({ timeout: 10000 });
    await expect(videoIframe).toHaveAttribute('src', /youtube-nocookie\.com\/embed\/ebXbLfLACGM/);

    // Guardar captura actualizada
    await page.screenshot({ path: 'evidencia_4.png' });
  });

  test('3. Enviar script malicioso: detectar alert y verificar el saneamiento del mensaje', async ({ page }) => {
    let alertDetected = false;
    let dialogMessage = '';

    // Registrar listener de dialog ANTES del envio para detectar cualquier alert y hacer fallar la prueba si se ejecuta
    page.on('dialog', async (dialog) => {
      alertDetected = true;
      dialogMessage = dialog.message();
      await dialog.dismiss();
    });

    const usernameInput = page.locator('#nombre');
    const messageInput = page.locator('#m');
    const sendButton = page.getByRole('button', { name: /enviar/i });

    const maliciousPayload = '<script>alert("Vulnerabilidad XSS");</script>Mensaje saneado correctamente';

    await usernameInput.fill('HackerTest');
    await messageInput.fill(maliciousPayload);
    await sendButton.click();

    // Esperar aparicion del mensaje en el chat
    const lastMessage = page.locator('#messages li').last();
    await expect(lastMessage).toBeVisible({ timeout: 10000 });

    // La prueba falla si se detecto el dialogo alert()
    expect(alertDetected).toBe(false);

    // Comprobar que el script fue saneado o eliminado
    const messageBody = await lastMessage.locator('.msg-body').innerHTML();
    expect(messageBody).not.toContain('<script>');
    expect(messageBody).not.toContain('</script>');
    expect(messageBody).not.toContain('alert(');
    expect(messageBody).toContain('Mensaje saneado correctamente');

    // Guardar captura final del resultado aprobado como evidencia 4
    await page.screenshot({ path: 'evidencia_4.png', fullPage: true });
  });

  test('4. Flujo completo integrado: imagen, video y saneamiento (Evidencia 4)', async ({ page }) => {
    const usernameInput = page.locator('#nombre');
    const messageInput = page.locator('#m');
    const sendButton = page.getByRole('button', { name: /enviar/i });

    // 1. Imagen
    await usernameInput.fill('EstudianteUNA');
    await messageInput.fill('https://raw.githubusercontent.com/github/explore/main/topics/javascript/javascript.png');
    await sendButton.click();
    const chatImg = page.locator('#messages img').last();
    await expect(chatImg).toBeVisible({ timeout: 10000 });
    await chatImg.evaluate((img) => img.complete || new Promise((r) => { img.onload = r; img.onerror = r; }));

    // 2. Video
    await messageInput.fill('https://youtu.be/ebXbLfLACGM');
    await sendButton.click();
    const chatIframe = page.locator('#messages iframe').last();
    await expect(chatIframe).toBeVisible({ timeout: 10000 });

    // 3. Intento de Script
    await messageInput.fill('<script>alert("Ataque");</script>Prueba de seguridad superada');
    await sendButton.click();

    const lastMessage = page.locator('#messages li').last();
    await expect(lastMessage).toBeVisible({ timeout: 10000 });
    await expect(lastMessage).toContainText('Prueba de seguridad superada');

    // Breve pausa para asegurar renderizado visual completo antes de la captura
    await page.waitForTimeout(1000);

    // Guardar la captura final aprobada de todo el chat como evidencia 4
    await page.screenshot({ path: 'evidencia_4.png', fullPage: true });
  });

});
