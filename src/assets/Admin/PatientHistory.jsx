import React, { useContext, useState } from 'react';
import RegisterPatient from '../../components/RegisterPatient';
import HospitalContext from '../../context/HospitalContext';
import { Link } from 'react-router-dom';
import {FaUser}from 'react-icons/fa';

const PatientManagement = () => {
  const { patients, addPatient, updatePatient, deletePatient } = useContext(HospitalContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedInfo, setUpdatedInfo] = useState({ name: '', email: '', dob: '' });
  

  const handleRegister = (newPatient) => {
    addPatient({ ...newPatient, id: patients.length + 1, history: [] });
  };

  const handleUpdatePatient = (id) => {
    updatePatient(id, updatedInfo);
    setIsEditing(false);
    setSelectedPatient(null);
    setUpdatedInfo({ name: '', email: '', dob: '' });
  };

  const handleOpenEditModal = (patient) => {
    setSelectedPatient(patient);
    setUpdatedInfo({ name: patient.name, email: patient.email, dob: patient.dob });
    setIsEditing(true);
  };

  const handleDeletePatient = (id) => {
    deletePatient(id);
  };

  const filteredPatients = (patients || []).filter(patient =>
    (patient.name && patient.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (patient.id && patient.id.toString().includes(searchTerm)) ||
    (patient.dob && patient.dob.includes(searchTerm))
  );

  

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-4 sm:p-6 max-w-full sm:max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Patient Management</h1>

        <input
          type="text"
          placeholder="Search by name, ID, or date of birth"
          value={searchTerm}
          id="searchTerm"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-md p-2 mb-4 w-full"
        />
         <Link to="/viewPatients" className="flex items-center space-x-2 text-lg hover:text-blue-400">
                <FaUser />
                <span>View Patient list</span>
              </Link>

        <RegisterPatient onRegister={handleRegister} patients={filteredPatients} onDelete={deletePatient} />

        <h2 className="text-xl font-semibold mt-6 mb-2">Registered Patients</h2>

        <ul className="space-y-4">
          {filteredPatients.length === 0 ? (
            <li className="text-gray-500">No patients registered.</li>
          ) : (
            filteredPatients.map((patient) => (
              <li key={patient.id} className="border rounded-md p-4 shadow-md">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div className="mb-2 sm:mb-0">
                    <h3 className="text-lg font-bold">{patient.name}</h3>
                    <p className="text-gray-600">{patient.email} - {patient.isActive ? 'Active' : 'Inactive'}</p>
                    <p className="text-gray-600">DOB: {patient.dob}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenEditModal(patient)}
                      className="text-blue-500 rounded px-3 py-1 hover:underline"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => updatePatient(patient.id, { isActive: !patient.isActive })}
                      className={`text-white rounded px-3 py-1 ${patient.isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                      {patient.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeletePatient(patient.id)}
                      className="text-red-500 rounded px-3 py-1 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold">Patient History</h4>
                  {(!patient.history || patient.history.length === 0) ? (
                    <p className="text-gray-500">No history available</p>
                  ) : (
                    <ul className="space-y-2">
                      {patient.history.map((entry, index) => (
                        <li key={index} className="text-gray-700">
                          {entry.date}: {entry.description} - Diagnosis: {entry.diagnosis}, Treatment: {entry.treatment}
                          {entry.testimonial}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>

        {isEditing && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-full sm:w-96">
              <h2 className="text-lg font-bold mb-4">Edit Patient Information</h2>
              <input
                type="text"
                placeholder="Name"
                value={updatedInfo.name}
                onChange={(e) => setUpdatedInfo({ ...updatedInfo, name: e.target.value })}
                className="border rounded-md p-2 mb-2 w-full"
              />
              <input
                type="email"
                placeholder="Email"
                value={updatedInfo.email}
                onChange={(e) => setUpdatedInfo({ ...updatedInfo, email: e.target.value })}
                className="border rounded-md p-2 mb-2 w-full"
              />
              <input
                type="date"
                value={updatedInfo.dob}
                onChange={(e) => setUpdatedInfo({ ...updatedInfo, dob: e.target.value })}
                className="border rounded-md p-2 mb-4 w-full"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleUpdatePatient(selectedPatient.id)}
                  className="bg-blue-500 text-white rounded px-4 py-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-black rounded px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <Link to="/" className="mt-6 inline-block text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PatientManagement;
