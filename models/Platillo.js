const { DataTypes, Model } = require('sequelize');
const sequelizeInstance = require('../config/app');

class Platillo extends Model {
    // platilloId = 0;
    // platilloNombre = '';
    // platilloDescripcion = '';
    // platilloPrecio = 0;
    
    // constructor(platilloNombre, platilloDescripcion, platilloPrecio) {
    //     super();

    //     this.platilloNombre = platilloNombre;
    //     this.platilloDescripcion = platilloDescripcion;
    //     this.platilloPrecio = parseFloat(platilloPrecio);
    // }
}

Platillo.init({
    // Atributos del modelo
    platillo_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    platillo_nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    platillo_descripcion: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    platillo_precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    // Opciones del modelo
    modelName: 'Platillo',
    tableName: 'platillos',
    timestamps: false,
    sequelize: sequelizeInstance
});

module.exports = Platillo;