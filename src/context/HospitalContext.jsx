import { createContext, useEffect, useState } from "react";

const HospitalContext = createContext();

export const HospitalProvider = ({ children }) => {
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetchPatients();
        fetchDoctors()
    }, []);

    const fetchPatients = async () => {
        const res = await fetch("http://localhost:3000/Patients");
        const data = await res.json();
        setPatients(data);
    };

    const fetchDoctors = async () => {
        const res = await fetch("http://localhost:3000/Doctors")
        const data = await res.json()
        setDoctors(data)
    }

    return (
        <HospitalContext.Provider value={{ patients, doctors}}>
            {children}
        </HospitalContext.Provider>
    );
};
export default HospitalContext;