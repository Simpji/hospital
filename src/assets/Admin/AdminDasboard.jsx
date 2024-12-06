import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HospitalContext from "../../context/HospitalContext";

const AdminDashboard = () => {
  const { appointments, doctors, currentUser } = useContext(HospitalContext);
  const [newAppointment, setNewAppointment] = useState(null);
  const [message, setMessage] = useState("");
  const [showMarquee, setShowMarquee] = useState(false);

  useEffect(() => {
    if (appointments.length > 0) {
      const lastAppointment = appointments[appointments.length - 1];
      setNewAppointment(lastAppointment);
      setShowMarquee(true);
    }
  }, [appointments]);

  useEffect(() => {
    if (showMarquee) {
      const timer = setTimeout(() => {
        setShowMarquee(false);
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, [showMarquee]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-900 text-white py-6">
        <h2 className="text-4xl font-bold text-center">Admin Dashboard</h2>
      </div>

      {/* Success Message */}
      {message && (
        <div className="text-center text-green-600 bg-green-100 p-4 mb-6 rounded-md">
          {message}
        </div>
      )}

      {/* Marquee for Latest Appointment */}
      {showMarquee && newAppointment && (
        <div className="bg-yellow-300 text-center py-3 font-semibold text-xl mb-6 rounded-md">
          <marquee>
            {newAppointment.firstName} {newAppointment.lastName} booked an appointment on{" "}
            {newAppointment.date} at {newAppointment.time}
          </marquee>
        </div>
      )}

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row">

        {/* Sidebar */}
        <div className="bg-white shadow-lg p-6 lg:w-1/4 mb-6 lg:mb-0 rounded-md">
          <nav>
            <ul className="space-y-6">
              <li>
                <Link to="/appointment" className="text-xl text-blue-600 hover:text-blue-800 font-semibold">
                  Appointments
                </Link>
              </li>
              <li>
                <Link to="/patients" className="text-xl text-blue-600 hover:text-blue-800 font-semibold">
                  Patients
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-xl text-blue-600 hover:text-blue-800 font-semibold">
                  Doctors
                </Link>
              </li>
              {currentUser && currentUser.role === "admin" && (
                <li>
                  <Link to="/admin/add-doctor" className="text-xl text-blue-600 hover:text-blue-800 font-semibold">
                    Add Doctor
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-8">
          <div className="bg-white p-8 rounded-lg shadow-xl">

            {/* Appointments List */}
            <h3 className="text-3xl font-semibold mb-6">Appointments</h3>
            {appointments.length === 0 ? (
              <div className="text-center text-gray-600">No appointments available.</div>
            ) : (
              <ul className="space-y-6">
                {appointments.map((appointment) => {
                  const doctor = doctors.find((doc) => doc.id === appointment.doctorId);
                  const doctorName = doctor ? doctor.name : "Doctor not available";

                  return (
                    <li key={appointment.id} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:bg-gray-100 transition duration-300">
                      <div className="flex flex-col lg:flex-row justify-between items-center">
                        <div className="mb-6 lg:mb-0">
                          <h4 className="text-2xl font-semibold text-gray-800">
                            {appointment.firstName} {appointment.lastName}
                          </h4>
                          <p className="text-gray-600">{appointment.date} - {appointment.time}</p>
                          <p className="text-gray-600 mt-2">
                            <strong>Status:</strong> {appointment.status || "Pending"}
                          </p>
                          <p className="text-gray-600 mt-2">
                            <strong>Doctor:</strong> {doctorName}
                          </p>
                        </div>
                        <Link
                          to={`/appointmentDetail/${appointment.id}`}
                          className="text-blue-600 hover:text-blue-800 mt-4 lg:mt-0 font-semibold"
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
