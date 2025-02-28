const express = require("express");
const db = require("./configs/database");
const port = 8089;

const app =  express();
app.set('view engine','ejs');

app.use('/',require('./routers'))

app.listen(port , (err)=>{
    db();
    if(!err){
        console.log("Server Star on ");
        console.log("http://localhost:"+port);
    }
})