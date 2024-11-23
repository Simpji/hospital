import React, { useContext, useState, useEffect } from 'react';
import HospitalContext from '../context/HospitalContext';

const PatientPortal = () => {
  const { patients } = useContext(HospitalContext);
  const [loggedInPatient, setLoggedInPatient] = useState(null);
  const [message, setMessage] = useState('');

  
  const email = localStorage.getItem('patientEmail');

  useEffect(() => {
    const patient = patients.find(p => p.email === email && p.isActive);
    if (patient) {
      setLoggedInPatient(patient);
    } else {
      alert('You need to log in to access this portal.');
      window.location.href = '/patientlogin'; 
    }
  }, [email, patients]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    alert('Message sent to staff!'); 
    setMessage('');
  };

  if (!loggedInPatient) return null; 

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome, {loggedInPatient.name}</h1>

      {/* Medical Records */}
      <h2 className="text-xl font-semibold mb-2">Your Medical Records</h2>
      <ul className="space-y-4">
        {loggedInPatient.history.length === 0 ? (
          <li className="text-gray-500">No medical history available.</li>
        ) : (
          loggedInPatient.history.map((entry, index) => (
            <li key={index} className="border rounded-md p-4 shadow">
              <p><strong>Date:</strong> {entry.date}</p>
              <p><strong>Description:</strong> {entry.description}</p>
              <p><strong>Diagnosis:</strong> {entry.diagnosis}</p>
              <p><strong>Treatment:</strong> {entry.treatment}</p>
            </li>
          ))
        )}
      </ul>

      {/* Messaging Form */}
      <form onSubmit={handleMessageSubmit} className="mt-6">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message to staff here..."
          className="border rounded-md p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition mt-2">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default PatientPortal;
