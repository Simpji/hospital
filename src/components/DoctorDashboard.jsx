import React, { useState, useContext, useEffect, useMemo} from 'react';
import { Link } from 'react-router-dom';
import {FaHome, FaUser, FaHeartbeat, FaCalendarAlt,FaStethoscope, FaCog} from 'react-icons/fa';
import HospitalContext from '../context/HospitalContext';
import { v4 as uuidv4 } from 'uuid';
import { SlMenu } from "react-icons/sl";
import { MdCancel } from "react-icons/md";
import DoctorMessage from './DoctorMessage';

const DoctorDashboard = () => {
  const { appointments, doctors, updateAppointment, deleteMessage, cancelAppointment, doctorId, messages = [], addMessage, generateInvoiceForAppointment, invoice} = useContext(HospitalContext);
  // const { appointments, doctors, updateAppointment, deleteMessage, cancelAppointment, doctorId, messages = [], addMessage, getMessageByAppointment} = useContext(HospitalContext);
  const [selectedDoctorId, setSelectedDoctorId] = useState(() => {
    return localStorage.getItem("doctorId" || "")
  }); // or ''
  const [isAppointmentDropDown, setIsAppointmentDropDown] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  // const [seletedAppointment, setSeletedAppointment] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [patientMessages, setPatientMessages] = useState([])
  const [doctorMessages, setDoctorMessages] = useState([]);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
 const [isManagementOpen, setIsManagementOpen] = useState(false);
 const [sidebarOpen, setSidebarOpen] = useState(false);


  const toggleManagement = () => {
      setIsManagementOpen(!isManagementOpen);
  };

    

  const [replyMap, setReplyMap] = useState({});
  const [updatedData, setUpdatedData] = useState({
     doctorId: "",
     firstName: "",
     lastName: "",
     time: "",
     date: "",
     message: ""
  })
  

  console.log("see message:", messages);
  
  


console.log("Doctor ID:", doctorId);
console.log("Doctor Messages:", doctorMessages);
console.log("Patient Messages", patientMessages);




// Get unique patient IDs who messaged this doctor
// const uniquePatientIds = [...new Set(doctorMessages.map(msg => msg.patientId))];
const uniquePatientIds = [...new Set(doctorMessages
  .map(msg => msg.patientId)
  .filter(pid => pid !== undefined && pid !== null)
)];

useEffect(() => {
  if(!appointments || !selectedDoctorId) return;

  const savedMessages = JSON.parse(localStorage.getItem("doctorMessages")) || [];
  
  const doctorAppointments = appointments.filter(
    appt => String(appt.doctorId) === String(selectedDoctorId)
  );

  const appointmentIds = doctorAppointments.map(appt => appt.id);

  const filteredMessages = [
    ...messages.filter(msg => appointmentIds.includes(msg.appointmentId)),
    ...savedMessages.filter(msg => appointmentIds.includes(msg.appointmentId))
  ];

  const uniqueMessages = filteredMessages.filter(
    (msg, index, self) => index === self.findIndex(m => m.id === msg.id)
  );

  setDoctorMessages(uniqueMessages);
}, [appointments, messages, selectedDoctorId]);



// useEffect(() => {
//   if(!appointments || !doctorId) return;

//   const savedMessages = JSON.parse(localStorage.getItem("doctorMessages")) || [];
  
//   const doctorAppointments = appointments.filter(
//     appt => String(appt.doctorId) === String(doctorId)
//   );
//   const appointmentIds = doctorAppointments.map(appt => appt.id);

//   const filteredMessages = [
//     ...messages.filter(msg => appointmentIds.includes(msg.appointmentId)),
//     ...savedMessages.filter(msg => appointmentIds.includes(msg.appointmentId))
//   ];

//   // remove duplicates by message id
//   const uniqueMessages = filteredMessages.filter(
//     (msg, index, self) => index === self.findIndex(m => m.id === msg.id)
//   );

//   setDoctorMessages(uniqueMessages);
// }, [appointments, messages, doctorId]);



useEffect(() => {
  if (!selectedPatientId) {
    setPatientMessages([]);
    return;
  }

  // Use the state `doctorMessages` directly, not re-declaring a local variable
  const filtered = doctorMessages.filter(
    msg => String(msg.patientId) === String(selectedPatientId)
  );

  setPatientMessages(filtered);
}, [doctorMessages, selectedPatientId]);




useEffect(() => {
  console.log("Selected Patient ID", selectedPatientId)
  if (!selectedPatientId && uniquePatientIds.length > 0) {
    setSelectedPatientId(uniquePatientIds[0]);
  }
}, [uniquePatientIds, selectedPatientId]);




const handleReply = (patientId) => {
  const text = replyMap[patientId];
  if (!text) return;

  const appointment = appointments.find(
    appt =>
      String(appt.doctorId) === String(selectedDoctorId) &&
      String(appt.patientId) === String(patientId)
  );

  if (!appointment) {
    alert("No appointment found for this patient and doctor.");
    return;
  }

  const newMessage = {
    id: uuidv4(),
    appointmentId: appointment.id,
    doctorId: selectedDoctorId,
    patientId: patientId,
    sender: 'doctor',
    message: text,
    timestamp: new Date().toISOString(),
  };

  // Update local state
  setDoctorMessages(prev => [...prev, newMessage]);

  // Add to global context
  addMessage(newMessage);

  // ✅ Save to localStorage
  const savedMessages = JSON.parse(localStorage.getItem("doctorMessages")) || [];
  localStorage.setItem("doctorMessages", JSON.stringify([...savedMessages, newMessage]));

  // Clear input
  setReplyMap(prev => ({ ...prev, [patientId]: '' }));
};





  const toggleAppointmentDropDown = () => {
    setIsAppointmentDropDown(!isAppointmentDropDown);
  };

 

  const getDoctorName = (id) => {
    const doctor = doctors.find(d => d.id === id);
    return doctor ? doctor.name : "Unknown Doctor";
  };

const getPatientName = (patientId) => {
  const messageWithName = doctorMessages.find(msg => msg.patientId === patientId && msg.patientName);
  if (messageWithName) return messageWithName.patientName;

  const matchedAppointments = appointments.filter(app => String(app.patientId) === String(patientId));
  if (matchedAppointments.length === 0) return `Patient ${patientId}`;

  const latest = matchedAppointments[matchedAppointments.length - 1];
  const firstName = latest?.firstName || "Unknown";
  const lastName = latest?.lastName || "Patient";

  return `${firstName} ${lastName}`;
};




  const handleUpdate = (appointmentId) => {
    const appointmentToUpdate = appointments.find((appointment) => appointment.id === appointmentId);
    if (appointmentToUpdate) {
      setSelectedAppointment(appointmentToUpdate);
      setUpdatedData({
        doctorId: appointmentToUpdate.doctorId,
        firstName: appointmentToUpdate.firstName,
        lastName: appointmentToUpdate.lastName,
        time: appointmentToUpdate.time,
        date: appointmentToUpdate.date,
        message: appointmentToUpdate.message,
      });
      setIsUpdateModalOpen(true)
    }
  }
  

  const handleCancle = (appointmentId) => {
    cancelAppointment(appointmentId);
    console.log(`Appointment with ID: ${appointmentId} has been cancled`)
  }

  const handleSaveUpdate = () => {
    if (selectedAppointment) {
      updateAppointment(selectedAppointment.id, updatedData)
      setIsUpdateModalOpen(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData, 
      [name]: value,
    }));
  }
 
  const sortedAppointments = useMemo(() => {
  return [...appointments].sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));
}, [appointments]);


  const pendingReportsCount = appointments.filter(appt => appt.status === "Pending").length;
  

  const today = new Date().toISOString().split("T")[0];
  const todaysAppointments = appointments.filter(appt => appt.date === today);
  const totalUniquePatients = new Set(appointments.map(appt => `${appt.firstName}-${appt.lastName}`)).size;



  const handleGenerateInvoice = (appt) => {
  if (appt.status !== "Confirmed") {
    alert("Invoice can only be generated for confirmed appointments.");
    return;
  }

  const newInvoice = {
    id: Date.now().toString(),
    appointmentId: appt.id,
    doctorId: appt.doctorId,   // ✅ fixed (was appt.id)
    patientId: appt.patientId, // ✅ fixed (was appt.id)
    amount: 200,
    status: "Unpaid",
    currency: "NGN",
    patientName: `${appt.firstName} ${appt.lastName}`,
    doctorName: getDoctorName(appt.doctorId),
    description: `Consultation with Dr. ${getDoctorName(appt.doctorId)}`,
    dateIssued: new Date().toISOString(),
  };

  // ✅ Save all invoices in an array
  const existingInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
  existingInvoices.push(newInvoice);
  localStorage.setItem("invoices", JSON.stringify(existingInvoices));

  setSelectedInvoice(newInvoice);
  setIsInvoiceModalOpen(true);
};

