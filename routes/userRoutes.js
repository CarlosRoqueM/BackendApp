const usersController = require('../controllers/usersController');

module.exports = (app, upload) => {
    //GET -- Optener datos
    //POST -- Almacenar datos
    //PUT -- Actualizar datos
    //DELETE -- Eliminar datos

    /* --------------------- Rutas de usuarios --------------------- */


    app.post('/api/users/create', usersController.register);

    app.post('/api/users/create/enfermero', upload.array('image', 1),usersController.registerwithImage2);

    app.post('/api/users/createWithImage', upload.array('image', 1), usersController.registerwithImage);

    app.post('/api/users/login', usersController.login);

    /* --------------------- Rutas de traer enfermeros --------------------- */

    app.get('/api/users/roles', usersController.getAll);

    app.get('/api/users/findByRoles/:id_rol', usersController.findByRoles);


    /* --------------------- Rutas de traer enfermeros --------------------- */

    app.get('/api/users/nurses', usersController.getAllNurses);

    /* --------------------- Rutas de traer busqueda enfermeros --------------------- */

    app.get('/api/users/nurses/:lastname1', usersController.findByLastName);

    

    /* --------------------- Update --------------------- */

    app.put('/api/users/update', upload.array('image', 1), usersController.updatewithImage);
    app.put('/api/users/updateWithOutImage', usersController.updatewithOutImage);
}