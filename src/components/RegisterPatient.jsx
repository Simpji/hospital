import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPatient = ({ onRegister }) => {
  const [newPatient, setNewPatient] = useState({ name: '', dob: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ ...newPatient, isActive: true }); 
    setNewPatient({ name: '', dob: '', email: '' }); 
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md space-x-6">
      <form onSubmit={handleSubmit} className="mb-4 space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Register Patient</h2>
        <input
          type="text"
          placeholder="Name"
          value={newPatient.name}
          onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
          className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          type="date"
          value={newPatient.dob}
          onChange={(e) => setNewPatient({ ...newPatient, dob: e.target.value })}
          className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newPatient.email}
          onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
          className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <button type="submit" className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600 transition">
          Register Patient
        </button>
      </form>
      <Link to="/patientlogin" className="mt-4 inline-block text-blue-500 hover:underline">
        Already have an account? Login here
      </Link>
      <Link to="/PatientHistory" className="mt-4 inline-block text-blue-500 hover:underline">
        PatientManagement System
      </Link>
    </div>
  );
};

export default RegisterPatient;
