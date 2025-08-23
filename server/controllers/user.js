
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// signup api
const postUser = async (req, res) => {
    console.log(req.body);
   
    try {
         const { name, email, password } = req.body;
          if ( !name || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "please fill all section"
            })
        }
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(409)
                .json({ message: "user is already exist, you can directly login", success: false })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,

        });

        const savedUser = await newUser.save();
        res.status(201).send({
            success: true,
            data: savedUser,
            message: "signup successfully !!"
        })
    } catch (e) {
        res.status(500).send({
            success: false,
            message: e.message,
        })
    }

};

// login api
const postLogin = async (req, res) => {
    console.log(req.body);
    try {
        console.log("JWT Secret being used:", process.env.JWT_SECRET);
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "please fill all section"
            })
        }
        const user = await User.findOne({ email: email});
        const errorMsg = "please check your email and passwords";

        if (!user) {
            return res.send
                .json({ message: errorMsg, success: false });
        };

         const isMatch =await bcrypt.compare(password, user.password);
         console.log(isMatch);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Password", success: false });
        }
        
        const secret = process.env.JWT_SECRET && process.env.JWT_SECRET.trim() !== ""
      ? process.env.JWT_SECRET
      : "defaultSecretKey";


      console.log("JWT Secret being used:", secret);
      console.log("User password in DB:", user.password);
      console.log("Password trying to match:", password);

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            secret,
            { expiresIn: "24h" }
        );
        
           return res.status(200).send(
                {
                    message: "login successfuly!!!",
                    success: true,
                    jwtToken,
                    email:user.email,
                    name: user.name,
                }
            )
        
    } catch (e) {
        res.status(500).send({
            success: false,
            message: e.message
        })
    }

  
};

// fetch api
const getUser = async (req, res) => {
    try {
        const userData = await User.find();

        res.status(200).send(
            {
                success: true,
                data: userData,
                message: " all User data fetch successfully"
            })
    }
    catch (e) {
        res.status(500).send(
            {
                success: false,
                message: e.message
            }
        )
    }
};

const deleteUser= async (req,res)=>{
    try{
        const {id}= req.params;
        await User.findOne({_id:id});
       res.status(200).send({ success: true, message: `User is removed  successfully` });
    }catch(e){
         res.status(500).send({ success: false, message:e.message });
    }
}

export { postUser, postLogin, getUser ,deleteUser};