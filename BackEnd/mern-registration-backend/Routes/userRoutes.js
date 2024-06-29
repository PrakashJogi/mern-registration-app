const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  registerUser,
  getUsers,
  updateUser,
  deleteUser,
  loginUser,
} = require("../Controllers/userController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/register", upload.single("profilePicture"), registerUser);

router.get("/", getUsers);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.post("/login", loginUser);

module.exports = router;
