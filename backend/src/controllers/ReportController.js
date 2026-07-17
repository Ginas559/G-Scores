const { Op } = require("sequelize");

const Student = require("../models/Student");

const getReport = (req, res) => {

    const subjects = [
        "toan",
        "ngu_van",
        "ngoai_ngu",
        "vat_li",
        "hoa_hoc",
        "sinh_hoc",
        "lich_su",
        "dia_li",
        "gdcd",
    ];

    const result = {};

    const promises = subjects.map((subject) => {

        return Promise.all([

            Student.count({
                where: {
                    [subject]: {
                        [Op.gte]: 8,
                    },
                },
            }),

            Student.count({
                where: {
                    [subject]: {
                        [Op.gte]: 6,
                        [Op.lt]: 8,
                    },
                },
            }),

            Student.count({
                where: {
                    [subject]: {
                        [Op.gte]: 4,
                        [Op.lt]: 6,
                    },
                },
            }),

            Student.count({
                where: {
                    [subject]: {
                        [Op.lt]: 4,
                    },
                },
            }),

        ]);

    });

    Promise.all(promises)

        .then((counts) => {

            subjects.forEach((subject, index) => {

                result[subject] = {

                    ">=8": counts[index][0],

                    "6-8": counts[index][1],

                    "4-6": counts[index][2],

                    "<4": counts[index][3],

                };

            });

            res.status(200).json(result);

        })

        .catch((err) => {

            console.log(err);

            res.status(500).json({

                message: "Internal server error.",

            });

        });

};

module.exports = {
    getReport,
};