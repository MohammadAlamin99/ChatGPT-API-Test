const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");;




// User
router.post("/UserRegistration", UserController.UserLogin);
router.post("/UserVerify", UserController.UserVerify);
router.post("/openai/text", UserController.textSend);


module.exports = router;