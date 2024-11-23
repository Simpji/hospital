import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import HospitalContext from '../context/HospitalContext';
import DoctorItem from './DoctorItem';
import AddDoctor from './AddDoctor';

const Doctors = () => {
    const { doctors, deleteDoctor } = useContext(HospitalContext);
    const [searchTerm, setSearchTerm] = useState('');


    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-4xl mx-auto p-4 ">
            <h1 className="text-3xl font-bold mb-6">Our Doctors</h1>
            <input
                type="text"
                placeholder="Search doctors by name or specialty"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded p-2 mb-4 w-full md:w-1/2"
            />
            <AddDoctor />
            <div className="space-y-4">
                {filteredDoctors.length > 0 ? (
                    filteredDoctors.map(doctor => (
                        <div key={doctor.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row justify-between items-start">
                            <Link to={`/doctor-detail/${doctor.id}`} className="flex-1">
                                <DoctorItem doctor={doctor} />
                            </Link>
                            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-2">
                                <Link to={`/edit-doctor/${doctor.id}`} className="text-blue-500 hover:underline">
                                    Edit Doctor
                                </Link>
                                <button 
                                    onClick={() => deleteDoctor(doctor.id)} 
                                    className="bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600"
                                >
                                    Delete Doctor
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No doctors found.</p>
                )}
            </div>
        </div>
    );
};

export default Doctors;
