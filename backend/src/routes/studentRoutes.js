const express = require("express");
const router = express.Router();

const { getStudentBySbd } = require("../controllers/StudentController");
const { validateStudentSbd } = require("../validators/studentValidator");

router.get("/:sbd", validateStudentSbd, getStudentBySbd);

module.exports = router;