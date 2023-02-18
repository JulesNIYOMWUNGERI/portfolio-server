const Admin = require('../model/adminModel')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const signIn = async(req,res) => {
    const { email,password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });

        if(!existingAdmin) return res.status(404).json({ message:"Admin not exist." });

        const isPasswordCorrect = await bcrypt.compare(password, existingAdmin.password); 

        if(!isPasswordCorrect) return res.status(400).json({ message:"Invalid credentials." });

        const token = jwt.sign({ email:existingAdmin.email,id:existingAdmin._id },process.env.ADMIN_SCREET_KEY);

        res.status(200).json({ result:existingAdmin, token })
    } catch (error) {
        res.json(500).json({ message:"Something went wrong." })
    }
}

const signUp = async(req,res) => {
    const { fullname,email,password,comfirmPassword } = req.body;
    console.log(fullname)
    console.log(email)
    console.log(password)
    console.log(comfirmPassword)
    try {
        const oneAdmin = await Admin.find();

        if(oneAdmin.length !== 0) return res.status(404).json({ message:"you are not allowed to be admin!, please go to blog details and signup as visitor!!!"});

        const existingAdmin = await Admin.findOne({ email });

        if(existingAdmin) return res.status(404).json({ message:"Admin already exist, Signin instead." });

        if(password !== comfirmPassword) return res.status(400).json({ message:"password don't match" });

        const hashedPassword = await bcrypt.hash(password,12);

        const result = await Admin.create({ email,password:hashedPassword,fullname });

        const token = jwt.sign({ email:result.email,id:result._id },process.env.ADMIN_SCREET_KEY,{ expiresIn:"2h" });

        res.status(200).json({ message:"signup successfully! now login!!!" })
    } catch (error) {
        res.status(500).json({ message:"Something went wrong." })
    }
}


const updateAdmin = async(req,res) => {
    const { id } = req.params;
    const { fullname,email,img } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Admin with id:${id}`);

    const updatedAdmin = { fullname, email, img, _id:id }

    await Admin.findByIdAndUpdate(id, updatedAdmin, { new: true })

    res.status(200).json(updatedAdmin)
}



exports.signIn = signIn;
exports.signUp = signUp;
exports.updateAdmin = updateAdmin;
