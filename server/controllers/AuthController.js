const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userModel = new UserModel({ name, email, password: hashedPassword });

        await userModel.save();
        res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(400).json({ error: "Error creating user" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(400).json({ error: "Incorrect password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            email,
            name: user.name,
        });
        console.log(token);
    } catch (error) {
        console.error("Login error:", error);
        res.status(400).json({ error: "Error logging in" });
    }
};

module.exports = { signup, login };
