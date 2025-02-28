const { Router } = require("express");
const blogRouter = require("./blogRouter");

const indexRouter = Router();

indexRouter.get('/',blogRouter);

module.exports = indexRouter;