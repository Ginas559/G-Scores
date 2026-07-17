const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Student = sequelize.define(
    "Student",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        sbd: {
            type: DataTypes.STRING(8),
            allowNull: false,
            unique: true,
        },

        toan: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },

        ngu_van: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },

        ngoai_ngu: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },

        vat_li: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },

        hoa_hoc: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },

        sinh_hoc: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },

        lich_su: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },

        dia_li: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },

        gdcd: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },

        ma_ngoai_ngu: {
            type: DataTypes.STRING(5),
            allowNull: true,
        },
    },
    {
        tableName: "students",
        timestamps: true,
    }
);

module.exports = Student;