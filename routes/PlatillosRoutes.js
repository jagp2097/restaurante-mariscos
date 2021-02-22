const express = require('express');

const router = express.Router();

const platilloController = require('../controllers/PlatilloController');

// / => GET
router.get('/', platilloController.index);

// /platillos/:platilloId => GET -- Show
router.get('/platillos/:platilloId', platilloController.showPlatillo);

// /admins/platillos/crear => GET -- Create
router.get('/admins/platillos/crear', platilloController.createPlatillo);

// /platillos => POST -- Store 
router.post('/platillos', platilloController.storePlatillo);

// /admins/platillos/:platilloId/editar => GET -- Edit
router.get('/admins/platillos/:platilloId/editar', platilloController.editPlatillo);

// /platillos/:platilloId => POST -- Update
router.post('/platillos/:platilloId', platilloController.updatePlatillo);

// /admins/platillos/:platilloId => POST -- Delete
router.post('/admins/platillos/:platilloId', platilloController.deletePlatillo);

module.exports = router;