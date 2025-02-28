const { default: mongoose } = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    imgUrl: String,
    contact: String,
},{timestamps : true});

const Blog = mongoose.model('BlogTBL',blogSchema);

module.exports = Blog;