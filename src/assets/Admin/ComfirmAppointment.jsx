import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import necessary hooks
import HospitalContext from "../../context/HospitalContext";

function ConfirmAppointment() {
  const { appointmentId } = useParams(); // Get the appointment ID from the URL
  const { appointments, updateAppointment } = useContext(HospitalContext);
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    const selectedAppointment = appointments.find((appointment) => appointment.id === appointmentId);
    if (selectedAppointment) {
      setAppointment(selectedAppointment);
    } else {
      navigate("/"); // Redirect to home or appointments page if appointment not found
    }
  }, [appointmentId, appointments, navigate]);

  const handleConfirm = () => {
    if (appointment) {
      const updatedAppointment = { ...appointment, status: "Confirmed" };
      updateAppointment(appointment.id, updatedAppointment);
      navigate("/"); // Redirect back to the appointments page after confirmation
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {appointment ? (
        <div>
          <h2 className="text-2xl font-bold text-center mb-6">Confirm Appointment</h2>
          <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              Appointment with Dr. {appointment.doctorName}
            </h3>
            <p><strong className="font-medium">Name:</strong> {appointment.firstName} {appointment.lastName}</p>
            <p><strong className="font-medium">Date:</strong> {appointment.date}</p>
            <p><strong className="font-medium">Time:</strong> {appointment.time}</p>
            <p><strong className="font-medium">Message:</strong> {appointment.message}</p>

            <div className="mt-4 flex justify-between">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                onClick={handleConfirm}
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading appointment details...</p>
      )}
    </div>
  );
}

export default ConfirmAppointment;
