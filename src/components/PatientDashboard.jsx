import React, { useContext, useState, useMemo } from "react";
import {
  FaHome,
  FaUser,
  FaHeartbeat,
  FaCalendarAlt,
  FaMedkit,
  FaCog,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import HospitalContext from "../context/HospitalContext";

// Sidebar menu items
const menuItems = [
  { icon: FaHome, label: "Home", to: "/" },
  { icon: FaUser, label: "Patient", to: "/PatientHistory" },
  {icon: FaUser, label: "DoctorDashboard", to: "/doctorDashboard"},
  { icon: FaHeartbeat, label: "Doctor", to: "/doctor" },
  { icon: FaHeartbeat, label: "Patientportal", to: "/patientportal" },
  { icon: FaHeartbeat, label: "Add Patient", to: "/PatientAdd" },
  {
    icon: FaCalendarAlt,
    label: "Appointments",
    dropdown: [
      { label: "Book Appointment", to: "/BookAppointment" },
      { label: "View Appointment", to: "/viewAppointment" },
    ],
  },
  { icon: FaMedkit, label: "Medications", to: "#medications" },
  { icon: FaMedkit, label: "Bill", to: "#bill" },
  { icon: FaCog, label: "Settings", to: "#settings" },
];

// Simple Card Component
const Card = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

const PatientDashboard = () => {
  const { appointments, doctors, updateAppointment, cancelAppointment } =
    useContext(HospitalContext);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const [updatedData, setUpdatedData] = useState({
    doctorId: "",
    firstName: "",
    lastName: "",
    time: "",
    date: "",
    message: "",
  });

  // Dropdown toggle
  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  // Sort appointments by date & time
  const sortedAppointments = useMemo(() => {
    if (!appointments) return [];
    return [...appointments].sort(
      (a, b) =>
        new Date(`${a.date}T${a.time}`) -
        new Date(`${b.date}T${b.time}`)
    );
  }, [appointments]);

  const getDoctorName = (id) => {
    const doctor = doctors.find((d) => d.id === id);
    return doctor ? doctor.name : "Unknown doctor";
  };

  const handleUpdate = (appointmentId) => {
    const appt = appointments.find((a) => a.id === appointmentId);
    if (!appt) return;

    setSelectedAppointment(appt);
    setUpdatedData({
      doctorId: appt.doctorId,
      firstName: appt.firstName,
      lastName: appt.lastName,
      time: appt.time,
      date: appt.date,
      message: appt.message,
    });

    setIsUpdateModalOpen(true);
  };

  const handleCancel = (appointmentId) => {
    cancelAppointment(appointmentId);
  };

  const handleSaveUpdate = () => {
    if (selectedAppointment) {
      updateAppointment(selectedAppointment.id, updatedData);
      setIsUpdateModalOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  const pendingReportsCount = appointments.filter(
    (appt) => appt.status === "Pending"
  ).length;

  const today = new Date().toISOString().split("T")[0];
  const todaysAppointments = appointments.filter((appt) => appt.date === today);

  const totalUniquePatients = new Set(
    appointments.map((appt) => `${appt.firstName} ${appt.lastName}`)
  ).size;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden p-2 mt-5 text-white bg-red-900 lg:bg-blue-800 fixed top-4 left-5 z-[999] rounded-lg"
      >
        {sidebarOpen ? "✖" : "☰"}
      </button>

      {/* SIDEBAR */}
      <aside
        className={`
          w-64 bg-blue-800 text-white p-6 flex flex-col 
          fixed lg:static top-0 left-0 h-screen z-50
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "translate-x-[-100%] lg:translate-x-0"}
        `}
      >
        <h2 className="text-2xl font-bold mb-8">Patient Dashboard</h2>

        <nav>
          <ul>
            {menuItems.map((item) =>
              item.dropdown ? (
                <li key={item.label} className="mb-4">
                  <div
                    onClick={() => toggleDropdown(item.label)}
                    className="flex items-center justify-between cursor-pointer hover:bg-blue-700 p-2 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <item.icon />
                      <span>{item.label}</span>
                    </div>
                    <span>{openDropdown === item.label ? "−" : "+"}</span>
                  </div>

                  {openDropdown === item.label && (
                    <ul className="ml-6 mt-2 space-y-2">
                      {item.dropdown.map((sub) => (
                        <Link key={sub.label} to={sub.to}>
                          <li className="hover:text-blue-400 cursor-pointer">
                            {sub.label}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.label} className="mb-4">
                  <Link
                    to={item.to}
                    className="flex items-center space-x-2 text-lg hover:text-blue-400 p-2 rounded-lg"
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 mt-4 overflow-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button className="bg-blue-800 text-white py-1 px-2 rounded-lg hover:bg-blue-700">
            Log Out
          </button>
        </div>

        {/* DASHBOARD CARDS */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Health Status">
          {[
            { label: "Blood Pressure", value: "120/80 mmHg" },
            { label: "Heart Rate", value: "72 bpm" },
            { label: "Weight", value: "72 kg" },
          ].map((stat) => (
            <div key={stat.label} className="flex justify-between mb-2">
              <span>{stat.label}</span>
              <span className="font-bold">{stat.value}</span>
            </div>
          ))}
        </Card>

        <Card title="Appointments">
          <ul>
            {appointments?.length ? (
              appointments.map((appt) => (
                <li key={appt.id} className="flex justify-between mb-4">
                  <span>{appt.title}</span>
                  <span>{appt.date}</span>
                </li>
              ))
            ) : (
              <li>No upcoming appointments</li>
            )}
          </ul>
        </Card>
      </div>


        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <Card title="Today's Appointments">
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {todaysAppointments.length}
            </p>
          </Card>

          <Card title="Total Patients">
            <p className="text-3xl font-bold text-green-600 mt-2">
              {totalUniquePatients}
            </p>
          </Card>

          <Card title="Pending Reports">
            <p className="text-3xl font-bold text-red-500 mt-2">
              {pendingReportsCount}
            </p>
          </Card>
        </div>

        {/* ALL APPOINTMENTS */}
        <div className="mt-8">
          <Card title="All Appointments">
            <ul className="space-y-4 bg-white shadow rounded-lg p-6 mb-8 coolk">
              {sortedAppointments.map((appt) => (
               <li
                key={appt.id}
                className="flex flex-col md:flex-row items-center justify-between md:items-center border-b pb-4 gap-3"
              >
                <div className="w-full">
                  <p className="text-md font-medium text-gray-800">
                    Doctor: {getDoctorName(appt.doctorId)} <br />
                    Patient: {appt.firstName} {appt.lastName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {appt.date} at {appt.time} — {appt.reason}
                  </p>
                </div>

               <div className="flex flex-col md:flex-row items-center justify-center gap-3 w-full md:w-auto">
                <span
                  className={`text-sm font-medium 
                    ${
                      appt.status === "Confirmed"
                        ? "text-blue-600"
                        : appt.status === "Pending"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                >
                  {appt.status}
                </span>

                <button
                  onClick={() => handleUpdate(appt.id)}
                  className="text-sm text-blue-700 hover:text-blue-900 w-full md:w-auto text-center"
                >
                  Update
                </button>

                <button
                  onClick={() => handleCancel(appt.id)}
                  className="text-sm text-red-600 hover:text-red-800 w-full md:w-auto text-center"
                >
                  Cancel
                </button>
              </div>

              </li>

              ))}
            </ul>
          </Card>
        </div>
      </main>

      {/* UPDATE MODAL */}
      {isUpdateModalOpen && selectedAppointment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-96 md:w-1/3">
            <h3 className="text-2xl mb-4 font-semibold text-gray-800">
              Update Appointment
            </h3>

            {/* FORM FIELDS */}
            <label className="font-medium text-gray-700">Doctor</label>
            <select
              name="doctorId"
              value={updatedData.doctorId}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-4"
            >
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} - {d.specialty}
                </option>
              ))}
            </select>

            <label className="font-medium text-gray-700">First Name</label>
            <input
              name="firstName"
              value={updatedData.firstName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-4"
            />

            <label className="font-medium text-gray-700">Last Name</label>
            <input
              name="lastName"
              value={updatedData.lastName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-4"
            />

            <label className="font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={updatedData.date}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-4"
            />

            <label className="font-medium text-gray-700">Time</label>
            <input
              type="time"
              name="time"
              value={updatedData.time}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-4"
            />

            <label className="font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              value={updatedData.message}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-4"
            />

            {/* BUTTONS */}
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                onClick={() => setIsUpdateModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
                onClick={handleSaveUpdate}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
