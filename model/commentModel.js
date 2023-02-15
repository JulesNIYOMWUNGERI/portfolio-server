const mongoose = require('mongoose');


const commentSchema = mongoose.Schema({
    creatorId:{ type: String, required: true },
    blogId:{ type: String, required: true },
    commentValue:{ type: String, required: true },
},{timestamps:true});

module.exports = mongoose.model('Comment',commentSchema)