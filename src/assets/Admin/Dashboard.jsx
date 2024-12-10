import React, { useState } from 'react';
import { FaCalendarAlt, FaUser, FaUsers, FaMicrophone, FaUserCircle, FaCog, FaBell } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2'; // Line chart for statistics
import Chart from 'chart.js/auto'; // Chart.js import to ensure proper setup

function AdminDashboards() {
  const [isPatientDropdownOpen, setIsPatientDropdownOpen] = useState(false);
  const [isDoctorDropdownOpen, setIsDoctorDropdownOpen] = useState(false);
  const [isAppointmentDropDownOpen, setIsAppointmentDropDownOpen] = useState(false)

  const togglePatientDropdown = () => setIsPatientDropdownOpen(!isPatientDropdownOpen);
  const toggleDoctorDropdown = () => setIsDoctorDropdownOpen(!isDoctorDropdownOpen);
  const toggleAppointmentDropDown = () => setIsAppointmentDropDownOpen(!isAppointmentDropDownOpen)

  // Sample data for line chart
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Appointments',
        data: [50, 40, 70, 90, 85, 110],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white flex items-center justify-between">
        <h1 className="text-left text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center space-x-6">
          {/* Search Bar */}
          <input
            type="text"
            className="p-2 rounded-lg border border-gray-300"
            placeholder="Search..."
          />
          {/* Notifications Bell */}
          <div className="relative">
            <FaBell className="text-white text-xl cursor-pointer" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
              5
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="bg-white shadow-md w-full md:w-64 p-6 space-y-6">
          {/* Logo/Branding */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-blue-800">Logo</h2>
          </div>

          {/* Sidebar Navigation */}
          <div className="space-y-4">
            <Link to="/Admin" className="flex items-center space-x-3 hover:bg-blue-50 p-3 rounded-lg">
              <MdDashboard className="text-blue-600 text-xl" />
              <span className="text-lg">Admin</span>
            </Link>
            <Link to="/dashboard" className="flex items-center space-x-3 hover:bg-blue-50 p-3 rounded-lg">
              <MdDashboard className="text-blue-600 text-xl" />
              <span className="text-lg">Dashboard</span>
            </Link>

              <div className="relative">
              <div
                className="flex items-center space-x-3 hover:bg-blue-50 p-3 rounded-lg cursor-pointer"
                onClick={toggleAppointmentDropDown}
              >
                <FaCalendarAlt className="text-blue-600 text-xl" />
                <span className="text-lg">Appointment</span>
              </div>
              {isAppointmentDropDownOpen && (
                <ul className="absolute bg-white shadow-lg border rounded-md w-48 mt-2 z-10">
                  <Link to="">
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Appointment List</li>
                  </Link>
                </ul>
              )}
            </div>

            <div className="relative">
              <div
                className="flex items-center space-x-3 hover:bg-blue-50 p-3 rounded-lg cursor-pointer"
                onClick={togglePatientDropdown}
              >
                <FaUser className="text-blue-600 text-xl" />
                <span className="text-lg">Patients</span>
              </div>
              {isPatientDropdownOpen && (
                <ul className="absolute bg-white shadow-lg border rounded-md w-48 mt-2 z-10">
                  <Link to="/viewPatients">
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">View Patients</li>
                  </Link>
                  <Link to="/addPatient">
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Add Patient</li>
                  </Link>
                  <Link to="/patient-records">
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Patient Records</li>
                  </Link>
                </ul>
              )}
            </div>

            <div className="relative">
              <div
                className="flex items-center space-x-3 hover:bg-blue-50 p-3 rounded-lg cursor-pointer"
                onClick={toggleDoctorDropdown}
              >
                <FaUsers className="text-blue-600 text-xl" />
                <span className="text-lg">Doctors</span>
              </div>
              {isDoctorDropdownOpen && (
                <ul className="absolute bg-white shadow-lg border rounded-md w-48 mt-2 z-10">
                  <Link to="/add-doctor">
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Add Doctor</li>
                  </Link>
                  <Link to="/doctor-list">
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Doctor List</li>
                  </Link>
                </ul>
              )}
            </div>

            {/* Additional Links with Icons */}
            <div className="space-y-2 mt-6">
              <Link to="/mic-page" className="flex items-center space-x-3 hover:bg-blue-50 p-3 rounded-lg">
                <FaMicrophone className="text-blue-600 text-xl" />
                <span className="text-lg">Mic Page</span>
              </Link>
              <Link to="/user" className="flex items-center space-x-3 hover:bg-blue-50 p-3 rounded-lg">
                <FaUserCircle className="text-blue-600 text-xl" />
                <span className="text-lg">User</span>
              </Link>
              <Link to="/settings" className="flex items-center space-x-3 hover:bg-blue-50 p-3 rounded-lg">
                <FaCog className="text-blue-600 text-xl" />
                <span className="text-lg">Settings</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-50 p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard Overview</h2>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold">Total Appointments</h3>
              <p className="text-3xl font-bold text-blue-600">120</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold">Total Patients</h3>
              <p className="text-3xl font-bold text-blue-600">200</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold">Total Doctors</h3>
              <p className="text-3xl font-bold text-blue-600">15</p>
            </div>
          </div>

          {/* Chart Section */}
            <div className="bg-white shadow-2xl rounded-3xl p-8 mb-8 max-w-5xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Appointments Trends</h3>
            <div className="flex justify-center">
                <div className="w-full lg:w-4/5 bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-2xl">
                <Line data={chartData} />
                </div>
            </div>
            </div>


          {/* User Profile Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">User Profile</h3>
            <div className="flex items-center space-x-4">
              <FaUserCircle className="text-blue-600 text-4xl" />
              <div>
                <p className="font-semibold">Admin Name</p>
                <p className="text-sm text-gray-500">admin@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboards;
