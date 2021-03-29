const multer = require("multer");
const path = require("path");

// const uploadPhoto = multer({
//   storage: multer.diskStorage({}),
//   fileFilter: function (req, file, cb) {
//     if (
//       path.extname(file.originalname) !== ".jpg" &&
//       path.extname(file.originalname) !== ".png"
//     ) {
//       return cb(new Error("Hanya jpg png"));
//     }
//     cb(null, true);
//   },
// });

const uploadAttachment = multer({
  storage: multer.diskStorage({}),
  fileFilter: function (req, file, cb) {
    if (path.extname(file.originalname) !== ".pdf") {
      return cb(new Error("Hanya pdf"));
    }
    cb(null, true);
  },
});

module.exports = {
  uploadAttachment,
};
