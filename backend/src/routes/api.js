const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const upload = require("multer")({ dest: "uploads/" });




// User
router.post("/UserRegistration", UserController.UserLogin);
router.post("/UserVerify", UserController.UserVerify);
router.post("/openai/text", UserController.textSend);
router.post("/openai/image", upload.single("image"), UserController.sendImage);


module.exports = router;