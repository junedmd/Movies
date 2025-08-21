
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// signup api
const postUser = async (req, res) => {
    console.log(req.body);
   
    try {
         const { name, email, password } = req.body;
          if ( !name || !email || !password) {
            return res.send({
                success: false,
                message: "please fill all section"
            })
        }
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(409)
                .json({ message: "user is already exist, you can directly login", success: "false" })
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
        const { email, password } = req.body;

        if (!email || !password) {
            return res.send({
                success: false,
                message: "please fill all section"
            })
        }
        const response = await User.findOne({ email: email });
        const errorMsg = "please check your email and passwords";

        if (!response) {
            return res.status(409)
                .json({ message: errorMsg, success: false });
        };

        const isEqual = await bcrypt.compare(password, response.password);
        if (!isEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false })
        }

        const jwtToken = jwt.sign(
            { email: response.email, _id: response._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        )
        
            res.status(200).send(
                {
                    message: "login successfuly!!!",
                    success: true,
                    jwtToken,
                    email,
                    name: response.name,
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