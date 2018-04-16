'use strict';
var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes){
    var Activo = sequelize.define('Activo',{
            activo: Sequelize.TEXT,
            baja_logica: Sequelize.BOOLEAN
    }, {
        timestamps:false,
        underscored:true,
        //freezeTableName:true,
        tableName:'activos'
    },{
        classMethods: {
            
        },
        instanceMethods: {
            /*getactivos: function(models){
                sequelize.query("select * from activos").spread((results,metadata) => {
                    console.log('query exitoso');
                });
            }*/
        }
    });

    Activo.getactivos = function(req,res){
        return sequelize.query("select * from activos where baja_logica = true", {type: sequelize.QueryTypes.SELECT})
            .then(activos => {
                res.status(200).send(activos)
            })
            .catch(error => {
                res.status(400).send('Error en la lista de activos:', error)
            })
    }
   
    Activo.crear = function(req,res){
        return Activo.create({ activo: req.body.activo, baja_logica: true})
        .then(activo =>{
            res.status(201).send(activo)
        })
        .catch(error => res.status(400).send('Error al crear el activo: ', error))
    }

    Activo.actualizar = function(req, res) {
        console.log('id de activo'+ req.body.id)
        console.log('activo'+ req.body.activo)
        return Activo.update({
            activo : req.body.activo
        },{
            where: {
                id: req.body.id
            }
        }).then(activo =>{
            res.status(200).send(activo)
        }).catch(error => res.status(400).send('Error al actualizar el activo: ', error))
    }

    Activo.eliminar = function(req, res) {
        return Activo.update({
            baja_logica : false
        },{
            where: {
                id: req.params.activoId
            }
        }).then(activo =>{
            res.status(200).send(activo)
        }).catch(error => res.status(400).send('Error al eliminar el activo: ', error))
    }

    /*Activo.crear = function(){
        Activo.build({
            activo : 'activo de prueba con save'
        }).save().then(()=>{
            console.log('insert exitoso');
        }).catch(error=>{
            console.log('error crear:'+error);
        })
    }*/


    return Activo;
}

