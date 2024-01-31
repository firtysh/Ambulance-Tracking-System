const jwt = require('jsonwebtoken')

const User = require("../../models/User");
const Hospital = require("../../models/Hospital");
const Ambulance = require("../../models/Ambulance");


const userSignup = async (req, res) => {
    const { name, email,phone, password } = req.body;
    if (!name || !email || !password || !phone) { // checking if name, email and password is provided
      console.log(req.body);
        return res.status(400).json({ error: "Name, Email and password are required" });
    }
    try {
        const existing_user = await User.findOne({ email });
        if (existing_user) {
            return res.status(400).json({ error: "User already exists! PLease Login." });
        }
        const user = await User.create({ name, email,phone, password });
        const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ user_id: user._id, isLoggedIn: true, username: user.name, token });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}

const hospitalSignup = async (req, res) => {
    const { name, email,phone,hospitalType,latitude,longitude, password } = req.body;
    if (!name || !email || !password || !phone || !hospitalType ) { // checking if name, email and password is provided
        return res.status(400).json({ error: "Name, Email and password are required" });
    }
    try {
        const existing_hospital = await Hospital.findOne({ email });
        if (existing_hospital) {
            return res.status(400).json({ error: "Hospital already exists! PLease Login." });
        }
        const hospital = await Hospital.create({ name, email,phone, hospitalType, location:{latitude,longitude}, isVerified:true, password });
        const token = jwt.sign({ hospital_id: hospital._id }, process.env.JWT_SECRET);
        res.status(200).json({ hospital_id: hospital._id, isLoggedIn: true, username: hospital.name, token });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}

const ambulanceSignup = async (req, res) => {
    const { ambulanceType,password,driverName, phone,numberPlate} = req.body;
      if (!ambulanceType || !password || !driverName || !phone ) { // checking if name, email and password is provided
        return res.status(400).json({ error: "All fields are required" });
    }
    try {
        const existing_ambulance = await Ambulance.findOne({ numberPlate });
        if (existing_ambulance) {
            return res.status(400).json({ error: "Ambulance already exists! PLease Login." });
        }
        const ambulance = await Ambulance.create({ambulanceType,numberPlate,driverName,phone, isVerified:true, password });
        const token = jwt.sign({ ambulance_id: ambulance._id }, process.env.JWT_SECRET);
        res.status(200).json({ ambulance_id: ambulance._id, isLoggedIn: true, username: ambulance.name, token });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}


module.exports = { userSignup, hospitalSignup, ambulanceSignup };