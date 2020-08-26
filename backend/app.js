const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());
app.use("/upload", express.static("upload"));

app.use(function(err, req, res, next) {
  console.log("This is the invalid field ->", err.field);
  next(err);
});

const db = require("./config/db").mongoUrl;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Database connect successfully ${db}`);
  })
  .catch((err) => {
    console.log(`Unable to database fail ${err}`);
  });

const Post = require("./routes/post");
app.use("/api/", Post);

app.listen(PORT, () => {
  console.log(`Server was running at port ${PORT}`);
});
