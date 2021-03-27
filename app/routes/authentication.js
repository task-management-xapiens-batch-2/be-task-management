const express = require("express");
const router = express.Router();
const { validate } = require("./../common/middleware/validate");
const { loginSchema } = require("./../common/helpers/validationSchema");
const AuthController = require("../controller/authController");

router.post("/login", validate(loginSchema), AuthController.login);
router.post("/create", validate(loginSchema), AuthController.register);

module.exports = {
  router,
};
