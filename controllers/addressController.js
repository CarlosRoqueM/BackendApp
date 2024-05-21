const Address = require('../models/address');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage');
const { create } = require('../models/user');


module.exports =  {

    findByUser: (req, res) => {
            
            const id_user = req.params.id_user;
    
            Address.findByUser(id_user, (err, data) => {
    
                if(err){
                    return res.status(501).send({
                        success: false,
                        message: 'Error al obtener las direcciones',
                        error: err
                    });
                }
    
                return res.status(200).json(data);
            })
        },

    create: (req, res) => {

        const address = req.body;

        Address.create(address, (err, id) => {

            if(err){
                return res.status(501).send({
                    success: false,
                    message: 'Error al crear la dirección',
                    error: err
                });
            }

            return res.status(201).send({
                success: true,
                message: 'Dirección creada',
                data: `${id}`
            });
        })
    },

}