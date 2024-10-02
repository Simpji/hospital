import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const RegisterPatient = ({ onRegister }) => {
  const [patientData, setPatientData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setPatientData({ ...patientData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ ...patientData, isActive: false });
    setPatientData({ name: '', email: '', dateOfBirth: '' });
    navigate('/patients');
  };

  const handleGoToPatients = () => {
    navigate('/patients'); 
  };

  return (
    <div className="bg-white shadow-md rounded px-8 py-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Register New Patient</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="block border border-gray-300 rounded w-full py-2 px-3 mb-4 focus:outline-none focus:border-blue-500"
          name="name"
          value={patientData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          className="block border border-gray-300 rounded w-full py-2 px-3 mb-4 focus:outline-none focus:border-blue-500"
          name="email"
          value={patientData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          className="block border border-gray-300 rounded w-full py-2 px-3 mb-4 focus:outline-none focus:border-blue-500"
          name="dateOfBirth"
          value={patientData.dateOfBirth}
          onChange={handleChange}
          placeholder="Date of Birth"
          required
        />
        <button className="bg-blue-500 text-white rounded py-2 w-full hover:bg-blue-600 transition duration-200">
          Register
        </button>
      </form>
      <div className="text-center mt-4">
        <button 
          onClick={handleGoToPatients} 
          className="text-blue-500 underline hover:text-blue-700"
        >
          Go to Patient Management
        </button>
      </div>
    </div>
  );
};

export default RegisterPatient;