const Comment = require('../model/commentModel');
const mongoose = require('mongoose')



const addComment = async(req,res) => {
    const comment = req.body;
    const { id } = req.params;
    const visitorId = req.visitorId

    const newComment = new Comment({ ...comment,blogId:id,creatorId:visitorId });
    try {
        const savedComment = await newComment.save();

        res.status(200).json(savedComment)
    } catch (error) {
        res.status(409).json({ message:error.message })
    }
}

const getCommentsOfSpecificBlog = async(req,res) => {
    const { id } = req.params;

    try {
        const comment = await Comment.find({blogId:id});

        res.status(200).json(comment)
    } catch (error) {
        res.status(500).json({ message:error.message })
    }
}

const getAllComments = async(req,res) => {
    try {
        const comment = await Comment.find();

        res.status(200).json(comment)
    } catch (error) {
        res.status(500).json({ message:error.message })
    }
}

const deleteComment = async(req,res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No comment with id:${id}`)

    await Comment.findByIdAndRemove(id);

    res.json({ message:"comment deleted successfully" })
}



exports.addComment = addComment;
exports.getCommentsOfSpecificBlog = getCommentsOfSpecificBlog;
exports.getAllComments = getAllComments;
exports.deleteComment = deleteComment;