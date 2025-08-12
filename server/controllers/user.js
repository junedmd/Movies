
import User from "../models/user.js";


// signup api
const postUser = async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send({
            success: false,
            message: "please fill all the details"
        })
    };
    try {
        
        const newUser = new User({
            name: name,
            email: email,
            password: password,

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
        const response = await User.findOne({ email: email, password: password });

        
        if (response) {
            res.status(200).send(
                {
                    success: true,
                    data: response,
                    message: "login successfuly!!!"
                }
            )
        } else {
            res.status(500).send({
                success: false,
                message: "please correct email and password"
            })
        }
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


export { postUser, postLogin, getUser };