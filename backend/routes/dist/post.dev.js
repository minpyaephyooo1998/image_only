require("core-js/modules/es.array.find");

require("core-js/modules/es.array.includes");

var express = require("express");

var router = express.Router();

var Post = require("../models/Post");

var multer = require("multer");

var storage = multer.diskStorage({
  destination: "upload/",
  filename: function filename(req, file, cb) {
    cb(null, file.originalname + "-" + Date.now() + ".png");
  }
});

var fileFilter = function fileFilter(req, file, cb) {
  var allowedTypes = ["image/jpeg", "image/png"];

  if (!allowedTypes.includes(file.mimetype)) {
    var error = new Error("Incorrect file");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false);
  }

  cb(null, true);
};

var upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fieldSize: 5000000
  }
});
router.get("/", function (req, res, next) {
  Post.find(function (err, data) {
    if (err) {
      return next(err);
    } else {
      res.json(data);
    }
  });
});
router.post("/upload", upload.single("upload"), function (req, res) {
  // console.log(req.body);
  console.log(req.file);
  Post({
    file: req.file.path
  }).save(function (err, data) {
    if (err) throw err;
    res.json(data);
  });
});
module.exports = router;