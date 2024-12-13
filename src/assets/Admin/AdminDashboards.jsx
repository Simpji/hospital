import React, { useState } from 'react';
import { FaCalendarAlt, FaUser, FaUsers, FaMicrophone, FaUserCircle, FaCog } from 'react-icons/fa'; // FontAwesome icons
import { MdDashboard } from 'react-icons/md'; // Material Design icons
import { Link } from 'react-router-dom'; // Assuming you're using React Router

function AdminDashboards() {
  const [isPatientDropdownOpen, setIsPatientDropdownOpen] = useState(false); // State for Patient dropdown
  const [isDoctorDropdownOpen, setIsDoctorDropdownOpen] = useState(false); // State for Doctor dropdown
  const [isAppointmentDropDownOpen, setIsAppointmentDropDownOpen] = useState(false)

  // Toggle dropdown visibility for Patient
  const togglePatientDropdown = () => {
    setIsPatientDropdownOpen(!isPatientDropdownOpen);
  };

  // Toggle dropdown visibility for Doctor
  const toggleDoctorDropdown = () => {
    setIsDoctorDropdownOpen(!isDoctorDropdownOpen);
  };

  const toggleAppointmentDropDown = () => {
    setIsAppointmentDropDownOpen(!isAppointmentDropDownOpen)
  }

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
          {/* Dashboard Section with Icon */}
          <Link to="/admin" className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg">
            <MdDashboard className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg">Admin</h2>
          </Link>
          <Link to="/dashboard" className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg">
            <MdDashboard className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg">Dashboard</h2>
          </Link>

          {/* Appointment List Section with Icon */}
          {/* <Link to="/appointments" className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg">
            <FaCalendarAlt className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg">Appointment List</h2>
          </Link> */}
          <div className="relative">
            <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg" onClick={toggleAppointmentDropDown}>
              <FaCalendarAlt className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg">Appointment</h2>
              </div>
              {isAppointmentDropDownOpen && (
              <ul className="absolute bg-white shadow-lg border rounded-md w-48 mt-2 z-10">
                <Link to="/appointment" className="block">
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Book Appointment</li>
                  <Link to="/appointments" className="block">
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Appointment List</li>
                  </Link>
                </Link>
              </ul>
              )}
          </div>

          {/* Patient Section with Dropdown and Icon */}
          <div className="relative">
            <div
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg"
              onClick={togglePatientDropdown} // Toggle Patient dropdown on click
            >
              <FaUser className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg">Patient</h2>
            </div>

            {/* Patient Dropdown Menu */}
            {isPatientDropdownOpen && (
              <ul className="absolute bg-white shadow-lg border rounded-md w-48 mt-2 z-10">
                <Link to="/viewPatients" className="block">
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">View Patients</li>
                </Link>
                <Link to="/AddPatient" className="block">
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Add Patient</li>
                </Link>
                <Link to="/patients" className="block">
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Patient History</li>
                </Link>
              </ul>
            )}
          </div>

          {/* Doctor Section with Dropdown and Icon */}
          <div className="relative">
            <div
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg"
              onClick={toggleDoctorDropdown} // Toggle Doctor dropdown on click
            >
              <FaUsers className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg">Doctor</h2>
            </div>

            {/* Doctor Dropdown Menu */}
            {isDoctorDropdownOpen && (
              <ul className="absolute bg-white shadow-lg border rounded-md w-48 mt-2 z-10">
                <Link to="/AddDoctors" className="block">
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Add Doctor</li>
                </Link>
                <Link to="/doctors" className="block">
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Doctor List</li>
                </Link>
              </ul>
            )}
          </div>

          {/* Additional Links with Icons */}
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

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-50 rounded-lg">
  {/* Welcome Section */}
  <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-lg shadow-lg mb-6">
    <h2 className="text-3xl font-semibold">Welcome to the Admin Dashboard</h2>
    <p className="mt-2 text-lg">Here you can manage appointments, patients, and doctors efficiently.</p>
  </div>

  {/* Stats Section */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
    {/* Card 1: Appointments */}
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center space-x-4">
        <FaCalendarAlt className="w-8 h-8 text-blue-600" />
        <div>
          <h3 className="text-xl font-semibold">Appointments</h3>
          <p className="text-gray-600">Manage upcoming and past appointments</p>
        </div>
      </div>
    </div>

    {/* Card 2: Patients */}
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center space-x-4">
        <FaUser className="w-8 h-8 text-blue-600" />
        <div>
          <h3 className="text-xl font-semibold">Patients</h3>
          <p className="text-gray-600">View and manage patient records</p>
        </div>
      </div>
    </div>

    {/* Card 3: Doctors */}
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center space-x-4">
        <FaUsers className="w-8 h-8 text-blue-600" />
        <div>
          <h3 className="text-xl font-semibold">Doctors</h3>
          <p className="text-gray-600">Manage doctor profiles and availability</p>
        </div>
      </div>
    </div>
  </div>

  {/* Quick Action Buttons */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg text-center hover:bg-blue-700 transition-colors duration-300">
      <h3 className="text-xl font-semibold">Quick Actions</h3>
      <p className="mt-2 text-sm">Perform common tasks quickly with these actions.</p>
    </div>

    <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg text-center hover:bg-green-700 transition-colors duration-300">
      <h3 className="text-xl font-semibold">User Settings</h3>
      <p className="mt-2 text-sm">Access and manage your account settings.</p>
    </div>

    <div className="bg-yellow-600 text-white p-6 rounded-lg shadow-lg text-center hover:bg-yellow-700 transition-colors duration-300">
      <h3 className="text-xl font-semibold">Reports</h3>
      <p className="mt-2 text-sm">View detailed reports and analytics.</p>
    </div>
  </div>
</div>

      </div>
    </div>
  );
}

export default AdminDashboards;
