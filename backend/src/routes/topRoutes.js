const express = require("express");

const router = express.Router();

const {
    getTop10GroupA,
} = require("../controllers/TopController");

router.get("/group-a", getTop10GroupA);

module.exports = router;