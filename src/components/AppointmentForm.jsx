import React, { useState, useContext, useEffect } from "react";
import HospitalContext from "../context/HospitalContext";
import { Link } from "react-router-dom";

function AppointmentForm() {
  const { scheduleAppointment, error, doctors } = useContext(HospitalContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    date: '',
    time: '',
    message: '',
    doctorId: '',
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
    // Convert time string to Date object in the current day for comparison (e.g., "9:30 AM" -> Date object)
    const [time, modifier] = timeString.split(" ");
    const [hour, minute] = time.split(":").map(Number);
    let parsedHour = hour;
    if (modifier === "PM" && hour !== 12) parsedHour += 12; // Convert PM to 24-hour format
    if (modifier === "AM" && hour === 12) parsedHour = 0; // Convert 12 AM to 00:00

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

    // Check if selected doctor and date are valid
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

    // Check if the selected time is within working hours
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

      // Validate if the selected time is within working hours
      if (selectedTime < workingStart || selectedTime > workingEnd) {
        setInvalidTimeMessage("Doctor's time is not correct. Please select a time within the doctor's working hours.");
      } else {
        setInvalidTimeMessage('');
      }
    }
  };

  const handleSubmit = (e) => {
  e.preventDefault();  // Prevent the default form submission behavior

  // Clear any existing error or success messages before proceeding
  setErrorMessage('');
  setSuccessMessage('');

  // Check if all fields are filled out
  if (!formData.firstName || !formData.lastName || !formData.email || !formData.date || !formData.time || !formData.message || !formData.doctorId || !selectedDoctor) {
    // Set a timeout for showing the error message after 2 seconds
    const errorTimer = setTimeout(() => {
      setErrorMessage("Please fill out all fields before booking.");
    }, 2000); // Timeout for error message

    return () => clearTimeout(errorTimer);  // Cleanup the timer if needed
  }

  // Check if there are any invalid date or time errors
  if (invalidDateMessage || invalidTimeMessage) {
    // Set a timeout for showing invalid time or date message after 2 seconds
    const errorTimer = setTimeout(() => {
      setErrorMessage(invalidDateMessage || invalidTimeMessage);
    }, 2000); // Timeout for invalid time/date message

    return () => clearTimeout(errorTimer);  // Cleanup the timer if needed
  }

  // If no validation errors, proceed to schedule the appointment
  const successTimer = setTimeout(() => {
    // Call scheduleAppointment with formData
    scheduleAppointment(formData);

    // Show success message after 2 seconds
    setSuccessMessage("Appointment booked successfully!");

    // Clear the form after successful booking
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      date: '',
      time: '',
      message: '',
      doctorId: '',
    });
    setSelectedDoctor(null);

    // Reset success message after 4 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 2000); // Timeout for success message to disappear
  }, 2000); // Timeout for success message after 2 seconds

  // Optionally, handle cleanup if necessary
  return () => {
    clearTimeout(successTimer);  // Cleanup the success timer if needed
  };
};


  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Book an Appointment</h2>

      {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
      {errorMessage && <div className="bg-red-500 text-white p-2 rounded mb-4">{errorMessage}</div>}
      {successMessage && <div className="bg-green-500 text-white p-2 rounded mb-4">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="mb-4">
          <label htmlFor="firstName" className="block">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label htmlFor="lastName" className="block">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Doctor Selection */}
        <div className="mb-4">
          <label htmlFor="doctorId" className="block">Select Doctor</label>
          <select
            id="doctorId"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialty}
              </option>
            ))}
          </select>
        </div>

        {/* Display selected doctor's details */}
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
        <div className="mb-4">
          <label htmlFor="date" className="block">Appointment Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {invalidDateMessage && <p className="text-red-500">{invalidDateMessage}</p>}
        </div>

        {/* Appointment Time */}
        <div className="mb-4">
          <label htmlFor="time" className="block">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {invalidTimeMessage && <p className="text-red-500">{invalidTimeMessage}</p>}
        </div>

        {/* Message */}
        <div className="mb-4">
          <label htmlFor="message" className="block">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>

        {/* Submit */}
        <div className="mb-4 flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Book Appointment
          </button>
          <Link to="/" className="text-blue-600 hover:underline">Cancel</Link>
        </div>
      </form>
    </div>
  );
}

export default AppointmentForm;
