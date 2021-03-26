const express = require("express");
const router = express.Router();
const { router: routerLogin } = require("./authentication");

router.use("/auth", routerLogin);

module.exports = { router };
    