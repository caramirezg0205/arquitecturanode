var models = require('../models/index');
var activos = require('../models/activo')

module.exports = {
    showmessage(req,res){
        console.log('controlador activos');
        res.send('respond with a resource');
    },
    list(req, res){
        return models.Activo.getactivos(req, res);
    },
    crear(req, res){
        return models.Activo.crear(req, res);
    },
    actualizar(req, res){
        return models.Activo.actualizar(req, res);
    },
    eliminar(req, res){
        return models.Activo.eliminar(req, res);
    }
}