const jwt = require("jsonwebtoken");
// const { TableHints } = require("sequelize/types");

const generateJwt = (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
    algorithm: "HS512",
    expiresIn: 60 * 60 * 72,
  });
  return token;
};

const verifyJwt = (tokenInput) => {
    // const auth = req.headers.authorization;
    // console.log(auth);
    
      const token = tokenInput.split(" ")[1];
      const response = jwt.verify(token, process.env.JWT_SECRET_KEY);
      // if (response !== {}) {
      return response
      // }
};

module.exports = { generateJwt, verifyJwt };
