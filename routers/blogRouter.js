const { Router } = require("express");

const blogController = require('../controllers/blogController');
const blogRouter = Router();

blogRouter.get('/',blogController.homePage);

module.exports = blogRouter;