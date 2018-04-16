var models = require('../models/index');
var config = require('../config/config');

module.exports = {
    autenticar(req,res){
        return models.Usuario.autenticar(req,res);
    },
    refreshToken(req,res){
        var username = req.body.username
        var refreshToken = req.body.refreshToken
        if((refreshToken in refreshTokens) && (refreshTokens[refreshToken]==username)){
            var user = {
                'username': username,
            }
            var token = jwt.sign(user, config.secret, { expiresIn: 300 })
            res.json({token: 'JWT'+token})

            return res.json({
                success: true,
                message: 'Aca esta el token refrescado',
                token: token
            });
        }else{
            return res.send(401)
        }
    }
}