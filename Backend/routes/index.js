const express = require("express");
const AuthController = require("../controllers/authController");
const auth = require("../middlewares/auth");

const router = express.Router();


//testing

router.get("/testing", (req, res) => {
    res.json({ msg: "Working...." });
})

//user


//Login

router.post("/login", AuthController.login)
//Register
router.post("/register", AuthController.register)
//Logout
router.post("/logout", auth, AuthController.logout)
//refresh
router.get("/refreshtoken", AuthController.refreshToken)


//Blog
//CRUD
//Create
//Update
//read all Blogs
// read by Id
//Delete


// Comment
//Create Comment
// Read Comments by Blog Id


module.exports = router;