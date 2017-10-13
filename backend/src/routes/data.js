import express from "express";
import mongoose from "mongoose";

var router = express.Router();

// Protected Route, use this to store routes that needed authentication
router.get("/getTasks", (req, res) => {
    res.send('some tasks')
})

module.exports = router;