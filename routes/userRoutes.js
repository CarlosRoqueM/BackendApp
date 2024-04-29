const usersController = require('../controllers/usersController');

module.exports = (app, upload) => {
    //GET -- Optener datos
    //POST -- Almacenar datos
    //PUT -- Actualizar datos
    //DELETE -- Eliminar datos

    //Prueba

    app.post('/api/users/create', usersController.register);

    app.post('/api/users/createWithImage', upload.array('image', 1), usersController.registerwithImage);

    app.post('/api/users/login', usersController.login);
}