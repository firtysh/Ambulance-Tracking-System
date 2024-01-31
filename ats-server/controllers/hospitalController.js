const Hospital = require("../models/Hospital");

const getHospitals = async (req,res)=>{
    const hospitals = await Hospital.find({},{password:0});
    console.log(hospitals);
    res.json({hospitals })
}

module.exports=  {getHospitals}