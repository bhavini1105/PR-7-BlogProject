const { Router } = require("express");
const blogController = require("../controllers/blogController");
const imgupload = require("../middleware/imageUpload");
const userAuth = require("../middleware/userAuth");
const blogRouter = Router();

blogRouter.get("/index", blogController.indexPage);
blogRouter.get("/blog", blogController.blogPage);
blogRouter.post("/addblog", imgupload, blogController.addblog);
blogRouter.get("/deleteBlog/:id", blogController.deletePage);
blogRouter.get("/editBlog/:id", blogController.editPage);
blogRouter.post("/upadate/:id", imgupload, blogController.edit);
blogRouter.get("/viewBlog/:id", blogController.viewPage);
blogRouter.get("/back", blogController.backPage);
blogRouter.get("/about", blogController.aboutPage);
blogRouter.get("/features", blogController.featurePage);
blogRouter.get("/contact", blogController.contactPage);
blogRouter.post('/contacted',blogController.contact);
blogRouter.get("/signin", blogController.signinPage);
blogRouter.post("/checked", blogController.checked);
blogRouter.get("/signup", blogController.signupPage);
blogRouter.post("/adminCreate", blogController.signup); 
blogRouter.get('/logout',blogController.logout);

blogRouter.use(userAuth);
blogRouter.get("/addblog", blogController.addblogPage);

module.exports = blogRouter;
