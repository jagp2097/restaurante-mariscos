const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');

// /admins => GET -- indexAdmins
router.get('/admins', adminController.indexAdmins);

// /admins/platillos => GET -- indexPlatillos
router.get('/admins/platillos', adminController.indexPlatillos);

// /admins/crear => GET -- createAdmin
router.get('/admins/crear', adminController.createAdmin);

// /admins => POST -- storeAdmin
router.post('/admins', adminController.storeAdmin);

// /admins/:adminId/edit => GET -- editAdmin
router.get('/admins/:adminId/editar', adminController.editAdmin);

// /admins/:adminId => POST -- updateAdmin
router.post('/admins/:adminId', adminController.updateAdmin);

// /admins/:adminId => POST -- deleteAdmin
router.post('/admins/:adminId/eliminar', adminController.deleteAdmin);

module.exports = router;