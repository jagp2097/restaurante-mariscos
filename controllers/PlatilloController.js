const Platillo = require('../models/Platillo');
const sequelizeInstance = require('../config/app');
let transaction;

const suffle = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
};

const index = async (req, res, next) => {
    try {
        const platillos = await Platillo.findAll();
        platillos = suffle(platillos);
        res.render('prueba', {
            platillos: platillos.slice(0, 5)
        });
    } catch (err) {
        console.error(`Error: ${err}`);
    }
};

const showPlatillo = async (req, res, next) => {
    try {
        const platillo = await Platillo.findOne({
            where: {
                platillo_id: req.params.platilloId
            }
        });
        if (platillo) {
            res.render('platillos/show', {
                platillo: platillo
            });
        } else {
            res.redirect('/');
        }

    } catch (err) {
        console.error(`Error: ${err}`);
    }
};

const createPlatillo = (req, res, next) => {
    res.render('admins/edit-platillo', {
        isEditing: false
    });
};

const storePlatillo = async (req, res, next) => {
    try {
        transaction = await sequelizeInstance.transaction();
        const nombrePlatillo = req.body.nombre_platillo.trim();
        const descripcionPlatillo = req.body.descripcion_platillo.trim();
        const precioPlatillo = parseFloat(req.body.precio_platillo);

        const platillo = Platillo.build({
            platillo_nombre: nombrePlatillo,
            platillo_descripcion: descripcionPlatillo,
            platillo_precio: precioPlatillo
        });

        await platillo.save({
            transaction: transaction
        });

        await transaction.commit();

        res.redirect('/');

    } catch (err) {
        await transaction.rollback();
        console.error(`Error: ${err}`);
    }
};

const editPlatillo = async (req, res, next) => {
    try {
        const platilloId = req.params.platilloId;
    
        const platillo = await Platillo.findOne({
            where: {
                platillo_id: platilloId
            }
        });
    
        res.render('admins/edit-platillo', {
            platillo: platillo,
            isEditing: true
        });
        
    } catch (err) {
        console.error(`Error: ${err}`);
    }
};

const updatePlatillo = async (req, res, next) => {
    try {
        transaction = await sequelizeInstance.transaction();
        const nombrePlatillo = req.body.nombre_platillo.trim();
        const descripcionPlatillo = req.body.descripcion_platillo.trim();
        const precioPlatillo = parseFloat(req.body.precio_platillo);
        const platilloId = req.params.platilloId;

        await Platillo.update({
            platillo_nombre: nombrePlatillo,
            platillo_descripcion: descripcionPlatillo,
            platillo_precio: precioPlatillo
        }, {
            where: {
                platillo_id: platilloId
            },
            transaction: transaction
        });

        await transaction.commit();

        res.redirect('/');

    } catch (err) {
        await transaction.rollback();
        console.error(`Error: ${err}`);
    }
};

const deletePlatillo = async (req, res, next) => {
    try {
        transaction = await sequelizeInstance.transaction();
        const platilloId = req.params.platilloId;
        await Platillo.destroy({
            where: {
                platillo_id: platilloId
            }, 
            transaction: transaction
        });
        
        await transaction.commit();

        res.redirect('/');

    } catch (err) {
        await transaction.rollback();
        console.error(`Error: ${err}`);
    }
};

module.exports = {
    index,
    showPlatillo,
    createPlatillo,
    storePlatillo,
    editPlatillo,
    updatePlatillo,
    deletePlatillo
};