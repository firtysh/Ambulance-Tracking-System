import axios  from "axios";
axios.defaults.baseURL = 'http://localhost:5000/api';

const getAmbulances = async () =>{
    const response = await  axios.get('/ambulance');
    return response.data
}

export {getAmbulances}