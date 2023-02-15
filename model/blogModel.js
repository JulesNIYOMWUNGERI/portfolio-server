const mongoose = require('mongoose');


const blogSchema = mongoose.Schema({
    title:{ type:String, required:true},
    desc: { type:String, required:true},
    img: { type:String, required:true},
    likes: { type:[String],default:[] },
    createdAt: { type: Date, default:new Date() },
});


module.exports = mongoose.model('Blog',blogSchema);
