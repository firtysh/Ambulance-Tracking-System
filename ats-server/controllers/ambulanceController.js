const Ambulance = require("../models/Ambulance");

const getAmbulances = async (req,res)=>{
    const ambulances = await Ambulance.find({},{password:0});
    console.log(ambulances);
    res.json({ambulances})
}


const updateLocation = async(req,res)=>{
    const {lat,long} = req.location;
    if(!lat || !long){
        res.status(400).json({message: "All fields are required"})
        return;
    }
    const result = await Ambulance.findByIdAndUpdate(req.user.ambulance_id,{location : {latitude : lat, longitude : long}},{
        new : true
    })
    res.json({message : "Location Updated Successfully"})
}

module.exports =  {getAmbulances,updateLocation}