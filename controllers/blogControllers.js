const Blog = require('../model/blogModel');
const mongoose = require('mongoose');


const getAllBlogs = async(req,res) => {
    try{
        const blogs = await Blog.find();


        res.status(200).json(blogs)
    }catch (error){
        res.status(404).json({ message:error.message})
    }
}

const getBlogById = async(req,res) => {
    const { id }= req.params;

    try {
        const blog = await Blog.findById(id);

        res.status(200).json(blog)
    } catch (error) {
        res.status(404).json({ message:"There is no blog with such id" })
    }
}

const addBlog = async(req,res) => {
    const blog = req.body;

    const newBlog = new Blog(blog)

    try {
        await newBlog.save();

        res.status(201).json(newBlog)
    } catch (error) {
        res.status(400).json({ message:message.error })
    }
}

const updateBlog = async(req,res) => {
    const { id } = req.params;
    const { title,desc,img } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No blog with id:${id}`);

    const updatedBlog = { title, desc, img, _id:id }

    await Blog.findByIdAndUpdate(id, updatedBlog, { new: true })

    res.status(200).json(updatedBlog)
}

const deleteBlog = async(req,res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No blog with id:${id}`)

    await Blog.findByIdAndRemove(id);

    res.status(200).json({ message:"blog deleted successfully" })
}

const blogLiking = async(req,res) => {
    const visitorId = req.visitorId;
    const { id } = req.params;

    try {
        await Blog.findByIdAndUpdate(id,{
            $addToSet:{likes:visitorId}
        });

        res.status(200).json({ message:"Blog has been liked!"})
    } catch (error) {
        res.status(500).json({ message:error.message })
    }
}








exports.blogLiking = blogLiking;
exports.deleteBlog = deleteBlog;
exports.updateBlog = updateBlog;
exports.addBlog = addBlog;
exports.getBlogById = getBlogById;
exports.getAllBlogs = getAllBlogs;
