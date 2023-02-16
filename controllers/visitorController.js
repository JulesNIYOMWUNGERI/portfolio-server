const Visitor = require('../model/visitorModel')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')


const visitorsignin = async(req,res) => {
    const { email,password } = req.body;

    try {
        const existingVisitor = await Visitor.findOne({ email });

        if(!existingVisitor) return res.status(404).json({ message:"Visitor not exist." });

        const isPasswordCorrect = await bcrypt.compare(password, existingVisitor.password); 

        if(!isPasswordCorrect) return res.status(400).json({ message:"Invalid credentials." });

        const token = jwt.sign({ email:existingVisitor.email,id:existingVisitor._id },process.env.VISITOR_SCREET_KEY,{ expiresIn:"2h" });

        res.status(200).json({ result:existingVisitor, token })
    } catch (error) {
        res.json(500).json({ message:"Something went wrong." })
    }
}

const visitorsignup = async(req,res) => {
    const { fullname,email,password,comfirmPassword } = req.body;

    try {
        const existingVisitor = await Visitor.findOne({ email });

        if(existingVisitor) return res.status(404).json({ message:"Visitor already exist, Signin instead." });

        if(password !== comfirmPassword) return res.status(400).json({ message:"password don't match" });

        const hashedPassword = await bcrypt.hash(password,12);

        const result = await Visitor.create({ email,password:hashedPassword,fullname });

        const token = jwt.sign({ email:result.email,id:result._id },process.env.VISITOR_SCREET_KEY,{ expiresIn:"2h" });

        res.status(200).json({ message:"signup successfully! now login!!!" })
    } catch (error) {
        res.status(500).json({ message:"Something went wrong." })
    }
}


const deleteVisitor = async(req,res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No visitor with id:${id}`)

    await Visitor.findByIdAndRemove(id);

    res.json({ message:"visitor deleted successfully" })
}




exports.visitorsignin = visitorsignin;
exports.visitorsignup = visitorsignup;
exports.deleteVisitor = deleteVisitor;
