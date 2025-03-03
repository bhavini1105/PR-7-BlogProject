const blogRedirect =(req,res,next) =>{
    if(req.url === '/'){
        return res.render('index');
    }
    return next();
}

module.exports = blogRedirect;