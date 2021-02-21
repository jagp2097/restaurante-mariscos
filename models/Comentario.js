const { DataTypes, Model } = require('sequelize');
const sequelizeInstance = require('../config/app');

class Comentario extends Model {
    comentarioAutor = '';
    comentario = '';
    comentarioExperiencia = '';
    comentarioFecha = '';

    constructor(comentarioAutor, comentario, comentarioExperiencia, comentarioFecha) {
        this.comentarioAutor = comentarioAutor;
        this.comentario = comentario;
        this.comentarioExperiencia = comentarioExperiencia;
        this.comentarioFecha = comentarioFecha;
    }

}

Comentario.init({
    coment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    coment_autor: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    comentario: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    coment_experiencia: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    modelName: 'Comentario',
    tableName: 'comentarios',
    timestamps: false,
    sequelize: sequelizeInstance
});

module.exports = Comentario;