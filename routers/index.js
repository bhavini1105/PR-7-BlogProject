const { Router } = require("express");
const blogRouter = require("./blogRouter");
const adminRouter = require("./adminRouter");

const indexRouter = Router();

indexRouter.get('/',blogRouter);
indexRouter.get('/admin',adminRouter);

module.exports = indexRouter;