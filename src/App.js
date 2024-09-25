
import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import TodoList from './components/TodoList';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/todos" element={<TodoList />} />
                <Route path="/" element={<Navigate to="/signup" />} />
            </Routes>
        </Router>
    );
}

export default App;
