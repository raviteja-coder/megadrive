// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Signup.css'; // Import CSS file for styling

function Signup() {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State for error handling

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/auth/signup', { name, email, password });
        
            navigate('/todos'); // Redirect to login after successful signup
        } catch (err) {
            console.error(err);
            setError('Signup failed. Please try again.'); // Set error message
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            <form onSubmit={handleSignup} className="signup-form">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
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
                <button type="submit">Signup</button>
                {error && <p className="error-message">{error}</p>} {/* Show error message if exists */}
            </form>
            <p className="login-link">
                Already have an account? <span onClick={() => navigate('/login')} className="link">Login</span>
            </p>
        </div>
    );
}

export default Signup;
