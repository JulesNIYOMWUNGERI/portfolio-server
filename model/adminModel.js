const mongoose = require('mongoose');


const adminSchema = mongoose.Schema({
    fullname:{ type: String, required: true },
    email:{ type: String, required: true },
    password:{ type: String, required: true },
    img:{ type: String, default:"" },
    id:{ type: String}
});

module.exports = mongoose.model('Admin',adminSchema)