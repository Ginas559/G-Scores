const { Op } = require("sequelize");

const Student = require("../models/Student");

const sequelize = require("../config/database");

const getTop10GroupA = (req, res) => {

    Student.findAll({

        attributes: [

            "sbd",

            "toan",

            "vat_li",

            "hoa_hoc",

            [
                sequelize.literal("toan + vat_li + hoa_hoc"),
                "tong_diem",
            ],

        ],

        where: {

            toan: {

                [Op.ne]: null,

            },

            vat_li: {

                [Op.ne]: null,

            },

            hoa_hoc: {

                [Op.ne]: null,

            },

        },

        order: [

            [
                sequelize.literal("tong_diem"),
                "DESC",
            ],

        ],

        limit: 10,

    })

        .then((students) => {

            res.status(200).json(students);

        })

        .catch((err) => {

            console.log(err);

            res.status(500).json({

                message: "Internal server error.",

            });

        });

};

module.exports = {
    getTop10GroupA,
};