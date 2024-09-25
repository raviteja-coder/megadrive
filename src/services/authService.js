
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; 


const signup = async (name, email, password) => {
    const response = await axios.post(`${API_URL}/signup`, { name, email, password });
    return response.data; 
};


const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
};


const logout = () => {
    localStorage.removeItem('token'); 
};


const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    return token; 
};

export default {
    signup,
    login,
    logout,
    getCurrentUser,
};
