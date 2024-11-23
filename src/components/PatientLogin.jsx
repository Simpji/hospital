import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PatientLogin = ({ patients }) => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const patient = patients.find(p => p.email === email && p.isActive);
    
    if (patient) {
      navigate('/patientportal');
    } else {
      alert('Invalid email or account not activated. Please check and try again.');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Patient Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition">
          Login
        </button>
      </form>
      <Link to="/registerPatient" className="mt-4 inline-block text-blue-500 hover:underline">
        Don't have an account? Register here
      </Link>
    </div>
  );
};

export default PatientLogin;
