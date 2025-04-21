import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HospitalContext from "../context/HospitalContext";

const AppointmentDetail = () => {
  const { id } = useParams(); // Get the appointment ID from the URL
  const { appointments, doctors, updateAppointment, cancelAppointment } = useContext(HospitalContext);
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(false); 
  const navigate = useNavigate();

  const appointment = appointments.find((appointment) => appointment.id === id);
  const doctor = appointment ? doctors.find((doctor) => doctor.id === appointment.doctorId) : null;
  const doctorName = doctor ? doctor.name : "Doctor information not available";

  // Local state to store updated form values
  const [updatedAppointment, setUpdatedAppointment] = useState({
    firstName: "",
    lastName: "",
    date: "",
    time: "",
    message: "",
    status: ""
  });

  useEffect(() => {
    if (appointment) {
      setUpdatedAppointment({
        firstName: appointment.firstName,
        lastName: appointment.lastName,
        date: appointment.date,
        time: appointment.time,
        message: appointment.message,
        status: appointment.status || "Pending"
      });
    }
  }, [appointment]);

  if (!appointment) {
    return <p>Appointment not found.</p>;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    await updateAppointment(appointment.id, updatedAppointment);

   
    setSuccessMessage("Appointment has been successfully updated!");

    setTimeout(() => {
      navigate("/adminDashboard"); 
    }, 2000);
  };

  const handleConfirm = () => {
    const updatedStatus = { ...appointment, status: "Confirmed" };
    updateAppointment(appointment.id, updatedStatus);
    setSuccessMessage("Appointment has been confirmed!");

    setTimeout(() => {
      navigate("/adminDashboard");
    }, 2000);
  };

  const handleCancel = () => {
    const updatedStatus = { ...appointment, status: "Cancelled" };
    cancelAppointment(appointment.id);
    setSuccessMessage("Appointment has been cancelled!");

    setTimeout(() => {
      navigate("/adminDashboard");
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAppointment((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg mt-10 sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Appointment Details</h2>

      {/* Display patient and doctor info */}
      <div>
        <p><strong>Patient:</strong> {appointment.firstName} {appointment.lastName}</p>
        <p><strong>Doctor:</strong> {doctorName}</p> {/* Display doctor name */}
        <p><strong>Date:</strong> {appointment.date}</p>
        <p><strong>Time:</strong> {appointment.time}</p>
        <p><strong>Message:</strong> {appointment.message}</p>
        <p><strong>Status:</strong> {appointment.status || "Pending"}</p>
      </div>

      {/* Button to show the update form */}
      {!showForm && (
        <div className="mt-4 flex flex-col sm:flex-row justify-between">
          <button
            onClick={() => setShowForm(true)} // Show the form when clicked
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto mb-4 sm:mb-0"
          >
            Edit Appointment
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 w-full sm:w-auto"
          >
            Cancel Appointment
          </button>
        </div>
      )}

      {/* Edit Appointment Form */}
      {showForm && (
        <form onSubmit={handleUpdate} className="mt-4">
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 font-semibold">First Name</label>
            <input
              type="text"
              name="firstName"
              value={updatedAppointment.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 font-semibold">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={updatedAppointment.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 font-semibold">Date</label>
            <input
              type="date"
              name="date"
              value={updatedAppointment.date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="block text-gray-700 font-semibold">Time</label>
            <input
              type="time"
              name="time"
              value={updatedAppointment.time}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-semibold">Message</label>
            <textarea
              name="message"
              value={updatedAppointment.message}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700 font-semibold">Status</label>
            <select
              name="status"
              value={updatedAppointment.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-row justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 w-full sm:w-auto mb-4 sm:mb-0"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)} // Hide the form when clicked
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 w-full sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      
      {/* Display success message */}
      {successMessage && (
        <div className="mt-4 text-green-600 font-semibold text-center">
          {successMessage}
        </div>
      )}

      {/* Confirmation and Cancel Appointment buttons */}
      {!showForm && (
        <div className="mt-4 flex flex-col sm:flex-row justify-between">
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto mb-4 sm:mb-0"
          >
            Confirm Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentDetail;
