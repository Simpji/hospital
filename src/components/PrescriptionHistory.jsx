import React from 'react';

const PrescriptionHistory = ({ prescriptions }) => {
  return (
    <div>
      <h2>Prescription History</h2>
      <ul>
        {prescriptions.map((prescription, index) => (
          <li key={index}>
            <p>{prescription.date}: {prescription.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrescriptionHistory;
