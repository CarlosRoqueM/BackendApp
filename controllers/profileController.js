const User = require('../models/user');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage');
const Rol = require('../models/rol');
const Profile = require('../models/profile');

module.exports =  {

    create: (req, res) => {
        const profile = req.body;

        Profile.create(profile, (err, id) => {
            if(err){
                return res.status(501).send({
                    success: false,
                    message: 'Error al crear el perfil',
                    error: err
                });
            }

            return res.status(201).send({
                success: true,
                message: 'Perfil creado',
                data: `${id}`
            });
        })
    },

    async createWithImage(req, res){
        const profile = JSON.parse(req.body.profile);
        const files = req.files;

        if(files.length > 0){
            const pathImage = `image_${Date.now()}`;
            const url = await storage(files[0], pathImage);

            if(url != undefined && url != null){
                profile.image = url;
            }
        }

        Profile.create(profile, (err, id) => {
            if(err){
                return res.status(501).send({
                    success: false,
                    message: 'Error al crear el perfil',
                    error: err
                });
            }

            return res.status(201).send({
                success: true,
                message: 'Perfil creado',
                data: `${id}`
            });
        })
    },

    findByUser: (req, res) => {
        
        const id_user = req.params.id_user;

        Profile.findByUser(id_user, (err, data) => {
            if(err){
                return res.status(501).send({
                    success: false,
                    message: 'Error al obtener el perfil',
                    error: err
                });
            }

            return res.status(200).json(data);
        })
    },
}
