
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

function Login() {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/login', { email, password });
            
            localStorage.setItem('token', response.data.token);
            navigate('/todos'); 
        } catch (err) {
            console.error('Login failed:', err);
            setError('Invalid email or password');
        }
    };

   

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="login-form">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
                {error && <p className="error-message">{error}</p>} 
            </form>
            <p className="signup-link">
                Don't have an account? <span onClick={() => navigate('/signup')} className="link">Create New Account</span>
            </p>
        </div>
    );
}

export default Login;
