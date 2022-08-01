const multer = require("multer");
const path = require("path");

const { basedir } = global;

const tmpDir = path.join(basedir, "tmp");

const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
