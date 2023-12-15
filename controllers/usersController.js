const User = require('../models/user');

module.exports =  {

    register(req, res){
    
        const user = req.body; //captura de datos que se envian

        User.create(user, (err, data) =>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Error en el registro del usuario',
                    error: err 
                });
            } 

            return res.status(201).json({
                success: true,
                message: 'Registro exitoso',
                data: data //Id del nuevo usuario
            });
        });
        
    }
}
