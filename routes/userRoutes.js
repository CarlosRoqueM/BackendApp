const usersController = require('../controllers/usersController');

module.exports = (app) => {
    //GET -- Optener datos
    //POST -- Almacenar datos
    //PUT -- Actualizar datos
    //DELETE -- Eliminar datos

    app.post('/api/users/create', usersController.register);
}