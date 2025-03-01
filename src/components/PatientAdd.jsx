import React, { useState, useContext } from 'react';
import HospitalContext from '../context/HospitalContext';

const PatientAdd = () => {
  const { addPatient } = useContext(HospitalContext);
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [insuranceInfo, setInsuranceInfo] = useState('');

  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const patientData = {
      fullName,
      dob,
      gender,
      phone,
      email,
      address,
      medicalHistory,
      emergencyContact,
      insuranceInfo,
    };

    // Check if the addPatient function exists in the context
    if (addPatient) {
      addPatient(patientData);  // Call the context function to add the patient
      setSuccessMessage('New patient has been added successfully!'); // Set success message
    }

    console.log(patientData);  // Log the patient data for debugging
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Add New Patient</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col">
              <label htmlFor="fullName" className="mb-2 text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="dob" className="mb-2 text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="gender" className="mb-2 text-sm font-medium text-gray-700">Gender</label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone" className="mb-2 text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="address" className="mb-2 text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="medicalHistory" className="mb-2 text-sm font-medium text-gray-700">Medical History</label>
              <textarea
                id="medicalHistory"
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="emergencyContact" className="mb-2 text-sm font-medium text-gray-700">Emergency Contact</label>
              <input
                type="text"
                id="emergencyContact"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="insuranceInfo" className="mb-2 text-sm font-medium text-gray-700">Insurance Information</label>
              <input
                type="text"
                id="insuranceInfo"
                value={insuranceInfo}
                onChange={(e) => setInsuranceInfo(e.target.value)}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button type="submit" className="mt-6 w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Add Patient
          </button>
        </form>

        {/* Display success message */}
        {successMessage && (
          <div className="mt-4 p-4 bg-green-200 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientAdd;
