import { createContext, useEffect, useState } from "react";

const HospitalContext = createContext();

export const HospitalProvider = ({ children }) => {
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([])
     const [paymentHistory, setPaymentHistory] = useState([])
     const [invoices, setInvoices] = useState([]);
    // const [paymentHistory, setPaymentHistory] = useState([])
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPatients();
        fetchDoctors();
        fetchAppointments();
        // fetchPaymentHistory();
    }, []);

    const fetchPatients = async () => {
        try {
            // const res = await fetch("http://localhost:3000/Patients");
            const res = await fetch("https://simplehospital.netlify.app/api/patients");
            if (!res.ok) throw new Error('Failed to fetch patients');
            const data = await res.json();
            setPatients(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchDoctors = async () => {
        try {
            // const res = await fetch("http://localhost:3000/Doctors");
            const res = await fetch("https://simplehospital.netlify.app/api/doctors");
            if (!res.ok) throw new Error('Failed to fetch doctors');
            const data = await res.json();
            setDoctors(data);
        } catch (err) {
            setError(err.message);
        }
    };

     

//     const fetchPaymentHistory = async () => {
//     try {
//         const res = await fetch("http://localhost:3000/PaymentHistory");
//         if (!res.ok) throw new Error('Failed to fetch payment history');
//         const data = await res.json();
//         setPaymentHistory(data);
//     } catch (err) {
//         setError(err.message);
//     }
// };

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
            return await response.json();
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const processPayment = async ({ invoiceId, paymentMethod }) => {
        try {
            const newPayment = { id: Date.now(), invoiceId, paymentMethod, date: new Date().toLocaleString() };
            setPaymentHistory((prevHistory) => [...prevHistory, newPayment]);
            return newPayment; 
        } catch (error) {
            throw new Error("Failed to process payment");
        }
    };

     const fetchAppointments = async () => {
        try {
            const res = await fetch("https://simplehospital.netlify.app/api/appointments");
            if (!res.ok) throw new Error('Failed to fetch appointments');
            const data = await res.json();
            setAppointments(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const scheduleAppointment = async (appointment) => {
        if (!appointment.firstName || !appointment.lastName || !appointment.email || !appointment.date || !appointment.time) {
            setError('All fields are required');
            return;
        }
        try {
            const res = await fetch("https://simplehospital.netlify.app/api/appointments", {
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
                const res = await fetch(`https://simplehospital.netlify.app/api/appointments/${id}`, {
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

    const addPatient = async (patient) => {
        if (!patient.name || !patient.dob || !patient.email) {
            setError('All fields are required');
            return;
        }
        try {
            const res = await fetch("https://simplehospital.netlify.app/api/patients/", {
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
                const res = await fetch(`https://simplehospital.netlify.app/api/patients/${id}`, {
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

    const addDoctor = async (doctor) => {
    if (!doctor.name || !doctor.email || !doctor.specialty || !doctor.workingHours) {
        setError('All fields are required');
        return;
    }
    try {
        const res = await fetch("https://simplehospital.netlify.app/api/doctors/", {
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

    const updatePatient = async (id, updatedPatient) => {
        try {
            const res = await fetch(`https://simplehospital.netlify.app/api/patients/${id}`, {
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

    const updateDoctor = async (id, updatedDoctor) => {
        try {
            const res = await fetch(`https://simplehospital.netlify.app/api/doctors/${id}`, {
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
            const res = await fetch(`https://simplehospital.netlify.app/api/doctors/${id}`, {
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

    return (
        <HospitalContext.Provider value={{
            patients,
            doctors,
            appointments,
            paymentHistory,
              invoices,
            generateInvoice,
            processPayment,
            addPatient,
            deletePatient,
            addDoctor,
            updatePatient,
            updateDoctor,deleteDoctor,
            scheduleAppointment,
            cancelAppointment,
            error 
        }}>
            {children}
        </HospitalContext.Provider>
    );
};

export default HospitalContext;