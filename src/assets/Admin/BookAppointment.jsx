import React, { useState, useContext, useEffect } from "react";
import HospitalContext from "../../context/HospitalContext";
import { Link } from "react-router-dom";

function BookAppointment() {
  const { scheduleAppointment, error, doctors } = useContext(HospitalContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    date: '',
    time: '',
    message: '',
    doctorId: '',
    patientId: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [invalidDateMessage, setInvalidDateMessage] = useState('');
  const [invalidTimeMessage, setInvalidTimeMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!formData.date) {
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0]; // Set to today's date if empty
      setFormData((prevState) => ({
        ...prevState,
        date: formattedDate,
      }));
    }
  }, [formData.date]);

  const parseTime = (timeString) => {
    const [time, modifier] = timeString.split(" ");
    const [hour, minute] = time.split(":").map(Number);
    let parsedHour = hour;
    if (modifier === "PM" && hour !== 12) parsedHour += 12;
    if (modifier === "AM" && hour === 12) parsedHour = 0;

    const currentDate = new Date();
    currentDate.setHours(parsedHour, minute, 0, 0);
    return currentDate;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const updatedData = { ...prevState, [name]: value };

      if (name === 'doctorId') {
        const doctor = doctors.find(doc => doc.id === value);
        setSelectedDoctor(doctor);
      }

      return updatedData;
    });

    if (name === 'date' && selectedDoctor) {
      const selectedDate = new Date(value);
      const nigeriaTime = new Date(selectedDate.toLocaleString("en-US", { timeZone: "Africa/Lagos" }));
      const selectedDay = nigeriaTime.toLocaleDateString('en-NG', { weekday: 'long' }).toLowerCase();
      const doctorWorkingDays = selectedDoctor.workingDays.map(day => day.toLowerCase().trim());

      if (!doctorWorkingDays.includes(selectedDay)) {
        setInvalidDateMessage("The selected date is not a working day for the selected doctor.");
      } else {
        setInvalidDateMessage('');
      }
    }

    if (name === 'time' && selectedDoctor) {
      const selectedTime = parseTime(value);
      const workingHours = selectedDoctor.workingHours.split("-");

      if (workingHours.length !== 2) {
        console.error("Invalid working hours format:", selectedDoctor.workingHours);
        setInvalidTimeMessage("Doctor's working hours format is invalid.");
        return;
      }

      const workingStart = parseTime(workingHours[0].trim());
      const workingEnd = parseTime(workingHours[1].trim());

      if (selectedTime < workingStart || selectedTime > workingEnd) {
        setInvalidTimeMessage("Doctor's time is not correct. Please select a time within the doctor's working hours.");
      } else {
        setInvalidTimeMessage('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const tempPatientId = Date.now().toString();
    const formPatientId = {...formData, patientId: tempPatientId}

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.date || !formData.time || !formData.message || !formData.doctorId || !selectedDoctor) {
      const errorTimer = setTimeout(() => {
        setErrorMessage("Please fill out all fields before booking.");
      }, 1000);

      return () => clearTimeout(errorTimer);
    }

    if (invalidDateMessage || invalidTimeMessage) {
      const errorTimer = setTimeout(() => {
        setErrorMessage(invalidDateMessage || invalidTimeMessage);
      }, 2000);

      return () => clearTimeout(errorTimer);
    }

    const successTimer = setTimeout(() => {
      scheduleAppointment(formPatientId);
      setSuccessMessage("Appointment booked successfully!");
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        date: '',
        time: '',
        message: '',
        doctorId: '',
        patientId: ''
      });
      setSelectedDoctor(null);

      setTimeout(() => {
        setSuccessMessage('');
      }, 2000);
    }, 2000);

    return () => {
      clearTimeout(successTimer);
    };
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Appointment Form */}
      <div className="flex-1 p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Book an Appointment</h2>

        {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
        {errorMessage && <div className="bg-red-500 text-white p-2 rounded mb-4">{errorMessage}</div>}
        {successMessage && <div className="bg-green-500 text-white p-2 rounded mb-4">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* First Name */}
            <div className="flex flex-col">
              <label htmlFor="firstName" className="mb-2 text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label htmlFor="lastName" className="mb-2 text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

            {/* Doctor Selection */}
            <div className="flex flex-col">
              <label htmlFor="doctorId" className="mb-2 text-sm font-medium text-gray-700">Select Doctor</label>
              <select
                id="doctorId"
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                <option value="">Select a Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </select>
            </div>

            {selectedDoctor && (
              <div className="mb-4">
                <h3 className="font-semibold text-lg">Selected Doctor:</h3>
                <p><strong>Name:</strong> {selectedDoctor.name}</p>
                <p><strong>Specialty:</strong> {selectedDoctor.specialty}</p>
                <h4 className="font-semibold">Working Days:</h4>
                <ul>
                  {selectedDoctor.workingDays.map((day, index) => (
                    <li key={index}>{day}</li>
                  ))}
                </ul>
                <p><strong>Working Hours:</strong> {selectedDoctor.workingHours}</p>
              </div>
            )}

            {/* Appointment Date */}
            <div className="flex flex-col">
              <label htmlFor="date" className="mb-2 text-sm font-medium text-gray-700">Appointment Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
              {invalidDateMessage && <p className="text-red-500 mt-1 text-sm">{invalidDateMessage}</p>}
            </div>

            {/* Appointment Time */}
            <div className="flex flex-col">
              <label htmlFor="time" className="mb-2 text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
              {invalidTimeMessage && <p className="text-red-500 mt-1 text-sm">{invalidTimeMessage}</p>}
            </div>

            {/* Message */}
            <div className="flex flex-col md:col-span-2">
              <label htmlFor="message" className="mb-2 text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookAppointment;
