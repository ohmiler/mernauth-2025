import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function LoginForm({ setAuth }) {
    const [formData, setFormData] = useState({ email: '', password: ''});
    const [error, setError] = useState('');
    const navigation = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, 
        [e.target.name]: e.target.value 
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            setAuth(true);
            navigation('/dashboard')
        } catch (error) {
            setError('Invalid email or password');
            console.error(error);
        }
    };

  return (
    <div className='container mt-5'>
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header text-center">
                        <h3>Login Form</h3>
                    </div>
                    <div className='card-body'>
                        {error && <div className='alert alert-danger'>{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="email">Email Address</label>
                                <input 
                                    type="email" 
                                    className='form-control'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password" 
                                    className='form-control' 
                                    name='password' 
                                    value={formData.password}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <button type='submit' className='btn btn-primary w-100'>Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginForm