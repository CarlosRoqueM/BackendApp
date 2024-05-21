const User = require('../models/user');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage');
const Rol = require('../models/rol');

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
                    session_token: `JWT ${token}`,
                    roles: typeof myUser.roles === 'string' ? JSON.parse(myUser.roles) : myUser.roles
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

    ///Registro de usuario para cliente movil///

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

    },

    async registerwithImage(req, res){
    
        const user = JSON.parse(req.body.user);
        //captura de datos que se envian

        const files = req.files;

        if(files.length > 0){
            const pathImage = `image_${Date.now()}`;
            const url = await storage(files[0], pathImage);

            if(url != undefined && url != null){
                user.image = url;
            }
        }

        User.create(user, (err, data) => {

            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Error en el registro del usuario',
                    error: err 
                });
            } 

            user.id = `${data}`;

            const token = jwt.sign({
                id: user.id,
                email: user.email
            }, keys.secretOrkey, {});
            user.session_token = `JWT ${token}`;
            
            Rol.create(user.id, 2, (err, data) => {
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
                    data: user //Id del nuevo usuario
                });
            });   
        });
    },

    /* ---------------------------------- BUSQUEDA DE ENFERMEROS POR APELLIDO */

    findByLastName(req, res){
        const lastname1 = req.params.lastname1;

        User.findByLastName(lastname1, (err, data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Error en la consulta de enfermeros',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },



    ///Registro de usuario para enfermero //
    
    registerEnfermero(req, res){
    
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
        
    },

    async registerwithImage2(req, res){
    
        const user = JSON.parse(req.body.user);
        //captura de datos que se envian

        const files = req.files;

        if(files.length > 0){
            const pathImage = `image_${Date.now()}`;
            const url = await storage(files[0], pathImage);

            if(url != undefined && url != null){
                user.image = url;
        }
    }

        User.create(user, (err, data) =>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Error en el registro del usuario',
                    error: err 
                });
            } 

            user.id = `${data}`;

            const token = jwt.sign({
                id: user.id,
                email: user.email
            }, keys.secretOrkey, {});
            user.session_token = `JWT ${token}`;
            
            Rol.create2(user.id, 1, (err, data) => {
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
                    data: User //Id del nuevo usuario
                });
            });   
        });
    },






    /* ---------------------------------- ACTUALIZAR */ 
    async updatewithImage(req, res){
    
        const user = JSON.parse(req.body.user);
        //captura de datos que se envian

        const files = req.files;

        if(files.length > 0){
            const pathImage = `image_${Date.now()}`;
            const url = await storage(files[0], pathImage);

            if(url != undefined && url != null){
                user.image = url;
        }
    }

        User.update(user, (err, data) =>{

            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Error en la actualziacion del usuario',
                    error: err 
                });
            } 

            User.findByID(data, (err, myData) => {

                if(err){
                    return res.status(501).json({
                        success: false,
                        message: 'Error en la actualziacion del usuario',
                        error: err 
                    });
                } 
    
                user.session_token = user.session_token;
                if (myData && myData.roles) {
                    myData.roles = typeof myData.roles === 'string' ? JSON.parse(myData.roles) : myData.roles;
                }
                
                return res.status(201).json({
                    success: true,
                    message: 'Actualizacion exitosa',
                    data: myData
                });

            })

                
        });
    },

    async updatewithOutImage(req, res){
    
        const user = req.body;  //captura de datos que se envian //En caso falle ingrsar solo req.body

        User.updateWithOutImage(user, (err, data) =>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Error en la actualziacion del usuario',
                    error: err 
                });
            } 

            User.findByID(data, (err, myData) =>{

                if(err){
                    return res.status(501).json({
                        success: false,
                        message: 'Error en la actualziacion del usuario',
                        error: err 
                    });
                } 
    
                user.session_token = user.session_token;
                if (myData && myData.roles) {
                    myData.roles = typeof myData.roles === 'string' ? JSON.parse(myData.roles) : myData.roles;
                }

                return res.status(201).json({
                    success: true,
                    message: 'Actualizacion exitosa',
                    data: myData
                });

            })  
        });
    },

    /* ---------------------------------- TRAER ENFERMERO POR ID */

    getAllNurses(req, res){
        User.getAllNurses((err, data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Error en la consulta de enfermeros',
                    error: err 
                });
            } 

            return res.status(201).json(data);
        });
    },

    /* ---------------------------------- TRAER ENFERMEROS POR ROLES */

    findByRoles(req, res){

        const id_rol = req.params.id_rol;

        User.findByRoles(id_rol, (err, data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Error en la consulta de enfermeros',
                    error: err 
                });
            } 

            return res.status(201).json(data);
        });
    },

    /* ---------------------------------- TRAER ENFERMERO POR ID */

    getAll(req, res){
        Rol.getAll((err, data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Error en la consulta de roles',
                    error: err 
                });
            } 

            return res.status(201).json(data);
        });
    },
}
