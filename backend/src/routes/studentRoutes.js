const express = require("express");

const router = express.Router();

const {
    getStudentBySbd,
} = require("../controllers/StudentController");

router.get("/:sbd", getStudentBySbd);

module.exports = router;