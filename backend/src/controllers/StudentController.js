const Student = require("../models/Student");

const getStudentBySbd = (req, res) => {

    Student.findOne({
        where: {
            sbd: req.params.sbd,
        },
    })

    .then((student) => {

        if (!student) {

            return res.status(404).json({
                message: "Student not found.",
            });

        }

        res.status(200).json(student);

    })

    .catch((err) => {

        console.log(err);

        res.status(500).json({
            message: "Internal server error.",
        });

    });

};

module.exports = {
    getStudentBySbd,
};