import React, { useContext, useState } from 'react';
import { FaHome, FaUser, FaHeartbeat, FaCalendarAlt, FaMedkit, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import HospitalContext from '../context/HospitalContext';

const PatientDashboard = () => {
  const {appointments} = useContext(HospitalContext)
  const [isAppointmentDropDown, setIsAppointmentDropDown] = useState(false)

  const toggleAppointmentDropDown = () => {
    setIsAppointmentDropDown(!isAppointmentDropDown)
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Patient Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-6">
              <Link to="/" className="flex items-center space-x-2 text-lg hover:text-blue-400">
                <FaHome />
                <span>Home</span>
              </Link>
            </li>
            <li className="mb-6">
              <Link to="/PatientHistory" className="flex items-center space-x-2 text-lg hover:text-blue-400">
                <FaUser />
                <span>Patient</span>
              </Link>
            </li>
            <li className="mb-6">
              <Link to="/doctor" className="flex items-center space-x-2 text-lg hover:text-blue-400">
                <FaHeartbeat />
                <span>Doctor</span>
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/PatientAdd" className="flex items-center space-x-2 text-lg hover:text-blue-400">
                <FaHeartbeat />
                <span>AddPatient</span>
              </Link>
            </li>
           
            <div className="relative">
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-blue-700 pb-3 rounded-lg" onClick={toggleAppointmentDropDown}>
                <FaCalendarAlt className="w-5 h-5"/>
                <h2 className="text-lg">Appointment</h2>
              </div>
              <div>
                {isAppointmentDropDown && (
                  <ul className="absolute bg-blue-700 shadow-lg border rounded-md w-48 mt-2 z-10">
                    <Link to="/BookAppointment" className="block">
                      <li className="px-4 py-2 cursor-pointer hover:bg-gray-200">Book Appointment</li>
                    </Link>
                    <Link to="/viewAppointment" className="block">
                      <li className="px-4 py-2 cursor-pointer hover:bg-gray-200">View Appointment</li>
                    </Link>
                  </ul>
                )}
              </div>
            </div>
            <li className="mb-6">
              <Link to="#medications" className="flex items-center space-x-2 text-lg hover:text-blue-400">
                <FaMedkit />
                <span>Medications</span>
              </Link>
            </li>
            <li className="mb-6">
              <Link to="#bill" className="flex items-center space-x-2 text-lg hover:text-blue-400">
                <FaMedkit />
                <span>Bill</span>
              </Link>
            </li>
            <li>
              <Link to="#settings" className="flex items-center space-x-2 text-lg hover:text-blue-400">
                <FaCog />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button className="bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Log Out</button>
        </div>

        {/* Health Overview */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Health Status</h2>
            <div className="flex justify-between items-center mb-2">
              <span>Blood Pressure</span>
              <span className="font-bold">120/80 mmHg</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Heart Rate</span>
              <span className="font-bold">72 bpm</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Weight</span>
              <span className="font-bold">72 kg</span>
            </div>
          </div>

          {/* Appointments */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
            <ul>
              <li className="flex justify-between mb-4">
                <span>Dental Checkup</span>
                <span>Dec 20, 2024</span>
              </li>
              <li className="flex justify-between mb-4">
                <span>General Checkup</span>
                <span>Dec 22, 2024</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Medications */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Medications</h2>
          <ul>
            <li className="flex justify-between mb-4">
              <span>Aspirin</span>
              <span>1 tablet daily</span>
            </li>
            <li className="flex justify-between mb-4">
              <span>Vitamin D</span>
              <span>1 capsule daily</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
