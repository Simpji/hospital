import React, { useContext, useState, useEffect } from "react";
import HospitalContext from "../../context/HospitalContext";

function ViewAppoint() {
  const { appointments, doctors, updateAppointment, cancelAppointment } = useContext(HospitalContext);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    firstName: "",
    lastName: "",
    date: "",
    time: "",
    message: "",
  });

  const [selectedTab, setSelectedTab] = useState("all"); // State to manage selected tab

  // Ensure all appointments are initially pending
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
        firstName: appointmentToUpdate.firstName,
        lastName: appointmentToUpdate.lastName,
        date: appointmentToUpdate.date,
        time: appointmentToUpdate.time,
        message: appointmentToUpdate.message,
      });
      setIsUpdateModalOpen(true); // Show the update modal
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

  // Confirm appointment and update the status to "Confirmed"
  const handleConfirm = (appointmentId) => {
    const updatedAppointment = appointments.find((appointment) => appointment.id === appointmentId);
    if (updatedAppointment) {
      updateAppointment(appointmentId, { ...updatedAppointment, status: 'Confirmed' });
    }
  };

  // Filter appointments based on selected tab
  const filteredAppointments = appointments.filter((appointment) => {
    if (selectedTab === "all") return true;
    return appointment.status.toLowerCase() === selectedTab.toLowerCase();
  });

  return (
    <div  className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Your Appointments</h2>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 text-sm font-semibold rounded-lg ${selectedTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedTab("all")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 text-sm font-semibold rounded-lg ${selectedTab === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedTab("pending")}
        >
          Pending
        </button>
        <button
          className={`px-4 py-2 text-sm font-semibold rounded-lg ${selectedTab === 'confirmed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedTab("confirmed")}
        >
          Confirmed
        </button>
      </div>

      {/* Display appointments */}
      {filteredAppointments.length === 0 ? (
        <p className="text-center text-lg text-gray-500">You have no {selectedTab} appointments.</p>
      ) : (
        <ul className="space-y-6">
          {filteredAppointments.map((appointment) => {
            const doctor = doctors.find((doc) => doc.id === appointment.doctorId);
            const doctorName = doctor ? doctor.name : "Unknown Doctor";
            const doctorSpecialty = doctor ? doctor.specialty : "Specialty not available";

            return (
              <li key={appointment.id} className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                  Appointment with Dr. {doctorName}
                </h3>
                <p><strong className="font-medium">Doctor's Specialty:</strong> {doctorSpecialty}</p>
                <p><strong className="font-medium">Name:</strong> {appointment.firstName} {appointment.lastName}</p>
                <p><strong className="font-medium">Date:</strong> {appointment.date}</p>
                <p><strong className="font-medium">Time:</strong> {appointment.time}</p>
                <p><strong className="font-medium">Message:</strong> {appointment.message}</p>
                <p>
                  <strong className="font-medium">Status:</strong> {appointment.status || "Pending"}
                  <span
                    className={`ml-2 px-3 py-1 text-white text-sm font-semibold rounded-full ${appointment.status === 'Pending' ? 'bg-black' : appointment.status === 'Confirmed' ? 'bg-green-500' : 'bg-red-500'}`}
                  >
                    {appointment.status}
                  </span>
                </p>

                <div className="mt-4 flex flex-col sm:flex-row sm:justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                  {/* Show Confirm button if status is Pending */}
                  {appointment.status === "Pending" && (
                    <button
                      onClick={() => handleConfirm(appointment.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      disabled={appointment.status === "Confirmed"}
                    >
                      Confirm Appointment
                    </button>
                  )}
                  <button
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                    onClick={() => handleUpdate(appointment.id)}
                  >
                    Update Appointment
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    onClick={() => handleCancel(appointment.id)}
                  >
                    Cancel Appointment
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Update Appointment Modal */}
      {isUpdateModalOpen && selectedAppointment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
            <h3 className="text-2xl mb-4">Update Appointment</h3>
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

export default ViewAppoint;
