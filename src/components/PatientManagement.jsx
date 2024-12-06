import React, { useState, useContext } from 'react';
import HospitalContext from '../../context/HospitalContext';

const PatientManagement = () => {
  const { patients, addPatient, updatePatient, deletePatient } = useContext(HospitalContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Manage Patients</h2>
      <input 
        type="text" 
        placeholder="Search patients..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <ul>
        {filteredPatients.map((patient) => (
          <li key={patient.id}>
            <span>{patient.name}</span>
            <button onClick={() => updatePatient(patient.id)}>Update</button>
            <button onClick={() => deletePatient(patient.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientManagement;
