import React from 'react';
import { Link } from 'react-router-dom';

const DoctorDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
      <nav className="mt-6">
        <ul>
          <li><Link to="/doctor/appointments" className="text-blue-500">Appointments</Link></li>
          <li><Link to="/doctor/prescriptions" className="text-blue-500">Prescriptions</Link></li>
          <li><Link to="/doctor/diagnoses" className="text-blue-500">Diagnoses</Link></li>
          <li><Link to="/doctor/settings" className="text-blue-500">Settings</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default DoctorDashboard;
