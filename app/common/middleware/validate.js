// const { string } = require("yup/lib/locale");
const yup = require("yup");

const validate = (schema) => async (req, res, next) => {
  {
    try {
      await schema.validate(req.body);
      next();
    } catch (error) {
      res.status(400);
      next(error.message);
    }
  }
};

module.exports = { validate };
