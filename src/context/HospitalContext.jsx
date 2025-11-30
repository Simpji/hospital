import { createContext, useEffect, useState } from "react";

const HospitalContext = createContext();

export const HospitalProvider = ({ children }) => {
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [newAppointment, setNewAppointment] = useState([])
    const [marquee, setShowMarquee] = useState([])
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [messages, setMessages] = useState(() => {
        const stored = localStorage.getItem('messages')
        return stored ? JSON.parse(stored) : [];
    })

    // const [messages, setMessages] = useState([]);

    const [error, setError] = useState(null);
    const [doctorId, setDoctorId] = useState(() => localStorage.getItem("doctorId") || '')


    useEffect(() => {
        fetchPatients();
        fetchDoctors();
        fetchAppointments();
        console.log("🟡 Messages loaded from localStorage:", messages);
        localStorage.removeItem("doctorId")
        //  const storedDoctorId = localStorage.getItem("doctorId");
        // if(storedDoctorId) {
        //     setDoctorId(storedDoctorId);
        // }
        // const longgeInDoctorId = '8'
        // setDoctorId(longgeInDoctorId)
    }, []);

    

    const addMessage = (appointmentId, message, sender) => {
        const appointment = appointments.find(appt => appt.id === appointmentId)
        if(!appointment)return
        const newMessage = {
            id: Date.now().toString(),
            appointmentId,
            doctorId: appointment.doctorId,
            patientId: appointment.patientId,
            message,
            sender,
            timestamp: new Date().toISOString().split("T")[0]
        }

        const updatedMessages = [...messages, newMessage]
        setMessages(updatedMessages)
        try {
            localStorage.setItem("messages", JSON.stringify(updatedMessages))
        } catch (error) {
            console.log("failled to save message:", error);
            
        }
    }
    
    // const addMessage = (appointmentId, message, sender) =>{
    //     const appointment = appointments.find(appt => appt.id === appointmentId)
    //     if(!appointment) return
        
    //     const newMessage = {
    //         id: Date.now().toString(),
    //         appointmentId,
    //         doctorId: appointment.doctorId,
    //         patientId: appointment.patientId,
    //         message,
    //         sender,
    //         timestamp: new Date().toISOString(),
    //     }
    //     const updatedMessages = [...messages, newMessage];
    //     setMessages(updatedMessages)
    //     try {
    //         localStorage.setItem(messages, JSON.stringify(updatedMessages))
    //     } catch (error) {
    //         console.log('filed to save message');
            
    //     }
    // }
    
     const deleteMessage = (id) => {
        const updatedMessages = messages.filter((msg) => msg.id !== id);
        setMessages(updatedMessages);
        localStorage.setItem('messages', JSON.stringify(updatedMessages));
        };

        
    const generateInvoiceForAppointment = (appointmentId) => {
        const appointment = appointments.find(a => a.id === appointmentId)

        if(!appointment){
            setError("appointment not found")
            return
        }

        // Check if appointment is confirmed
        if (appointment.status !== "confirmed") {
        alert("❌ Invoice can only be generate for confirmed appointment")
      }

        // Check if communication exists
      const hasCommunication = messages.some((msg) => 
        msg.appointmentId === appointmentId && msg.doctorId === appointment.doctorId && msg.patientId === appointment.patientId) 
      if (!hasCommunication) {
        alert("❌ No communication between doctor and patient yet, connot geterate invoice.")

        return
      }

      const newInvoice = {
        id: Date.now().toString(),
        appointmentId: appointment.id,
        doctorId: appointment.doctorId,
        patientId: appointment.patientId,
        amount: 200,
        status: "Unpaid",
        dateIssues: new Date().toISOString()
      };

      setInvoices((prev) => [...prev, newInvoice])
      localStorage.setItem("invoices", JSON.stringify([...invoices, newInvoice]))
      alert("✅ Invoice generated successfully")

    }

    const API_URL = "https://692b17027615a15ff24eb388.mockapi.io";

    const PATIENTS_API = `${API_URL}/patients`;
    const DOCTORS_API = `${API_URL}/doctors`;
    const APPOINTMENTS_API = `${API_URL}/appointments`;

        

    const fetchPatients = async () => {
        try {
            const res = await fetch("http://localhost:3000/Patients");
            if (!res.ok) throw new Error('Failed to fetch patients');
            const data = await res.json();
            setPatients(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchDoctors = async () => {
        try {
            const res = await fetch("http://localhost:3000/Doctors");
            //  const res = await fetch("https://your-remote-api.com/Patients")
            if (!res.ok) throw new Error('Failed to fetch doctors');
            const data = await res.json();
            setDoctors(data);
        } catch (err) {
            setError(err.message);
        }
    };

    // const fetchAppointments = async () => {
    //     try {
    //         const res = await fetch(APPOINTMENTS_API);
    //         if (!res.ok) throw new Error("Failed to fetch appointments");
    //         const data = await res.json();
    //         setAppointments(data);
    //     } catch (err) {
    //         setError(err.message);
    //     }
    //     };


    const fetchAppointments = async () => {
        try {
            const res = await fetch("https://692b17027615a15ff24eb388.mockapi.io/appointments");
            // const res = await fetch ("http://local:300/appointments")
            // const res = await fetch(APPOINTMENTS_API);
            if (!res.ok) throw new Error('Failed to fetch appointments');
            const data = await res.json();
            setAppointments(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const processPayment = async ({ amount, patientId }) => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount, patientId }),
            });
            if (!response.ok) throw new Error("Failed to process payment");
            const payment = await response.json();
            setPaymentHistory((prevPayments) => [...prevPayments, payment]);
            return payment;
        } catch (error) {
            setError(error.message);
        }
    };


    const scheduleAppointment = async (appointment) => {
        if (!appointment.firstName || !appointment.lastName || !appointment.email || !appointment.date || !appointment.time) {
            setError('All fields are required');
            return;
        }
        try {
            const res = await fetch("http://localhost:3000/Appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(appointment),
            });
            if (!res.ok) throw new Error('Failed to schedule appointment');
            const newAppointment = await res.json();
            setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const cancelAppointment = async (id) => {
        if (window.confirm("Are you sure you want to cancel this appointment?")) {
            try {
                const res = await fetch(`http://localhost:3000/Appointments/${id}`, {
                    method: "DELETE",
                });
                if (!res.ok) throw new Error('Failed to cancel appointment');
                setAppointments((prevAppointments) => prevAppointments.filter(appointment => appointment.id !== id));
                setError(null);
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const updateAppointment = async (id, updatedAppointment) => {
        try {
            const res = await fetch(`http://localhost:3000/Appointments/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedAppointment),
            });
            if (!res.ok) throw new Error('Failed to update appointment');
            setAppointments((prevAppointments) =>
                prevAppointments.map((appointment) =>
                    appointment.id === id ? { ...appointment, ...updatedAppointment } : appointment
                )
            );
            // Immediately set the updated appointment for the marquee
            setNewAppointment(updatedAppointment); // Set the updated appointment to display in the marquee
            setShowMarquee(true); // Show the marquee immediately after the update
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };
    

        const addPatient = async (patient) => {
        if (!patient.fullName || !patient.dob || !patient.email || !patient.phone || !patient.gender || !patient.address) {
            setError('All fields are required');
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/Patients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(patient),
            });

            if (!res.ok) throw new Error('Failed to add patient');

            const newPatient = await res.json();

            setPatients((prevPatients) => [...prevPatients, newPatient]);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
        };


    const deletePatient = async (id) => {
        if (window.confirm("Are you sure you want to delete this patient?")) {
            try {
                const res = await fetch(`http://localhost:3000/Patients/${id}`, {
                    method: "DELETE",
                });
                if (!res.ok) throw new Error('Failed to delete patient');
                setPatients((prevPatients) => prevPatients.filter(patient => patient.id !== id));
                setError(null);
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const updatePatient = async (id, updatedPatient) => {
        try {
            const res = await fetch(`http://localhost:3000/Patients/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedPatient),
            });
            if (!res.ok) throw new Error('Failed to update patient');
            setPatients((prevPatients) =>
                prevPatients.map((patient) => (patient.id === id ? { ...patient, ...updatedPatient } : patient))
            );
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };


    const addDoctor = async (doctor) => {
        if (!doctor.name || !doctor.email || !doctor.specialty || !doctor.workingHours) {
            setError('All fields are required');
            return;
        }
        try {
            const res = await fetch("http://localhost:3000/Doctors", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(doctor),
            });
            if (!res.ok) throw new Error('Failed to add doctor');
            const newDoctor = await res.json();
            setDoctors((prevDoctors) => [...prevDoctors, newDoctor]);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    
    const updateDoctor = async (id, updatedDoctor) => {
        try {
            const res = await fetch(`http://localhost:3000/Doctors/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedDoctor),
            });
            if (!res.ok) throw new Error('Failed to update doctor');
            setDoctors((prevDoctors) =>
                prevDoctors.map((doctor) => (doctor.id === id ? { ...doctor, ...updatedDoctor } : doctor))
            );
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const deleteDoctor = async (id) => {
        if (window.confirm("Are you sure you want to delete this doctor?")) {
            try {
                const res = await fetch(`http://localhost:3000/Doctors/${id}`, {
                    method: "DELETE",
                });
                if (!res.ok) throw new Error('Failed to delete doctor');
                setDoctors((prevDoctors) => prevDoctors.filter(doctor => doctor.id !== id));
                setError(null);
            } catch (err) {
                setError(err.message);
            }
        }
    };

    // New generateInvoice function added here
    const generateInvoice = async ({ amount, patientId }) => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount, patientId }),
            });
            if (!response.ok) throw new Error("Failed to generate invoice");
            const invoice = await response.json();
            setInvoices((prevInvoices) => [...prevInvoices, invoice]);
            return invoice;
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <HospitalContext.Provider value={{
        patients,
        doctors,
        appointments,
        paymentHistory,
        invoices,
        messages,
        newAppointment,
        error,
        doctorId,
        setDoctorId,
        addPatient,
        deletePatient,
        updatePatient,
        addDoctor,
        deleteDoctor,
        updateDoctor,
        scheduleAppointment,
        cancelAppointment,
        updateAppointment,
        fetchAppointments,
        processPayment,
        generateInvoice,
        // getMessageByAppointment,
        generateInvoiceForAppointment,
        addMessage,
        deleteMessage,
        }}>
            {children}
        </HospitalContext.Provider>
    );
};

export default HospitalContext;


// value={{
//             patients,
//             doctors,
//             appointments,
//             paymentHistory,
//             invoices,
//             processPayment,
//             generateInvoice,
//             addPatient,
//             deletePatient,
//             addDoctor,
//             addMessage,
//             updatePatient,
//             updateDoctor,
//             deleteDoctor,
//             scheduleAppointment,
//             cancelAppointment,
//             updateAppointment,
//             fetchAppointments,
//             error
//         }}
