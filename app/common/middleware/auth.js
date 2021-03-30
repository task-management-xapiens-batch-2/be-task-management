const jwt = require("jsonwebtoken");
// const { TableHints } = require("sequelize/types");

const generateJwt = (user) => {
  const token = jwt.sign(user, process.env.HEROKU_JWT_SECRET_KEY, {
    algorithm: "HS512",
    expiresIn: 60 * 60 * 72,
  });
  return token;
};

const verifyJwt = (tokenInput) => {
  // const auth = req.headers.authorization;
  // console.log(auth);

  const token = tokenInput.split(" ")[1];
  const response = jwt.verify(token, process.env.HEROKU_JWT_SECRET_KEY);
  // if (response !== {}) {
  return response;
  // }
};

const verifyJwtRest = (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (auth) {
      const token = auth.split(" ")[1];
      const payload = jwt.verify(token, process.env.HEROKU_JWT_SECRET_KEY);
      req.user = { ...payload };
      next();
    } else {
      res.json({message:"Need Token"});
    }
  } catch (error) {
    res.status(500);
    next(error);
  }
};

const permit = (...roles) => {
  return (req, res, next) => {
    // console.log(req.user.role)
    // console.log({user: req.user});
    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403);
      throw new Error("Tidak boleh");
    }
  };
};

module.exports = { generateJwt, verifyJwt, verifyJwtRest, permit };
