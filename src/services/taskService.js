
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

const getTasks = async () => {
    const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
};

const createTask = async (taskData) => {
    const response = await axios.post(API_URL, taskData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
};

const updateTask = async (taskId, taskData) => {
    const response = await axios.put(`${API_URL}/${taskId}`, taskData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
};

const deleteTask = async (taskId) => {
    await axios.delete(`${API_URL}/${taskId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
};

export default {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};
