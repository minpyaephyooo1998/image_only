const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "upload/",
  filename: function(req, file, cb) {
    cb(null, file.originalname + "-" + Date.now() + ".png");
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect file");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter,
  limits: {
    fieldSize: 5000000,
  },
});

router.get("/", (req, res, next) => {
  Post.find((err, data) => {
    if (err) {
      return next(err);
    } else {
      res.json(data);
    }
  });
});

router.post("/upload", upload.single("upload"), function(req, res) {
  // console.log(req.body);
  console.log(req.file);
  Post({ file: req.file.path }).save(function(err, data) {
    if (err) throw err;
    res.json(data);
  });
});

module.exports = router;
