const express = require("express");
const {signup} = require("../../controllers/auth/controller")
const router = express.Router();

//Create new admin user
router.post("/signup", signup);

//Login admin user
//router.post("/login", login);

//Logout admin user
//router.post("/logout", logout);

module.exports = router;