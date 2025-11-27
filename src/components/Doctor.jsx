import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import HospitalContext from '../context/HospitalContext';
import DoctorItem from './DoctorItem';

const Doctor = () => {
    const { doctors, deleteDoctor, currentUser } = useContext(HospitalContext);  // Assuming currentUser is part of your context
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Our Doctors</h1>
            
            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search doctors by name or specialty"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded p-2 mb-4 w-full md:w-1/2"
            />

            {/* Only show "Add Doctor" link if user is an admin */}
            {currentUser && currentUser.role === 'admin' && (
                <Link to="/admin/add-doctor" className="text-lg text-blue-600 hover:text-blue-800 mb-4 inline-block">
                    Add New Doctor
                </Link>
            )}

            {/* List of filtered doctors */}
            <div className="space-y-4">
                {filteredDoctors.length > 0 ? (
                    filteredDoctors.map(doctor => (
                        <div key={doctor.id} className="bg-white shadow-md rounded-lg p-2 flex flex-col md:flex-row justify-between items-start">
                            <Link to={`/doctor-detail/${doctor.id}`} className="flex-1">
                                <DoctorItem doctor={doctor} />
                            </Link>
                            {/* <img 
                            src={doctor.image} 
                            alt={doctor.name}
                            className="w-full h-40 sm:h-48 object-cover rounded-md"
                        /> */}
                            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-2">
                                {/* Only show "Edit Doctor" and "Delete Doctor" to admin */}
                                {currentUser && currentUser.role === 'admin' && (
                                    <>
                                        <Link to={`/edit-doctor/${doctor.id}`} className="text-blue-500 hover:underline">
                                            Edit Doctor
                                        </Link>
                                        <button 
                                            onClick={() => deleteDoctor(doctor.id)} 
                                            className="bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600"
                                        >
                                            Delete Doctor
                                        </button>
                                    </>
                                )}
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

export default Doctor;
