import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/profile', { headers: { Authorization: token } });
      setProfile(res.data);
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.put('/profile', profile, { headers: { Authorization: token } });
    alert('Profile updated');
  };

  return (
    <form onSubmit={handleUpdateProfile}>
      <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Name" />
      <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} placeholder="Email" />
      <input type="password" value={profile.password} onChange={(e) => setProfile({ ...profile, password: e.target.value })} placeholder="Password" />
      <button type="submit">Update Profile</button>
    </form>
  );
}

export default Profile;
