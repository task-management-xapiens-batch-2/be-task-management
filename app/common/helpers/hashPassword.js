const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashing = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return {
    salt,
    hash,
  };
};

module.exports = { hashing };
