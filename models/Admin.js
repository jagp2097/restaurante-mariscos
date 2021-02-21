const { DataTypes, Model } = require('sequelize');
const sequelizeInstance = require('../config/app');
const bcrypt = require('bcrypt');

class Admin extends Model {
    adminUsername = '';
    adminPassword = '';

    constructor(adminUsername, adminPassword) {
        this.adminUsername = adminUsername;
        this.adminPassword = adminPassword;
    }

    async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

}

Admin.init({
    // Atributos del modelo
    admin_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    admin_username: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    admin_password: {
        type: DataTypes.STRING(40),
        allowNull: false,
        validate: {
            passwordLength(value) {
                if (value.length < 8) {
                    throw new Error('La longitud de la contraseña debe ser mayor o igual a 8.');
                }
            }
        }
    }
}, {
    // Opciones del modelo
    modelName: 'Admin',
    tableName: 'admins',
    timestamps: false,
    sequelize: sequelizeInstance
});

// Hooks
Admin.beforeCreate(async (admin, options) => {
    const hashedPassword = await encryptPassword(admin.password);
    admin.password = hashedPassword;
});

Admin.beforeBulkUpdate(async options => {
    const hashedPassword = await encryptPassword(options.attributes.password);
    options.attributes.password = hashedPassword;
})

const encryptPassword = async (password) => {
    const encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword;
}

module.exports = Admin;