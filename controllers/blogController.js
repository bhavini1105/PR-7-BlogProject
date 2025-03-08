const Blog = require("../models/blogModel");
const Admin = require("../models/adminModel");
const Client = require("../models/clientModel");
const fs = require('fs');

module.exports.indexPage = async(req, res) => {
    try {
        let blogs = await Blog.find();
        console.log(blogs); 
        return res.render('index',{blogs});
    } catch (error) {
        console.log(error.message);
        return res.render('index',{blogs : []});
    }
}

module.exports.blogPage = async (req, res) => {
    try {
        let blogs = await Blog.find();
        console.log(blogs);
        return res.render('pages/blog', { blogs });
    } catch (error) {
        console.error(error);
        return res.render('pages/blog', { blogs: [] });
    }
};

module.exports.backPage = (req, res) => {
    return res.redirect('blog');
}

module.exports.addblogPage = (req, res) => {
    return res.render('pages/addblog');
}

module.exports.aboutPage =(req,res)=>{
    return res.render('pages/about');
}

module.exports.featurePage=(req,res)=>{
    return res.render('pages/feature');
}

module.exports.contactPage = async(req,res)=>{
    let{data} = req.body;
    await Client.create(data);
    return res.render('pages/contact');
}
module.exports.contact = (req,res)=>{
    return res.render('pages/contact');
}

module.exports.addblog = async (req, res) => {
    try {
        let update = { ...req.body, imgurl: req.file.path };
        let blogs = await Blog.create(update);
        console.log("created..");
        return res.render('pages/addblog');

    } catch (error) {
        console.log(error.message);
        return res.render('pages/addblog');
    }

}

module.exports.deletePage = async (req, res) => {
    try {
        let { id } = req.params;

        let blog = await Blog.findByIdAndDelete(req.params.id);
        fs.unlinkSync(blog.imgurl);
        console.log("Deleted Suceesfully....")
        return res.redirect('/blog');

    } catch (error) {
        console.log(error.message);
        return res.redirect('/blog');
    }
}

module.exports.editPage = async (req, res) => {
    try {
        let { id } = req.params;
        let blog = await Blog.findById(id);
        return res.render('pages/editblog', { blog });

    } catch (error) {
        console.log(error.message);
        return res.render('pages/editblog', { blog: [] });
    }
}

module.exports.edit = async (req, res) => {
    try {
        let { id } = req.params;
        let updateData = { ...req.body };

        if (req.file) {
            let blog = await Blog.findById(id);
            if (blog.imgurl) {
                fs.unlinkSync(blog.imgurl);
            }
            updateData.imgurl = req.file.path;
        }
        else {
            updateData.imgurl = req.body.old_imgurl;
        }

        await Blog.findByIdAndUpdate(id, updateData);
        return res.redirect('/blog');


    } catch (error) {
        return res.redirect('/blog');

    }
}

module.exports.viewPage = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        return res.render('pages/viewblog', { blog });
    } catch (error) {
        console.log(error.message);
        return res.render('pages/viewblog', { blog: [] });
    }
}

module.exports.signupPage = (req, res) => {
    return res.render('pages/signup');
}

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password, confirmpassword } = req.body;

        console.log(password);
        console.log(confirmpassword);

        if (password !== confirmpassword) {
            console.log("Password & Confirm Password should be the same!");
            return res.render("pages/signup", { error: "Passwords do not match!" });
        }

        let user = await Admin.create({ username, email, password });

        console.log("User Created:", user);
        return res.redirect("/signin");  

    } catch (error) {
        console.log(error.message);
        return res.render("pages/signup", { error: "Something went wrong!" });
    }
};


module.exports.signinPage = (req, res) => {
    return res.render('pages/signin');
}

module.exports.checked = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Admin.findOne({ username });

        if (!user) {
            console.log("User Not Found..");
            return res.render("pages/signin", { error: "User Not Found!" });
        }

        if (user.password !== password) {
            console.log("Invalid password...");
            return res.render("pages/signin", { error: "Invalid username or password!" });
        }
        res.cookie("userId", user.id);
        return res.redirect("/addblog");  

    } catch (error) {
        console.log("Authentication Error:", error.message);
        return res.render("pages/signin", { error: "Something went wrong!" });
    }
};

module.exports.logout = async(req,res)=>{
    try {
        res.clearCookie("userId");
        let blogs = await Blog.find();
        console.log(blogs); 
        return res.render('index',{blogs});
        
    } catch (error) {
     console.log(error.message);
     return res.render('pages/addblog');   
    }
}