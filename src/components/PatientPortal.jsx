
import React, { useContext, useState, useEffect} from 'react';
import HospitalContext from '../context/HospitalContext';
import { toast, ToastContainer } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const PatientPortal = () => {
  const { appointments, doctors, messages = [], addMessage, getMessageByAppointment} = useContext(HospitalContext);
  const [message, setMessage] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null)
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null)

  useEffect(() => {
  console.log("✅ Updated Selected Doctor ID:", selectedDoctorId);
  console.log("✅ Updated Selected Patient ID:", selectedPatientId);
}, [selectedDoctorId, selectedPatientId]);


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

  addMessage(selectedAppointmentId, 'patient', message.trim());

  setMessage('');
  toast.success('Message sent');
};



// const handleMessageSubmit = (e) => {
//   e.preventDefault();
//   if (!selectedDoctorId || !selectedPatientId) {
//     alert('Please select a doctor and patient to message.');
//     return;
//   }

//   addMessage({
//     id: uuidv4(),
//     doctorId: String(selectedDoctorId),
//     patientId: String(selectedPatientId),
//     text: message,
//     sender: 'patient',
//   });
//   setMessage('');
//   toast.success('Message sent')
// };
console.log("Selected Doctor ID:", selectedDoctorId);
console.log("Selected Patient ID:", selectedPatientId);


  // const patientMessages = (messages || []).filter(msg => String(msg.doctorId) === String(selectedDoctorId) && String(msg.patientId) === String(selectedPatientId));
//  const patientMessages = (messages || []).filter(
//   msg => String(msg.doctorId) === String(selectedDoctorId) &&
//          String(msg.patientId) === String(selectedPatientId)
// );
// const patientMessages = messages.filter(
//   msg =>
//     String(msg.doctorId) === String(selectedDoctorId) &&
//     String(msg.patientId) === String(selectedPatientId)
// );
const patientMessages = selectedAppointmentId ? getMessageByAppointment(selectedAppointmentId) : [];

// const patientMessages = (selectedDoctorId & selectedPatientId) ?
//  messages.filter(msg => String(msg.doctorId) === String(selectedDoctorId) &&
//   String(msg.patientId) === String(selectedPatientId)
// ):[];

  // const patientMessages = (selectedDoctorId && selectedPatientId)
  // ? messages.filter(
  //     msg =>
  //       String(msg.doctorId) === String(selectedDoctorId) &&
  //       String(msg.patientId) === String(selectedPatientId)
  //   )
  // : [];


console.log("All messages in PatientPortal:", messages);


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome to Patient Portal</h1>
      <h2 className='text-xl font-semibold mb-2'>Appointments</h2>
      <ul className='space-y-4'>
        {appointments.length === 0 ? (
          <li className="text-gray-500">No Appointments</li>
        ) : (
          appointments.map((appointment, index) => (
            <li key={index} className="rounded-md p-4 shadow">
              <p><strong>Patient:</strong> {appointment.firstName} {appointment.lastName}</p>
              <p><strong>Date:</strong>{appointment.date}</p>
              <p><strong>Time:</strong>{appointment.time}</p>
              <p><strong>Doctor:</strong>{getDoctorName(appointment.doctorId)}</p>
              <p><strong>Status:</strong>{appointment.status}</p>
              <button 
                onClick={() => {
                  console.log("🟢 Appointment clicked:", appointment); // <-- Add this
                  console.log("✅ doctorId:", appointment.doctorId);
                  console.log("✅ patientId:", appointment.patientId); // <-- Most important
                  
                  setSelectedAppointmentId(appointment.id)
                  setSelectedDoctorId(appointment.doctorId);
                  setSelectedPatientId(appointment.patientId);
                }} 
                className="text-blue-500 hover:underline mt-2"
              >
                Message Doctor
              </button>

            </li>
          ))
        )}
      </ul>
      
      {/* Messaging Form */}
      {selectedDoctorId && (
        <div>
          <form onSubmit={handleMessageSubmit} className="mt-6">
            <p>Messaging Dr. {getDoctorName(selectedDoctorId)}</p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message to the doctor here..."
              className="border rounded-md p-2 w-full"
              required
            />
            <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition mt-2">
              Send Message
            </button>
          </form>
          {selectedDoctorId && selectedPatientId && (
          <div>
            {/* <h3 className="text-lg font-semibold mt-4">Conversation:</h3>
            <ul>
              {patientMessages.map((msg) => (
                <li
                  key={msg.id}
                  className={`p-2 ${
                    msg.sender === 'patient' ? 'text-right bg-blue-50' : 'text-left bg-gray-50'
                  }`}
                >
                  <strong>{msg.sender === 'patient' ? 'You:' : `${getDoctorName(msg.doctorId)}:`}</strong> {msg.text}
                </li>
              ))}
            </ul> */}

            <ul>
              {patientMessages.map(msg => (
                <li
                  key={msg.id}
                  className={`p-2 ${msg.sender === 'patient' ? 'text-right bg-blue-50' : 'text-left bg-gray-50'}`}
                >
                  <strong>{msg.sender === 'patient' ? 'You:' : `Dr.`}</strong> {msg.message}
                </li>
              ))}
            </ul>

          </div>
        )}

          {/* <h3 className="text-lg font-semibold mt-4">Conversation:</h3>
          <ul>
            {patientMessages.map((msg, index) => (
              <li
                key={index}
                className={`p-2 ${
                  msg.sender === 'patient' ? 'text-right bg-blue-50' : 'text-left bg-gray-50'
                }`}
              >
                <strong>{msg.sender === 'patient' ? 'You:' : `${getDoctorName(msg.doctorId)}:`}</strong> {msg.text}
              </li>
            ))}
          </ul> */}
        </div>
      )}
      <ToastContainer position="top-right" autoClose={4000} />

    </div>
  );
};

export default PatientPortal;