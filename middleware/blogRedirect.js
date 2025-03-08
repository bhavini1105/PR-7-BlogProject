
const blogRedirect =(req,res,next) =>{
    if(req.url === '/'){
        return res.redirect('index');
    }
    return next();
}

module.exports = blogRedirect;