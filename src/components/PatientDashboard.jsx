import React from 'react';
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Patient Dashboard</h1>
      <nav className="mt-6">
        <ul>
          <li><Link to="/patient/appointments" className="text-blue-500">Appointments</Link></li>
          <li><Link to="/patient/prescriptions" className="text-blue-500">Prescriptions</Link></li>
          <li><Link to="/patient/diagnoses" className="text-blue-500">Diagnoses</Link></li>
          <li><Link to="/patient/billings" className="text-blue-500">Billings</Link></li>
          <li><Link to="/patient/payment-history" className="text-blue-500">Payment History</Link></li>
          <li><Link to="/patient/settings" className="text-blue-500">Settings</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default PatientDashboard;
