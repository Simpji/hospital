import React, { useContext, useState, useEffect } from "react";
import HospitalContext from "../../context/HospitalContext";

function ViewAppointmentSchedule() {
  const { appointments, doctors, updateAppointment, cancelAppointment } = useContext(HospitalContext);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    doctorId: "", // Add this for the doctor ID
    firstName: "",
    lastName: "",
    date: "",
    time: "",
    message: "",
  });

  const [selectedTab, setSelectedTab] = useState("all");

  useEffect(() => {
    appointments.forEach((appointment) => {
      if (!appointment.status) {
        updateAppointment(appointment.id, { ...appointment, status: "Pending" });
      }
    });
  }, [appointments, updateAppointment]);

  const handleUpdate = (appointmentId) => {
    const appointmentToUpdate = appointments.find((appointment) => appointment.id === appointmentId);
    if (appointmentToUpdate) {
      setSelectedAppointment(appointmentToUpdate);
      setUpdatedData({
        doctorId: appointmentToUpdate.doctorId, // Set the doctor ID here
        firstName: appointmentToUpdate.firstName,
        lastName: appointmentToUpdate.lastName,
        date: appointmentToUpdate.date,
        time: appointmentToUpdate.time,
        message: appointmentToUpdate.message,
      });
      setIsUpdateModalOpen(true);
    }
  };

  const handleCancel = (appointmentId) => {
    cancelAppointment(appointmentId);
    console.log(`Appointment with ID: ${appointmentId} has been canceled.`);
  };

  const handleSaveUpdate = () => {
    if (selectedAppointment) {
      updateAppointment(selectedAppointment.id, updatedData);
      setIsUpdateModalOpen(false); // Close the modal
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Filter appointments based on selected tab
  const filteredAppointments = appointments.filter((appointment) => {
    if (selectedTab === "all") return true;
    return appointment.status.toLowerCase() === selectedTab.toLowerCase();
  });

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Your Appointments</h2>

      {/* Display appointments in table format */}
      {filteredAppointments.length === 0 ? (
        <p className="text-center text-lg text-gray-500">You have no {selectedTab} appointments.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2 sm:px-6 md:px-8">Doctor</th>
                <th className="px-4 py-2 sm:px-6 md:px-8">Patient Name</th>
                <th className="px-4 py-2 sm:px-6 md:px-8">Date</th>
                <th className="px-4 py-2 sm:px-6 md:px-8">Time</th>
                <th className="px-4 py-2 sm:px-6 md:px-8">Message</th>
                <th className="px-4 py-2 sm:px-6 md:px-8">Status</th>
                <th className="px-4 py-2 sm:px-6 md:px-8">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => {
                const doctor = doctors.find((doc) => doc.id === appointment.doctorId);
                const doctorName = doctor ? doctor.name : "Unknown Doctor";
                const doctorSpecialty = doctor ? doctor.specialty : "Specialty not available";

                return (
                  <tr key={appointment.id} className="border-b">
                    <td className="px-4 py-4 sm:px-6 md:px-8">{doctorName}</td>
                    <td className="px-4 py-4 sm:px-6 md:px-8">{appointment.firstName} {appointment.lastName}</td>
                    <td className="px-4 py-4 sm:px-6 md:px-8">{appointment.date}</td>
                    <td className="px-4 py-4 sm:px-6 md:px-8">{appointment.time}</td>
                    <td className="px-4 py-4 sm:px-6 md:px-8">{appointment.message}</td>
                    <td className="px-4 py-4 sm:px-6 md:px-8">
                      <span
                        className={`px-3 py-1 text-white text-sm font-semibold rounded-full ${
                          appointment.status === 'Pending'
                            ? 'bg-black'
                            : appointment.status === 'Confirmed'
                            ? 'bg-green-500'
                            : 'bg-red-500'
                        }`}
                      >
                        {appointment.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-4 sm:px-6 md:px-8 flex space-x-4"> {/* Flex container for side by side buttons */}
                      <button
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                        onClick={() => handleUpdate(appointment.id)}
                      >
                        Update
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        onClick={() => handleCancel(appointment.id)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Appointment Modal */}
      {isUpdateModalOpen && selectedAppointment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-96 md:w-1/3">
            <h3 className="text-2xl mb-4">Update Appointment</h3>
            <div>
              <label className="block mb-2">Doctor</label>
              <select
                name="doctorId"
                value={updatedData.doctorId}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              >
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={updatedData.firstName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
            </div>
            <div>
              <label className="block mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={updatedData.lastName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
            </div>
            <div>
              <label className="block mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={updatedData.date}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
            </div>
            <div>
              <label className="block mb-2">Time</label>
              <input
                type="time"
                name="time"
                value={updatedData.time}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
            </div>
            <div>
              <label className="block mb-2">Message</label>
              <textarea
                name="message"
                value={updatedData.message}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
            </div>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                onClick={() => setIsUpdateModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
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
}

export default ViewAppointmentSchedule;
