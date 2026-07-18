const express = require("express");

const router = express.Router();

const {
    getReport,
} = require("../controllers/ReportController");

router.get("/", getReport);

module.exports = router;