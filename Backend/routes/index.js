const express = require("express");
const AuthController = require("../controllers/authController");
const auth = require("../middlewares/auth");
const BlogController = require("../controllers/blogController");
const CommentController = require("../controllers/commentController");

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
router.post("/blog", BlogController.Create);

//Update
router.put("/blog", auth, BlogController.updateBlog);
// //read all Blogs
router.get("/blog/all", auth, BlogController.GetAllBlogs);
// // read by Id
router.get("/blog/:id", auth, BlogController.GetById);
// //Delete
router.delete("/blog/:id", auth, BlogController.DeleteBlog);



// Comment
//Create Comment
// Read Comments by Blog Id

// comment
// create 
router.post('/comment', auth, CommentController.create);

// get 
router.get('/comment/:id', auth, CommentController.getById);
module.exports = router;