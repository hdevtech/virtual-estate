import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { estate_backend } from 'declarations/estate_backend';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [sex, setSex] = useState('');
  const [district, setDistrict] = useState('');
  const [password, setPassword] = useState('');
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const message = await estate_backend.registerUser(fullName, nationalId, sex, district, password);
      setMessage(message);
      navigate('/login'); // Redirect to /login on successful registration
    } catch (error) {
      console.error('Error registering user:', error);
      setMessage('Failed to register user.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container mt-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="row justify-content-center"
      >
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2>Register</h2>
              <p className="text-muted">Virtual Estate Planning Workshop Platform</p>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input type="text" className="form-control" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="nationalId" className="form-label">National ID</label>
                  <input type="text" className="form-control" id="nationalId" value={nationalId} onChange={(e) => setNationalId(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="sex" className="form-label">Sex</label>
                  <input type="text" className="form-control" id="sex" value={sex} onChange={(e) => setSex(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="district" className="form-label">District</label>
                  <input type="text" className="form-control" id="district" value={district} onChange={(e) => setDistrict(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-3" disabled={processing}>{processing ? 'Processing...' : 'Register'}</button>
                {message && <p className="text-danger">{message}</p>}
              </form>
              <div className="text-center">
                <span>Already have an account?</span> &nbsp;
                <a href="/login" className="btn btn-secondary">Login</a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
