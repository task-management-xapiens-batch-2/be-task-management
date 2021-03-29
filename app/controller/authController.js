const { baseResponse } = require("../common/helpers/baseResponse");
const { user } = require("../db/models");
const bcrypt = require("bcrypt");
const { generateJwt } = require("../common/middleware/auth");
const { hashing } = require("../common/helpers/hashPassword");

class AuthController {
  static async login(req, res, next) {
    try {
      const data = await user.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (data) {
        const check = bcrypt.compareSync(req.body.password, data.password);
        // console.log(check);
        if (check) {
          const payload = {
            id: data.id,
            fullname: data.fullname,
            username: data.username,
            email: data.email,
            photo: data.photo,
            role: data.role,
            spv_id: data.spv_id
          };
          payload.token = generateJwt(payload);
          return baseResponse({
            message: "logged in",
            data: { ...payload },
          })(res, 200);
        } else {
          return baseResponse({
            success: false,
            message: "wrong email or password",
          })(res, 200);
        }
      } else {
        return baseResponse({ success: false, message: "user doesn't exist" })(
          res,
          401
        );
      }
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const dataEmail = await user.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (dataEmail) {
        return baseResponse({
          success: false,
          message: "Please use different email address",
        })(res, 200);
      }

      const { salt, hash } = hashing(req.body.password);

      const data = await user.create({
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: hash,
        salt: salt,
        role: req.body.role,
        spv_id: req.body.spv_id,
      });
      return baseResponse({
        message: "user registered",
        data: data,
      })(res, 201);
    } catch (error) {
      res.status(500);
      next(error);
    }
  }
}
module.exports = AuthController;
