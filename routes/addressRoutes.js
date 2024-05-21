const addressController = require('../controllers/addressController');

module.exports = (app, upload) => {
    //GET -- Optener datos
    //POST -- Almacenar datos
    //PUT -- Actualizar datos
    //DELETE -- Eliminar datos

   
    app.post('/api/address/create', addressController.create);
    app.get('/api/address/findByUser/:id_user', addressController.findByUser);

}