import React, { useContext, useState } from 'react';
import RegisterPatient from '../RegisterPatient';
import HospitalContext from '../../context/hospitalContext';
import { Link } from 'react-router-dom';

const PatientManagement = () => {
  const { patients, setPatients } = useContext(HospitalContext);
  const [searchTerm, setSearchTerm] = useState('');

  const handleRegister = (newPatient) => {
    const updatedPatients = [...patients, { ...newPatient, id: patients.length + 1, history: [] }];
    setPatients(updatedPatients);
  };

  const handleUpdatePatient = (id, updatedInfo) => {
    const updatedPatients = patients.map(patient =>{
      if ( patient.id === id.toString()){
        return {...patient, ...updatedInfo }
      }
      return patient;
    })
    console.log("Updated Patients:", updatedPatients);
    setPatients(updatedPatients)
    
    //   patient.id === id.toString() ? { ...patient, ...updatedInfo } : patient
    // );
    // setPatients(updatedPatients);
  };

  const filteredPatients = (patients || []).filter(patient =>
    (patient.name && patient.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (patient.id && patient.id.toString().includes(searchTerm)) ||
    (patient.dob && patient.dob.includes(searchTerm)) // Ensure this checks for dateOfBirth
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Patient Management</h1>
      <input
        type="text"
        placeholder="Search by name, ID, or date of birth"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded-md p-2 mb-4 w-full"
      />
      <RegisterPatient onRegister={handleRegister} />
      <h2 className="text-xl font-semibold mt-6 mb-2">Registered Patients</h2>
      <ul className="space-y-4">
        {filteredPatients.length === 0 ? (
          <li className="text-gray-500">No patients registered.</li>
        ) : (
          filteredPatients.map((patient) => (
            <li key={patient.id} className="border rounded-md p-4 shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">{patient.name}</h3>
                  <p className="text-gray-600">{patient.email} - {patient.isActive ? 'Active' : 'Inactive'}</p>
                  <p className="text-gray-600">DOB: {patient.dateOfBirth}</p>
                </div>
                <button
                  onClick={() => handleUpdatePatient(patient.id, { isActive: !patient.isActive })} // Toggle isActive status
                  className="bg-blue-500 text-white rounded px-3 py-1 hover:bg-blue-600"
                >
                  {patient.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </div>
              <div className="mt-2">
                <h3 className="text-md font-semibold">Patient History</h3>
                <ul className="mt-1">
                  {patient.history.length === 0 ? (
                    <li className="text-gray-500">No history available</li>
                  ) : (
                    patient.history.map((entry, index) => (
                      <li key={index} className="text-gray-700">
                        {entry.description} - {entry.diagnosis} - {entry.treatment}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </li>
          ))
        )}
      </ul>
      <Link to="/" className="mt-6 inline-block text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  );
};

export default PatientManagement;