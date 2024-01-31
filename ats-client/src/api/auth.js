import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api';

const signupUser = async (user) => {
  const response = await axios.post('/auth/signup/user', user);
  return response.data;
}

const signupHospital = async (hospital) => {
  const response = await axios.post('/auth/signup/hospital', hospital);
  return response.data;
}

const signupAmbulance = async (ambulance) => {
  const response = await axios.post('/auth/signup/ambulance', ambulance);
  return response.data;
}

const signinUser = async (user) => {
  const response = await axios.post('/auth/signin/user', user);
  return response.data;
}

const signinHospital = async (hospital) => {
  const response = await axios.post('/auth/signin/hospital', hospital);
  return response.data;
}

const signinAmbulance = async (ambulance) => {
  const response = await axios.post('/auth/signin/ambulance', ambulance);
  return response.data;
}


export { signupUser, signupHospital, signupAmbulance, signinUser, signinHospital, signinAmbulance };