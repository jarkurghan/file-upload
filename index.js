const morgan = require("morgan");
const express = require("express");
const multer = require("multer");
const path = require("path");
const knex = require("knex");
const cors = require("cors");
const helmet = require("helmet");

require("dotenv").config();
const { PORT } = process.env;
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(helmet());

const db = knex({
  client: "pg",
  connection: `<your_database_credentials>`,
});

const fileUpload = multer({
  dest: "files",
});

app.post("/file", fileUpload.single("file"), (req, res) => {
  const { filename, mimetype } = req.file;
  db.insert({
    name: filename,
    type: mimetype
  })
    .into("files")
    .then(() => res.json({ success: true, filename }))
    .catch((err) =>
      res.json({ success: false, message: "upload failed", stack: err.stack })
    );
});

app.get("/file/:filename", middleware, (req, res) => {
  const { filename } = req.params;
  db.select("*")
    .from("files")
    .where({ name: filename })
    .then((files) => {
      if (files[0]) {
        const dirname = path.resolve();
        const fullfilepath = path.join(dirname, "files/" + files[0].name);
        return res.type(files[0].type).sendFile(fullfilepath);
      }
      return res
        .status(400)
        .json({ success: false, message: "file does not exist" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, message: "An error occurred" });
    });
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
