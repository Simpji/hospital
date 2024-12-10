import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { MdDashboard } from 'react-icons/md';
import { FaCalendarAlt, FaUser, FaUsers, FaMicrophone, FaUserCircle, FaCog } from 'react-icons/fa';
import HospitalContext from '../../context/HospitalContext'; // Ensure this import is correct

const AddPatient = () => {
  const { addPatientToContext } = useContext(HospitalContext);
  // Initialize patient data states
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [insuranceInfo, setInsuranceInfo] = useState('');
  const [isPatientDropdownOpen, setIsPatientDropdownOpen] = useState(false)
  const [isDoctorDropdownOpen, setIsDoctorDropdownOpen] = useState(false)


  const togglePatientDropdown = () => {
    setIsPatientDropdownOpen(!isPatientDropdownOpen)
  }

  const toggleDoctorDropdown = () => {
    setIsDoctorDropdownOpen(!isDoctorDropdownOpen)
  }

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

    if (addPatientToContext) {
      addPatientToContext(patientData);
    }

    console.log(patientData);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-800 p-6 text-white shadow-lg">
        <h1 className="text-left text-4xl font-extrabold">Admin Dashboard</h1>
        <p className="text-lg mt-2">Welcome to the control panel</p>
      </div>

      <div className="flex flex-col md:flex-row p-6">
        {/* Sidebar */}
        <div className="bg-white shadow-lg rounded-lg w-full md:w-64 p-6 space-y-6">
          <Link to="/admin" className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg">
            <MdDashboard className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg">Admin</h2>
          </Link>
          <Link to="/dashboard" className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg">
            <MdDashboard className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg">Dashboard</h2>
          </Link>
          <Link to="/appointments" className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg">
            <FaCalendarAlt className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg">Appointment List</h2>
          </Link>
          <div className="relative">
            <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg" onClick={togglePatientDropdown}>
              <FaUser className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg">Patient</h2>
            </div>
            {isPatientDropdownOpen && (
            <ul className="absolute bg-white shadow-lg border rounded-md w-48 mt-2 z-10">
              <Link to="/viewPatients" className="block">
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">View Patients</li>
              </Link>
              <Link to="/AddPatient" className="block">
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Add Patient</li>
              </Link>
              <Link to="/patient-records" className="block">
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Patient Records</li>
              </Link>
            </ul>
            )}
          </div>
          <div className="relative">
            <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg" onClick={toggleDoctorDropdown}>
              <FaUsers className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg">Doctor</h2>
            </div>
            {isDoctorDropdownOpen && (
            <ul className="absolute bg-white shadow-lg border rounded-md w-48 mt-2 z-10">
              <Link to="/add-doctor" className="block">
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Add Doctor</li>
              </Link>
              <Link to="/doctor-list" className="block">
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Doctor List</li>
              </Link>
            </ul>
            )}
          </div>
          <div className="space-y-2 mt-6">
            <Link to="/mic-page" className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg">
              <FaMicrophone className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg">Mic Page</h2>
            </Link>
            <Link to="/user" className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg">
              <FaUserCircle className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg">User</h2>
            </Link>
            <Link to="/settings" className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg">
              <FaCog className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg">Settings</h2>
            </Link>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex-1 p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Patient</h2>
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

            {/* Submit Button */}
            <button type="submit" className="mt-3 mb-5 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Add Patient
            </button>
          </form>

          {/* Go Back Button */}
          <Link 
            to="/Admin"  // Link to the Admin Dashboard route
            className=" px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Go Back admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
