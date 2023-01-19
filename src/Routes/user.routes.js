const express = require("express");
const UserModel = require("../Schema/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const user = express.Router();
const saltRounds = 5;

user.get("/", async(req, res) => {
    const user = await UserModel.find();
    return res.send(user);
})


user.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    try {
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            // Store hash in your password DB.
            const user = new UserModel({ email, password: hash});
            await user.save();
            return res.send("Sign up successfull");
        });
        
    } catch (error) {
        return res.status(401).send("Something went wrong");
    }
});

user.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        // console.log(user)
        if (user) {
            const hashed_password = user.password;
            bcrypt.compare(password, hashed_password, function (err, result) {
                if(result) {
                    const token = jwt.sign(
                        { id: user._id,email: user.email },
                        "xyz333",
                        {
                            expiresIn: "1 day",
                        }
                    );
                    const refreshToken = jwt.sign(
                        { id: user._id, email: user.email},
                        "xxx22",
                        { expiresIn: "7 days" }
                    );
        
                    return res
                        .status(200)
                        .send({ message: "login successfull", token, refreshToken });
                }
                else {
                    return res.status(401).send("Login failed");
                }
            });
            
        }
        else {
            return res.status(404).send("User not found");
        }

    } catch (error) {
        return res.status(400).send("Invalid credentials");
    }
});


module.exports = user