const handleMakePayment = (invoice) => {
  if (!window.FlutterwaveCheckout) {
    alert("Flutterwave library not loaded!");
    return;
  }

  const paymentConfig = {
    public_key: "FLWPUBK_TEST-de0fa74d6bbebdc73189b654d2a98ae1-X",
    tx_ref: `INV-${invoice.id}-${Date.now()}`,
    amount: invoice.amount,
    currency: "NGN",
    payment_options: "card, banktransfer, ussd",
    customer: {
      name: `Patient ${invoice.patientId}`,
      email: "patient@example.com",
      phone_number: "08000000000",
    },
    customizations: {
      title: "Medical Consultation Payment",
      description: `Payment for appointment #${invoice.appointmentId}`,
      logo: "https://your-hospital-logo-url.com/logo.png",
    },
    callback: (response) => {
      console.log("Payment Response:", response);
      if (response.status === "successful") {
        alert("Payment successful!");
        setSelectedInvoice((prev) => ({
          ...prev,
          status: "Paid",
        }));
      } else {
        alert("Payment was not completed.");
      }
      window.FlutterwaveCheckout.close();
    },
    onclose: () => console.log("Payment window closed"),
  };

  window.FlutterwaveCheckout(paymentConfig);
};

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden cool">
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)} 
        className="lg:hidden p-2 mt-5 text-white bg-red-800 lg:bg-blue-950 fixed top-4 left-5 z-[999] rounded-lg"
      >
        {sidebarOpen ?  "✖" : "☰"}
      </button>

        <aside
        className={`
          w-67 bg-blue-800 text-white flex flex-col p-6 
          fixed lg:static top-0 left-0 h-screen z-50
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "translate-x-[-100%] lg:translate-x-0"}
        `}
      >
        <h1 className="text-2xl font-semibold mb-8">Doctor Dashboard</h1>

        <nav className="flex-grow">
          <ul className="space-y-4">

            <li>
              <Link to="/" className="flex items-center space-x-3 hover:bg-green-950 text-white p-2 rounded transition">
                <FaHome /><span>Home</span>
              </Link>
            </li>

            <li>
              <Link to="/PatientHistory" className="flex items-center space-x-3 hover:bg-green-950 text-white p-2 rounded transition">
                <FaUser /><span>Patients</span>
              </Link>
            </li>

            <li>
              <Link to="/patientportal" className="flex items-center space-x-3 hover:bg-green-950 text-white p-2 rounded transition">
                <FaUser /><span>Patientportal</span>
              </Link>
            </li>

            <li>
              <Link to="/doctor" className="flex items-center space-x-3 hover:bg-green-950 text-white p-2 rounded transition">
                <FaStethoscope /><span>Doctors</span>
              </Link>
            </li>

             <li>
              <Link to="/patientDashboard" className="flex items-center space-x-3 hover:bg-green-950 text-white p-2 rounded transition">
                <FaStethoscope /><span>PatientDashboard</span>
              </Link>
            </li>

            <li>
              <Link to="/PatientAdd" className="flex items-center space-x-3 hover:bg-green-950 text-white p-2 rounded transition">
                <FaHeartbeat /><span>Add Patient</span>
              </Link>
            </li>

            {/* Appointments Dropdown */}
            <li className="relative">
              <div
                onClick={toggleAppointmentDropDown}
                className="flex items-center justify-between space-x-3 cursor-pointer hover:bg-green-950 text-white p-2 rounded transition"
              >
                <div className="flex items-center space-x-3">
                  <FaCalendarAlt /><span>Appointments</span>
                </div>
                <span
                  className={`transform transition-transform ${isAppointmentDropDown ? "rotate-90" : ""}`}
                >
                  ▶
                </span>
              </div>

              {isAppointmentDropDown && (
                <ul className="ml-6 mt-2 space-y-2 bg-blue-800 rounded p-2">
                  <li>
                    <Link to="/BookAppointment" className="block hover:bg-green-950 text-white rounded p-2 transition">
                      Book
                    </Link>
                  </li>
                  <li>
                    <Link to="/viewAppointment" className="block hover:bg-green-950 text-white rounded p-2 transition">
                      View
                    </Link>
                  </li>
                </ul>
              )}
            </li>

          </ul>
        </nav>

        <div className="mt-auto pt-4 border-t border-blue-700">
          <Link to="/settings" className="flex items-center space-x-3 hover:bg-green-950 text-white p-2 rounded transition">
            <FaCog /><span>Settings</span>
          </Link>
        </div>
      </aside>


  

      <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">
        {/* Header */}
        <div className="mb-10 mt-3">
          <h2 className="text-3xl font-bold text-gray-800 ">
            Welcome to your dashboard 👋
          </h2>
          <p className="text-gray-500 mt-2">Here's what's happening today</p>
        </div>

        {/* Notifications / Reminders */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Reminders</h3>
        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>Review patient lab results by 5 PM</li>
          <li>Team meeting at 3 PM</li>
          <li>Update medical inventory</li>
        </ul>
      </div>

      {/* Temporary Doctor Selector for testing */}
        <div className="bg-white shadow rounded-lg p-4 mb-6 mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select a Doctor (for testing, no login yet):
          </label>
          <select
            value={selectedDoctorId || ""}
            onChange={(e) => {
              setSelectedDoctorId(e.target.value);
              localStorage.setItem("doctorId", e.target.value);
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">-- Choose a doctor --</option>
            {doctors.map(doc => (
              <option key={doc.id} value={doc.id}>
                Dr. {doc.name} ({doc.specialty})
              </option>
            ))}
          </select>
        </div>


      {/* Messaging Section */}
      <div className="bg-white shadow rounded-lg p-6 mt-8 mb-4">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Message Patients</h3>
        
        {uniquePatientIds.length === 0 ? (
          <p className="text-gray-500">No messages from patients.</p>
        ) : (
          <>
            {/* Patient selector */}
            <ul className="mb-4 flex flex-wrap gap-2">
              {uniquePatientIds.map(pid => (
                <li key={pid}>
                  <button
                    onClick={() => setSelectedPatientId(pid)}
                    className={`px-3 py-1 rounded ${
                      pid === selectedPatientId ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    Patient {pid}
                  </button>
                </li>
              ))}
            </ul>

            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="block w-full max-w-xs p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {uniquePatientIds.map(pid => (
                <option key={pid} value={pid}>
                  {getPatientName(pid)}
                </option>
              ))}
            </select>

            <ul className="space-y-3 max-h-96 overflow-y-auto border p-4 bg-white rounded shadow">
              {patientMessages.map((msg) => (
                <li key={msg.id} className={`p-3 rounded-md ${
                  msg.sender === 'doctor' ? 'bg-green-100 text-left' : 'bg-blue-100 text-right'
                }`}>
                  <div className="text-sm text-gray-700">
                    <strong>{msg.sender === 'doctor' ? getDoctorName(msg.doctorId) : getPatientName(msg.patientId)}:</strong>
                  </div>
                  <div className="text-md">{msg.message}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(msg.timestamp).toLocaleString()}
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this message?")) {
                        deleteMessage(msg.id);
                        const savedMessages = JSON.parse(localStorage.getItem("doctorMessages")) || [];
                          const updated = savedMessages.filter(m => m.id !== msg.id);
                          localStorage.setItem("doctorMessages", JSON.stringify(updated));

                          setDoctorMessages(prev => prev.filter(m => m.id !== msg.id));
                      }
                    }}
                    className="text-sm text-red-600 hover:text-red-800 mt-1 block"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>

            {/* Conversation */}
            <div className="mb-4 p-4 border rounded max-h-80 overflow-y-auto bg-gray-50">
              {/* <h4 className="font-semibold mb-2">Conversation with Patient ID: {selectedPatientId}</h4> */}
              <ul className="mb-2 space-y-2">
              </ul>
              <textarea
                value={replyMap[selectedPatientId] || ''}
                onChange={(e) =>
                  setReplyMap(prev => ({ ...prev, [selectedPatientId]: e.target.value }))
                }
                placeholder="Type your reply..."
                className="w-full p-2 border rounded mb-2"
              />
              <button
                onClick={() => handleReply(selectedPatientId)}
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              >
                Send Reply
              </button>
            </div>
          </>
        )}
      </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700">Today's Appointments</h3>
            {/* Count today's appointments for the stats */}
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {todaysAppointments.length}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700">Total Patients</h3>
            <p className="mt-2 text-3xl font-bold text-green-600">
              { totalUniquePatients}
              {/* {totalUniquePatients} */}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700">Pending Reports</h3>
            <p className="mt-2 text-3xl font-bold text-red-500">
              {pendingReportsCount}
            </p>
          </div>
        </div>
        

        <ul className="space-y-4 bg-white shadow rounded-lg p-6 mb-8 coolk">
        {/* <ul className="space-y-4 bg-white shadow rounded-lg p-6 mb-8 w-full max-w-[400px] mx-auto"> */}
        <h3 className="text-xl font-semibold text-gray-700 mb-4">All Appointments</h3>
        {sortedAppointments.map((appt) => (
          <li key={appt.id} className="flex items-center justify-between border-b p-3 cooll">
            <div>
              <p className="text-md font-medium text-gray-800">
                {getDoctorName(appt.doctorId)} <br />
                Patient: {appt.firstName} {appt.lastName}
              </p>
              <p className="text-sm text-gray-500">
                {appt.date} at {appt.time} - {appt.reason}
              </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center lg:space-x-3 space-y-3 lg:space-y-0">
              <span
                className={`text-sm font-medium ${
                  appt.status === 'Confirmed'
                    ? 'text-blue-600'
                    : appt.status === 'Pending'
                    ? 'text-yellow-600'
                    : 'text-green-600'
                }`}
              >
                {appt.status}
              </span>

              {/* Generate Invoice button */}
              {/* Generate Invoice button */}
              <button
                disabled={appt.status !== "Confirmed"}
                onClick={() => handleGenerateInvoice(appt)}
                className={`text-sm px-3 py-1 cloo rounded ${
                  appt.status === "Confirmed"
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                Generate Invoice
              </button>

              {/* Invoice Modal (moved outside the button) */}
              {isInvoiceModalOpen && selectedInvoice && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-96 md:w-1/3">
                    <h3 className="text-2xl mb-4 font-semibold text-gray-800">Invoice Details</h3>

                    <div className="space-y-2 text-gray-700">
                      <p><strong>Invoice ID:</strong> {selectedInvoice.id}</p>
                      <p><strong>Appointment ID:</strong> {selectedInvoice.appointmentId}</p>
                      <p><strong>Doctor ID:</strong> {selectedInvoice.doctorId}</p>
                      <p><strong>Patient ID:</strong> {selectedInvoice.patientId}</p>
                      <p><strong>Amount:</strong> ₦{selectedInvoice.amount}</p>
                      <p><strong>Status:</strong> {selectedInvoice.status}</p>
                      <p><strong>Date Issued:</strong> {new Date(selectedInvoice.dateIssued).toLocaleString()}</p>
                    </div>

                    <div className="flex justify-between mt-6">
                      <button
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        onClick={() => setIsInvoiceModalOpen(false)}
                      >
                        Cancel
                      </button>

                      <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        onClick={() => handleMakePayment(selectedInvoice)}
                      >
                        Make Payment
                      </button>
                    </div>
                  </div>
                </div>
              )}

                            {/* </button> */}

              <button
                onClick={() => handleUpdate(appt.id)}
                className="text-sm text-blue-700 hover:text-blue-900"
              >
                update
              </button>

              <button
                onClick={() => handleCancle(appt.id)}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Cancel
              </button>
              
            </div>
          </li>
        ))}
      </ul>
      </main>
      {/* Update Appointment Modal */}
  {isUpdateModalOpen && selectedAppointment && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-96 md:w-1/3">
      <h3 className="text-2xl mb-4 font-semibold text-gray-800">Update Appointment</h3>

      <div>
        <label className="block mb-2 font-medium text-gray-700">Doctor</label>
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
        <label className="block mb-2 font-medium text-gray-700">First Name</label>
        <input
          type="text"
          name="firstName"
          value={updatedData.firstName}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={updatedData.lastName}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          value={updatedData.date}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">Time</label>
        <input
          type="time"
          name="time"
          value={updatedData.time}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">Message</label>
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
};

export default DoctorDashboard;
