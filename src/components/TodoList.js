
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import { useNavigate } from 'react-router-dom';
import './TodoList.css';

function TodoList() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('User is not authenticated.');
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/tasks', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTasks(response.data);
            } catch (err) {
                console.error('Failed to fetch tasks:', err.response ? err.response.data : err.message);
                setError('Could not load tasks.');
            }
        };

        fetchTasks();
    }, []);

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTask) return;

        const token = localStorage.getItem('token');
        if (!token) {
            setError('User is not authenticated.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/tasks', 
            { title: newTask }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks([...tasks, response.data]);
            setNewTask('');
        } catch (err) {
            console.error('Error adding task:', err.response ? err.response.data : err.message);
            setError('Could not add task.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="todo-container">
            <h1>Todo List</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleAddTask} className="todo-form">
                <input 
                    type="text" 
                    value={newTask} 
                    onChange={(e) => setNewTask(e.target.value)} 
                    placeholder="Add a new task" 
                />
                <button type="submit">Add Task</button>
            </form>
            <button onClick={handleLogout} className="logout-button">Logout</button>
            <ul className="todo-list">
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
