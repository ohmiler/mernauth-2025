import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Dashboard() {
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const token = localStorage.getItem('token');

    useEffect(() => {
        axios
        .get('http://localhost:5000/api/protected', {
            headers: {
                'x-auth-token': token,
            },
        })
        .then((response) => {
            setData(response.data);
            console.log('Protected data:', response.data);
        })
        .catch((error) => {
            console.error('Error:', error.response?.data || error.message);
        });
    }, [])
    

  return (
    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header text-center">
                        <h3>Dashboard</h3>
                    </div>
                    <div className="card-body">
                        <p>Welcome to your dashboard! This is a protected route.</p>
                        <ul>
                            <li>Your ID: {data.user?.id}</li>
                            <li>Your Email: {data.user?.email}</li>
                            <li>Your Username: {data.user?.username}</li>
                        </ul>
                        <button onClick={handleLogout} className="btn btn-danger w-100">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard