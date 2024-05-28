const profileController = require('../controllers/profileController');

module.exports = (app, upload) => {
    //GET -- Optener datos
    //POST -- Almacenar datos
    //PUT -- Actualizar datos
    //DELETE -- Eliminar datos

   
    app.post('/api/profile/create', profileController.create);
    app.get('/api/profile/findByUser/:id_user', profileController.findByUser);
    app.post('/api/profile/createWithImage', upload.array('image', 1), profileController.createWithImage);

}