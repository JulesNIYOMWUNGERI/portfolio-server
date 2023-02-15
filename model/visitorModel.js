const mongoose = require('mongoose');


const visitorSchema = mongoose.Schema({
    fullname:{ type: String, required: true },
    email:{ type: String, required: true },
    password:{ type: String, required: true },
    id:{ type: String }
});

module.exports = mongoose.model('Visitor',visitorSchema)