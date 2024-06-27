import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { estate_backend } from 'declarations/estate_backend';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion'; // Import Framer Motion for animations

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (id === 'admin' && password === 'admin') {
      // If admin credentials, log in as admin
      const adminUser = { id: 'admin', role: 'admin' };
      onLogin(adminUser);
      navigate('/admin');
      return;
    }

    try {
      const user = await estate_backend.loginUser(id, password);

      if (user) {
        // If user info is returned from backend, log in as citizen
        const citizenUser = { id: user.id, role: 'citizen' };
        onLogin(citizenUser);
        navigate('/dashboard');
      } else {
        setErrorMessage('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Failed to login. Please try again later.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h2 className="text-center">Virtual Estate Planning Workshop Platform</h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                  <div className="mb-3">
                    <label htmlFor="id" className="form-label">User ID</label>
                    <input
                      type="text"
                      className="form-control"
                      id="id"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="btn btn-primary w-100 mb-3"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Login
                  </motion.button>
                </form>
                <div className="text-center">
                  <span>Don't have an account?</span> &nbsp;
                  <Link to="/register" className="btn btn-secondary">Register</Link>
                </div>
                {/* Dummy Data Row */}
                <div className="mt-3 text-center">
                  <h5>Dummy Data for admin account:</h5>
                  <p>User ID: admin, Password: admin</p>
                  <p>For citizen user please register</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Login;
