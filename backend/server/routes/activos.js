var express = require('express');
var router = express.Router();
var verifyToken = require(__root + 'controllers/verifyToken');

const activosController =   require('../controllers').activos;

/* GET users listing. */
router.get('/api/activos', activosController.showmessage);
router.get('/api/listactivos',verifyToken, activosController.list);
router.post('/api/crear',activosController.crear);
router.put('/api/actualizar',activosController.actualizar);
router.delete('/api/eliminar/:activoId',activosController.eliminar);
module.exports = router;
