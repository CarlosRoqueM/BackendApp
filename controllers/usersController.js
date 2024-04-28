const User = require('../models/user');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports =  {

    login(req, res){
        const email = req.body.email;
        const password = req.body.password;

        User.findByEmail(email, async (err, myUser) => {
            
            console.log('Usuario', myUser);
            console.log('Error', err);

            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Error en la autenticación del usuario',
                    error: err 
                });
            } 
            //El cliente no tiene autorizacion para realizar la peticion
            if(!myUser){
                return res.status(401).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            const isPasswordValid = await bycrypt.compare(password, myUser.password);

            if(isPasswordValid){
                const token = jwt.sign({
                    id: myUser.id,
                    email: myUser.email
                }, keys.secretOrkey, {});

                const data = {
                    id: `${myUser.id}`,
                    email: myUser.email,
                    name: myUser.name,
                    lastname1: myUser.lastname1,
                    lastname2: myUser.lastname2,
                    phone: myUser.phone,
                    location: myUser.location,
                    image: myUser.image,
                    dni: myUser.dni,
                    password: myUser.password,
                    session_token: `JWT ${token}`
                }

                return res.status(201).json({
                    success: true,
                    message: 'Autenticación exitosa',
                    data: data
                });
            }else{
                return res.status(401).json({
                    success: false,
                    message: 'Contraseña incorrecta'
                });
            }
        });
    },

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
