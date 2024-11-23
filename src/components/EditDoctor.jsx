import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HospitalContext from '../context/HospitalContext';

const EditDoctor = () => {
    const { id } = useParams();
    const { doctors, updateDoctor } = useContext(HospitalContext);
    const navigate = useNavigate();
    
    
    const doctor = doctors.find(doc => doc.id === (id));

   
    const [name, setName] = useState(doctor?.name || '');
    const [email, setEmail] = useState(doctor?.email || '');
    const [specialty, setSpecialty] = useState(doctor?.specialty || '');
    const [workingHours, setWorkingHours] = useState(doctor?.workingHours || '');
    const [yearsOfExperience, setYearsOfExperience] = useState(doctor?.yearsOfExperience || '');

    useEffect(() => {
        if (doctor) {
            setName(doctor.name || '');
            setEmail(doctor.email || '');
            setSpecialty(doctor.specialty || '');
            setWorkingHours(doctor.workingHours || '');
            setYearsOfExperience(doctor.yearsOfExperience || '');
        }
    }, [doctor]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedDoctor = { name, email, specialty, workingHours, yearsOfExperience };
        updateDoctor(doctor.id, updatedDoctor);
        navigate('/doctors');
    };

    if (!doctor) {
        return <div>No doctor found with this ID.</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
            <h2 className="text-2xl font-bold mb-4">Edit Doctor</h2>
            <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                className="border rounded p-2 w-full" 
                placeholder="Name" 
            />
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="border rounded p-2 w-full" 
                placeholder="Email" 
            />
            <input 
                type="text" 
                value={specialty} 
                onChange={(e) => setSpecialty(e.target.value)} 
                required 
                className="border rounded p-2 w-full" 
                placeholder="Specialty" 
            />
            <input 
                type="text" 
                value={workingHours} 
                onChange={(e) => setWorkingHours(e.target.value)} 
                required 
                className="border rounded p-2 w-full" 
                placeholder="Working Hours" 
            />
            <input 
                type="number" 
                value={yearsOfExperience} 
                onChange={(e) => setYearsOfExperience(e.target.value)} 
                required 
                className="border rounded p-2 w-full" 
                placeholder="Years of Experience" 
            />
            <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 w-full">
                Update Doctor
            </button>
        </form>
    );
};

export default EditDoctor;
