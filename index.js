const express = require("express");
const db = require("./configs/database");
const blogRedirect = require("./middleware/blogRedirect");
const port = 8089;
const bodyParse = require('body-parser');
const Blog = require("./models/blogModel");
const cookieParser = require("cookie-parser");


const app =  express();
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParse.urlencoded({extended : true}));
app.use("/uploads",express.static(__dirname + "/uploads"));
app.use(cookieParser());

app.use(blogRedirect);
app.use('/',require('./routers'))

app.listen(port , (err)=>{
    db();
    if(!err){
        console.log("Server Star on ");
        console.log("http://localhost:"+port);
    }
})