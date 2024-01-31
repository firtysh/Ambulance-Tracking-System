import axios  from "axios";
axios.defaults.baseURL = 'http://localhost:5000/api';
const getHospitals  = async ()=>{
    const response = await axios.get('/hospital')
    return response.data
}

export {getHospitals}