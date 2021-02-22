const Admin = require('../models/Admin');
const Platillo = require('../models/Platillo');
const sequelizeInstance = require('../config/app');
let transaction;

const indexAdmins = async (req, res, next) => {
    try {
        const admins = await Admin.findAll();
        res.render('admins/admins', {
            admins: admins
        });
    } catch (err) {
        console.error(`Error: ${err}`);
    }
};

const indexPlatillos = async (req, res, next) => {
    try {
        const platillos = await Platillo.findAll();
        res.render('admins/platillos', {
            platillos: platillos
        });
    } catch (err) {
        console.error(`Error: ${err}`);
    }
};

const createAdmin = (req, res, next) => {
    res.render('admins/edit-admin', {
        isEditing: false
    });
};

const storeAdmin = async (req, res, next) => {
    try {
        transaction = await sequelizeInstance.transaction();
        const usernameAdmin = req.body.admin_username.trim();
        const password = req.body.admin_password.trim();

        const admin = await Admin.build({
            admin_username: usernameAdmin,
            admin_password: password
        });

        await admin.save({
            transaction: transaction
        });

        await transaction.commit();

        res.redirect('/admins');

    } catch (err) {
        await transaction.rollback();
        console.error(`Error: ${err}`);
    }
};

const editAdmin = async (req, res, next) => {
    try {
        const adminId = req.params.adminId;
        
        const admin = await Admin.findOne({
            where: {
                admin_id: adminId
            }
        });

        res.render('admins/edit-admin', {
            admin: admin,
            isEditing: true
        });

    } catch (err) {
        await transaction.roolback();
        console.error(`Error: ${err}`);
    }
};

const updateAdmin = async (req, res, next) => {
    try {
        transaction = await sequelizeInstance.transaction();
        const adminId = req.params.adminId;
        const password = req.body.admin_password.trim();
        
        await Admin.update({
            admin_password: password
        }, {
            where: {
                admin_id: adminId
            },
            transaction: transaction
        });
        
        await transaction.commit();

        res.redirect('/admins');

    } catch (err) {
        await transaction.rollback();
        console.error(`Error: ${err}`);
    }
};

const deleteAdmin = async (req, res, next) => {
    try {
        console.log('ewwd');
        transaction = await sequelizeInstance.transaction();
        const adminId = req.params.adminId;
        await Admin.destroy({
            where: {
                admin_id: adminId
            }, 
            transaction: transaction
        });    

        await transaction.commit();

        res.redirect('/admins');

    } catch (err) {
        await transaction.rollback();
        console.error(`Error: ${err}`);
    }
};

module.exports = {
    indexAdmins,
    indexPlatillos,
    createAdmin,
    storeAdmin,
    editAdmin,
    updateAdmin,
    deleteAdmin
};