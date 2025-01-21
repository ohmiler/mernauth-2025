import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Components
import Navbar from './components/Navbar'
import Home from './components/Home'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import PublicRoute from './components/PublicRoute'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [isAuthenticated, setAuth] = useState(!!localStorage.getItem('token'));

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setAuth={setAuth} />
      <div>
        <Routes>
          <Route path='/register' element={
              <PublicRoute>
                <RegisterForm />
              </PublicRoute>
            } />
          <Route path='/login' element={
              <PublicRoute>
                <LoginForm setAuth={setAuth} />
              </PublicRoute>
            } />
          <Route path='/dashboard' element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
