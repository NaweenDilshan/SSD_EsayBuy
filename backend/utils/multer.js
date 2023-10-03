const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const fileFilter = function (req, file, callback) {
  // Allowed file types (e.g., JPEG, PNG)
  const allowedFileTypes = ["image/jpeg", "image/png"];
  
  if (allowedFileTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error("Invalid file type. Only JPEG and PNG files are allowed."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 2, // Limit file size to 2MB
  },
});

module.exports = upload;
