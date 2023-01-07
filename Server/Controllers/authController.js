const userModel = require('../Models/userSchema')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


const authController = {
    signup: async (req, res) => {
        const { fname, lname, email, password } = req.body;
        if (!fname || !lname || !email || !password) {
            res.status(400).json({
                message: "Required Fields are Missing!!",
            })
            return
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const objToSend = {
            fname,
            lname,
            email,
            password: hashPassword
        }
        userModel.findOne({email}, (err, user) => {
            console.log(email, "email")
            if (err) {
                res.status(500).json({
                    message: "Something Went Wrong!!!"
                })
            }
            else {
                if (user) {
                    res.status(400).json({
                        message: "E-mail Already Exist!!!"
                    })
                }
                else {
                    userModel.create(objToSend, (err, data) => {
                        if (err) {
                            res.status(500).json({
                                message: "Something Went Wrong!!!"
                            })
                        }
                        else {
                            res.status(200).json({
                                message: "User Created Successfully!!!",
                                data: data
                            })
                        }
                    })
                }
            }
        })
    },
    login: (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Required Fields are Missing!!!" })
            return
        }
        userModel.findOne({email},async(err,user)=>{
            if(err){
                res.status(500).json({
                    message:"Something Went Wrong!!!"
                })
            }
            else{
                if(user){
                    isPasswordMatch = await bcrypt.compare(password, user.password);
                    if(isPasswordMatch){
                        const tokenObj = {
                            ...user,
                          };
                          const token = jwt.sign(tokenObj, "userLogin");
                          console.log(token, "token");
                        res.status(200).json({
                            message:"Login Success!!!",
                            data:user,
                            token
                        })
                    }
                    else{
                        res.status(400).json({
                            message:"Credential Error!!!"
                        })
                    }
                }
                else{
                    res.status(400).json({message:"E-mail Does Not Exist"})
                }
            }
        })
    },
}

module.exports = authController;