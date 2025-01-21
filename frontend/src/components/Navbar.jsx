import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar({ isAuthenticated, setAuth }) {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setAuth(false);
        navigate('/login');
    };

  return (
    <div className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className="container">
            <Link className='navbar-brand' to='/'>MERNauth</Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarNav'>
                <ul className='navbar-nav ms-auto'>
                    {!isAuthenticated ? (
                        <>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/login'>Login</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/register'>Register</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/dashboard'>Dashboard</Link>
                            </li>
                            <li className='nav-item'>
                                <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar