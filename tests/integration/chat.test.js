const request = require('supertest');
const { app, http } = require('../../server');
const validation = require('../../libs/unalib');

describe('Pruebas de Integración: Backend Express y una-lib', () => {

  // Limpieza y cierre adecuado de conexiones al terminar la suite
  afterAll((done) => {
    if (http && http.listening) {
      http.close(done);
    } else {
      done();
    }
  });

  afterEach(() => {
    // Restaurar cualquier spy despues de cada prueba
    jest.restoreAllMocks();
  });

  describe('Verificacion de integracion con validarMensaje de una-lib', () => {

    test('debe comprobar que el backend llama realmente a validarMensaje de una-lib al recibir una solicitud', async () => {
      const spyValidar = jest.spyOn(validation, 'validarMensaje');

      const payload = {
        nombre: 'UsuarioTest',
        mensaje: 'Hola mundo desde prueba de integracion',
        color: '#4f46e5'
      };

      const response = await request(app)
        .post('/mensaje')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(spyValidar).toHaveBeenCalled();
      expect(response.body).toHaveProperty('nombre', 'UsuarioTest');
      expect(response.body).toHaveProperty('mensaje', 'Hola mundo desde prueba de integracion');
    });

  });

  describe('Casos de prueba de integracion requeridos', () => {

    test('Caso 1 - URL de imagen valida: el backend acepta el mensaje (Status 200 y tag <img>)', async () => {
      const payload = {
        nombre: 'Carlos',
        mensaje: 'https://images.unsplash.com/photo-1546768292-fb12f6c92568.jpg',
        color: '#10b981'
      };

      const response = await request(app)
        .post('/mensaje')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(200);

      // Comprobar que el backend acepta el mensaje y que genero la etiqueta <img>
      expect(response.body.mensaje).toContain('<img');
      expect(response.body.mensaje).toContain('src="https://images.unsplash.com/photo-1546768292-fb12f6c92568.jpg"');
      expect(response.body.mensaje).toContain('alt="Imagen compartida"');
    });

    test('Caso 2a - URL de video valida (YouTube): el backend acepta el mensaje (Status 200 y tag <iframe>)', async () => {
      const payload = {
        nombre: 'Ana',
        mensaje: 'https://www.youtube.com/watch?v=qYwlqx-JLok',
        color: '#6366f1'
      };

      const response = await request(app)
        .post('/mensaje')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(200);

      // Comprobar que el backend acepta el mensaje y que genero el reproductor embebido
      expect(response.body.mensaje).toContain('<iframe');
      expect(response.body.mensaje).toContain('youtube-nocookie.com/embed/qYwlqx-JLok');
      expect(response.body.mensaje).toContain('allowfullscreen');
    });

    test('Caso 2b - URL de video valida (Directo MP4): el backend acepta el mensaje (Status 200 y tag <video>)', async () => {
      const payload = {
        nombre: 'Luis',
        mensaje: 'https://techslides.com/demos/sample-videos/small.mp4',
        color: '#ec4899'
      };

      const response = await request(app)
        .post('/mensaje')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(200);

      // Comprobar que el backend acepta el mensaje y que inserta el reproductor nativo
      expect(response.body.mensaje).toContain('<video controls');
      expect(response.body.mensaje).toContain('src="https://techslides.com/demos/sample-videos/small.mp4"');
    });

    test('Caso 3a - Intento de inyeccion de script: el backend devuelve contenido saneado (Status 200)', async () => {
      const payload = {
        nombre: 'Atacante',
        mensaje: '<script>alert("xss")</script>Texto seguro recibido',
        color: '#000000'
      };

      const response = await request(app)
        .post('/mensaje')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(200);

      // Comprobar que la validacion elimino el script malicioso y devolvio el contenido saneado
      expect(response.body.mensaje).not.toContain('<script>');
      expect(response.body.mensaje).not.toContain('</script>');
      expect(response.body.mensaje).not.toContain('alert("xss")');
      expect(response.body.mensaje).toContain('Texto seguro recibido');
    });

    test('Caso 3b - URL no permitida: la validacion rechaza la entrada (Status 400 y mensaje explicativo)', async () => {
      const payload = {
        nombre: 'UsuarioSospechoso',
        mensaje: 'https://sitio-malicioso.com/phishing/login.php',
        color: '#000000'
      };

      const response = await request(app)
        .post('/mensaje')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(400);

      // Comprobar que la validacion rechazo la URL arbitraria/no permitida
      expect(response.body.mensaje).toContain('URL no permitida');
      expect(response.body.mensaje).not.toContain('<img');
      expect(response.body.mensaje).not.toContain('<iframe');
    });

  });

});
