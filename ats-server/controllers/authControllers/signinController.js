const jwt = require('jsonwebtoken')

const User = require("../../models/User");
const Hospital = require("../../models/Hospital");
const Ambulance = require("../../models/Ambulance");


const userSignin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) { // checking if email and password is provided
        return res.status(400).json({ error: "Email and password are required" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.isCorrectPassword(password, user.password))) {
            return res.status(400).json({ error: "Email or Password is incorresct" });
        }
        const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ user_id: user._id, isLoggedIn: true, username: user.name, token });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}


const hospitalSignin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) { // checking if email and password is provided
        return res.status(400).json({ error: "Email and password are required" });
    }
    try {
        const hospital = await Hospital.findOne({ email });
        if (!hospital || !(await hospital.isCorrectPassword(password, hospital.password))) {
            return res.status(400).json({ error: "Email or Password is incorresct" });
        }
        const token = jwt.sign({ hospital_id: hospital._id }, process.env.JWT_SECRET);
        res.status(200).json({ hospital_id: hospital._id, isLoggedIn: true, username: hospital.name, token });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}

const ambulanceSignin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) { // checking if email and password is provided
        return res.status(400).json({ error: "Email and password are required" });
    }
    try {
        const ambulance = await Ambulance.findOne({ email });
        if (!ambulance || !(await ambulance.isCorrectPassword(password, ambulance.password))) {
            return res.status(400).json({ error: "Email or Password is incorresct" });
        }
        const token = jwt.sign({ ambulance_id: ambulance._id }, process.env.JWT_SECRET);
        res.status(200).json({ ambulance_id: ambulance._id, isLoggedIn: true, username: ambulance.name, token });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}


module.exports = { userSignin, hospitalSignin, ambulanceSignin };