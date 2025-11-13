import React, { useContext, useState, useEffect } from 'react';
import HospitalContext from '../context/HospitalContext';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

const PatientPortal = () => {
  const {
    appointments,
    doctors,
    messages = [],
    addMessage
  } = useContext(HospitalContext);

  const [message, setMessage] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [combinedMessages, setCombinedMessages] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const savedInvoice = JSON.parse(localStorage.getItem("invoices")) || [];
    if (savedInvoice.length > 0) {
      setInvoices(savedInvoice);
    }
  }, []);

  useEffect(() => {
    const savedDoctorMessages = JSON.parse(localStorage.getItem("doctorMessages")) || [];
    const combined = [
      ...messages,
      ...savedDoctorMessages.filter(m => !messages.some(msg => msg.id === m.id))
    ];
    setCombinedMessages(combined);
  }, [messages]);

  const getDoctorName = (doctorId) => {
    const doctor = doctors.find(doc => doc.id === String(doctorId));
    return doctor ? doctor.name : "Unknown Doctor";
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (!selectedAppointmentId || !message.trim()) {
      alert('Please select an appointment and write a message.');
      return;
    }
    addMessage(selectedAppointmentId, message.trim(), 'patient');
    setMessage('');
    toast.success('Message sent');
  };

  const patientMessages = (selectedDoctorId && selectedPatientId)
    ? combinedMessages.filter(
        msg =>
          String(msg.doctorId) === String(selectedDoctorId) &&
          String(msg.patientId) === String(selectedPatientId)
      )
    : [];

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Welcome to Patient Portal</h1>
      <Link to= "/doctorDashboard"><h2 className='text-red-900'>DoctorDashboard</h2></Link>
      {/* Appointments */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">Appointments</h2>
        <ul className="space-y-4">
          {appointments.length === 0 ? (
            <li className="text-gray-500">No Appointments</li>
          ) : (
            appointments.map((appointment, index) => (
              <li
                key={index}
                className="rounded-md p-4 shadow-sm border bg-gray-50 hover:bg-gray-100 transition"
              >
                <div className="text-sm sm:text-base">
                  <p><strong>Patient:</strong> {appointment.firstName} {appointment.lastName}</p>
                  <p><strong>Date:</strong> {appointment.date}</p>
                  <p><strong>Time:</strong> {appointment.time}</p>
                  <p><strong>Doctor:</strong> {getDoctorName(appointment.doctorId)}</p>
                  <p><strong>Status:</strong> {appointment.status}</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedAppointmentId(appointment.id);
                    setSelectedDoctorId(appointment.doctorId);
                    setSelectedPatientId(appointment.patientId);
                  }}
                  className="text-blue-600 font-medium hover:underline mt-3 block"
                >
                  Message Doctor
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Invoices Section - Only show after clicking "Message Doctor" */}
      {selectedDoctorId && selectedPatientId && (
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">My Invoices</h2>

          {patientMessages.some(msg => msg.sender === 'doctor') ? (
            invoices.filter(
              inv =>
                String(inv.patientId) === String(selectedPatientId) &&
                String(inv.doctorId) === String(selectedDoctorId)
            ).length > 0 ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {invoices
                  .filter(
                    inv =>
                      String(inv.patientId) === String(selectedPatientId) &&
                      String(inv.doctorId) === String(selectedDoctorId)
                  )
                  .map(inv => (
                    <li
                      key={inv.id}
                      className="p-4 border rounded-md bg-gray-50 shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <p><strong>Invoice ID:</strong> {inv.id}</p>
                        <p><strong>Appointment ID:</strong> {inv.appointmentId}</p>
                        <p><strong>Amount:</strong> ₦{inv.amount}</p>
                        <p><strong>Status:</strong> {inv.status}</p>
                        <p><strong>Date Issued:</strong> {new Date(inv.dateIssued || Date.now()).toLocaleString()}</p>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
                        <button
                          className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                        <button
                          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Make Payment
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-gray-500">No invoices available yet.</p>
            )
          ) : (
            <p className="text-gray-500 italic">
              No doctor messages yet — invoices will appear once your doctor sends one.
            </p>
          )}
        </div>
      )}

      {/* Messaging Section */}
      {selectedDoctorId && (
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-6">
          <form onSubmit={handleMessageSubmit} className="space-y-3">
            <p className="font-medium">Messaging {getDoctorName(selectedDoctorId)}</p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message to the doctor..."
              className="border rounded-md p-2 w-full text-sm sm:text-base"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition"
            >
              Send Message
            </button>
          </form>

          {selectedDoctorId && selectedPatientId && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Conversation</h3>
              <div className="max-h-64 overflow-y-auto border rounded-md p-3 bg-gray-50 space-y-2">
                {patientMessages.map(msg => (
                  <div
                    key={msg.id}
                    className={`p-2 rounded-md max-w-[80%] ${
                      msg.sender === 'patient'
                        ? 'ml-auto bg-blue-100 text-right'
                        : 'mr-auto bg-gray-200 text-left'
                    }`}
                  >
                    <strong>
                      {msg.sender === 'patient' ? 'You:' : `${getDoctorName(msg.doctorId)}:`}
                    </strong>{' '}
                    {msg.message}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
};

export default PatientPortal;
