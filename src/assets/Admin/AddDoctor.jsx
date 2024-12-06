import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HospitalContext from "../../context/HospitalContext";

const AdminDashboard = () => {
  const { appointments, doctors, currentUser } = useContext(HospitalContext); // Assuming currentUser is part of your context
  const [newAppointment, setNewAppointment] = useState(null); // Track the latest appointment
  const [message, setMessage] = useState(""); // Success message for actions
  const [showMarquee, setShowMarquee] = useState(false); // Control the marquee visibility

  // Whenever the appointments array changes, update the new appointment
  useEffect(() => {
    if (appointments.length > 0) {
      const lastAppointment = appointments[appointments.length - 1];
      setNewAppointment(lastAppointment); // Get the latest appointment
      setShowMarquee(true); // Show the marquee when an appointment is added or updated
    }
  }, [appointments]); // Triggered when appointments array changes

  // Automatically hide the marquee after 20 seconds
  useEffect(() => {
    if (showMarquee) {
      const timer = setTimeout(() => {
        setShowMarquee(false);
      }, 20000);
      return () => clearTimeout(timer); // Cleanup on unmount or when marquee disappears
    }
  }, [showMarquee]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-950 text-white py-4">
        <h2 className="text-3xl font-bold text-center">Admin Dashboard</h2>
      </div>

      {/* Success message */}
      {message && (
        <div className="text-center text-green-600 bg-green-100 p-3 mb-4">
          {message}
        </div>
      )}

      {/* Marquee for the latest appointment */}
      {showMarquee && newAppointment && (
        <div className="bg-yellow-300 text-center py-2 font-semibold text-xl mb-4">
          <marquee>
            {newAppointment.firstName} {newAppointment.lastName} booked an appointment on{" "}
            {newAppointment.date} at {newAppointment.time}
          </marquee>
        </div>
      )}

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="bg-white shadow-md p-6 md:w-1/4 lg:w-1/5 mb-4 md:mb-0">
          <nav>
            <ul className="space-y-4">
              <li>
                <Link to="/appointment" className="text-lg text-blue-600 hover:text-blue-800">
                  Appointments
                </Link>
              </li>
              <li>
                <Link to="/patients" className="text-lg text-blue-600 hover:text-blue-800">
                  Patients
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-lg text-blue-600 hover:text-blue-800">
                  Doctors
                </Link>
              </li>
              {/* Only show the 'Add Doctor' option if the user is an admin */}
              {currentUser && currentUser.role === 'admin' && (
                <li>
                  <Link to="/admin/add-doctor" className="text-lg text-blue-600 hover:text-blue-800">
                    Add Doctor
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Appointments List</h3>
            {appointments.length === 0 ? (
              <div className="text-center text-gray-500">No appointments available.</div>
            ) : (
              <ul className="space-y-6">
                {/* Show all appointments, no filtering */}
                {appointments.map((appointment) => {
                  // Find the doctor for each appointment
                  const doctor = doctors.find((doc) => doc.id === appointment.doctorId);
                  const doctorName = doctor ? doctor.name : "Doctor not available"; // Default doctor name if not found

                  return (
                    <li key={appointment.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                      <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                          {/* Patient's Name */}
                          <h4 className="text-xl font-semibold">
                            {appointment.firstName} {appointment.lastName}
                          </h4>
                          <p className="text-gray-600">{appointment.date} - {appointment.time}</p>
                          <p className="text-gray-600 mt-2">
                            <strong>Status:</strong> {appointment.status || "Pending"}
                          </p>
                          {/* Display Doctor's Name */}
                          <p className="text-gray-600 mt-2">
                            <strong>Doctor:</strong> {doctorName}
                          </p>
                        </div>
                        {/* Link to view detailed appointment */}
                        <Link
                          to={`/appointmentDetail/${appointment.id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          View Appointment
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
