'use strict';
var Sequelize = require('sequelize');
var jwt = require('jsonwebtoken');
var randtoken = require('rand-token')
const TokensRefresh = require('../models').TokensRefresh;
var config = require('../config/config');

module.exports = function(sequelize, DataTypes){
    var Usuario = sequelize.define('Usuario',{
        username: Sequelize.STRING(100),
        password: Sequelize.STRING(100),

    },{
        timestamps:false,
        underscored:true,
        tableName: 'usuarios'
    });
    /* Autentica al usuario asignandole un token */
    Usuario.autenticar = function (req, res) {
        Usuario.findOne({
            attributes: ['id','username','password'],
            where: {
                id:1
            }
        }).then(usuario =>{
            if(!usuario) {
                return res.json({ success: false, message: 'Usuario no encontrado' });
            }
            if(usuario.password != req.body.password){
                return res.json({ success: false, message: 'Password incorrecto' });
            }else{
                var payload = {
                    username: usuario.username
                }
                var token = jwt.sign(payload,config.secret,{
                    expiresIn: 300
                });
                
                var refreshToken = randtoken.uid(256)
                //refreshTokens[refreshToken] = username 
               /*console.log(usuario.username)
               TokensRefresh.create({ token: refreshToken, username: usuario.username})
                .then(tokenRefreshed =>{
                   
                    
                })
                .catch(error => res.status(400).send('Error al registrar el token: ', error))
                */
                return res.json({
                    success: true,
                    message: 'Aca esta el token',
                    token: token,
                    refreshToken: refreshToken
                });
                
            }

        })
    }

    return Usuario;
}
