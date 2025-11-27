import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import HospitalContext from '../../context/HospitalContext';
import DoctorItem from '../../components/DoctorItem';
import { MdDashboard } from 'react-icons/md';
import { FaCalendarAlt, FaUser, FaUsers, FaMicrophone, FaUserCircle, FaCog } from 'react-icons/fa';

const Doctors = () => {
  const { doctors, deleteDoctor, updateDoctor, currentUser } = useContext(HospitalContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [isPatientDropdownOpen, setPatientDropdownOpen] = useState(false);
    const [isDoctorDropdownOpen, setDoctorDropdownOpen] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false); // To toggle sidebar visibility

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [updatedDoctor, setUpdatedDoctor] = useState({
        name: "",
        specialty: "",
        workingDays: "",
        workingHours: "",
        image: ""
    });


    const togglePatientDropdown = () => {
        setPatientDropdownOpen(!isPatientDropdownOpen);
    };

    const toggleDoctorDropdown = () => {
        setDoctorDropdownOpen(!isDoctorDropdownOpen);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen); // Toggle sidebar
    };

    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDoctorChange = (e) => {
        const { name, value } = e.target;
        setUpdatedDoctor(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveDoctor = () => {
        updateDoctor(editingDoctor.id, {
            ...updatedDoctor,
            workingDays: updatedDoctor.workingDays.split(",").map(day => day.trim())
        });
        setIsEditModalOpen(false);
    };

    return (
        <div className="flex bg-gray-50 mt-3">
            {/* Sidebar */}
            <div className={`bg-white shadow-lg rounded-lg w-full md:w-64 h-full p-4 space-y-6 ${isSidebarOpen ? "block" : "hidden"} md:block`}>
                <button 
                    className="md:hidden text-blue-600 p-2 mb-4" 
                    onClick={toggleSidebar} 
                    aria-label="Toggle Sidebar"
                >
                    &#9776; {/* Hamburger Icon */}
                </button>
                <Link to="/admin" className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg">
                    <MdDashboard className="w-6 h-6 text-blue-600" />
                    <h2 className="text-lg font-semibold">Admin</h2>
                </Link>
                <Link to="/dashboard" className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg">
                    <MdDashboard className="w-6 h-6 text-blue-600" />
                    <h2 className="text-lg font-semibold">Dashboard</h2>
                </Link>
                <Link to="/appointments" className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg">
                    <FaCalendarAlt className="w-6 h-6 text-blue-600" />
                    <h2 className="text-lg font-semibold">Appointment List</h2>
                </Link>

                <div className="relative">
                    <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg" onClick={togglePatientDropdown}>
                        <FaUser className="w-6 h-6 text-blue-600" />
                        <h2 className="text-lg font-semibold">Patient</h2>
                    </div>
                    {isPatientDropdownOpen && (
                        <ul className="absolute bg-white shadow-lg border rounded-md w-48 mt-2 z-10">
                            <Link to="/viewPatients" className="block">
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">View Patients</li>
                            </Link>
                            <Link to="/AddPatient" className="block">
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Add Patient</li>
                            </Link>
                            <Link to="/patient-records" className="block">
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Patient Records</li>
                            </Link>
                        </ul>
                    )}
                </div>

                <div className="relative">
                    <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg" onClick={toggleDoctorDropdown}>
                        <FaUsers className="w-6 h-6 text-blue-600" />
                        <h2 className="text-lg font-semibold">Doctor</h2>
                    </div>
                    {isDoctorDropdownOpen && (
                        <ul className="absolute bg-white shadow-lg border rounded-md w-48 mt-2 z-10">
                            <Link to="/add-doctor" className="block">
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Add Doctor</li>
                            </Link>
                            <Link to="/doctor-list" className="block">
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Doctor List</li>
                            </Link>
                        </ul>
                    )}
                </div>

                <div className="space-y-2 mt-6">
                    <Link to="/mic-page" className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg">
                        <FaMicrophone className="w-6 h-6 text-blue-600" />
                        <h2 className="text-lg font-semibold">Mic Page</h2>
                    </Link>
                    <Link to="/user" className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg">
                        <FaUserCircle className="w-6 h-6 text-blue-600" />
                        <h2 className="text-lg font-semibold">User</h2>
                    </Link>
                    <Link to="/settings" className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg">
                        <FaCog className="w-6 h-6 text-blue-600" />
                        <h2 className="text-lg font-semibold">Settings</h2>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 ">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Our Doctors</h1>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search doctors by name or specialty"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-2 border-gray-300 rounded-lg p-3 mb-6 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="space-y-6">
                    {filteredDoctors.length > 0 ? (
                        filteredDoctors.map(doctor => (
                            <div key={doctor.id} className="bg-white shadow-lg rounded-lg w-full p-2 flex flex-col md:flex-row justify-between items-start hover:shadow-xl transition-shadow duration-300">
                                <Link to={`/doctor-detail/${doctor.id}`} className="flex-2">
                                    <DoctorItem doctor={doctor} />
                                </Link>

                                <button
                                    onClick={() => {
                                        setEditingDoctor(doctor);
                                        setUpdatedDoctor({
                                            name: doctor.name,
                                            specialty: doctor.specialty,
                                            workingDays: doctor.workingDays?.join(", "),
                                            workingHours: doctor.workingHours,
                                            image: doctor.image
                                        });
                                        setIsEditModalOpen(true);
                                    }}
                                    className="text-blue-600 hover:underline font-semibold"
                                >
                                    Edit Doctor
                                </button>

                                <button 
                                    onClick={() => deleteDoctor(doctor.id)} 
                                    className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 font-semibold"
                                >
                                    Delete Doctor
                                </button>

                                {isEditModalOpen && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                    <div className="bg-white p-6 rounded-lg w-96">
                                        <h2 className="text-xl font-semibold mb-4">Edit Doctor</h2>

                                        <label className="block">Name:</label>
                                        <input
                                            name="name"
                                            value={updatedDoctor.name}
                                            onChange={handleDoctorChange}
                                            className="w-full border p-2 mb-3"
                                        />

                                        <label className="block">Specialty:</label>
                                        <input
                                            name="specialty"
                                            value={updatedDoctor.specialty}
                                            onChange={handleDoctorChange}
                                            className="w-full border p-2 mb-3"
                                        />

                                        <label className="block">Working Days (comma separated):</label>
                                        <input
                                            name="workingDays"
                                            value={updatedDoctor.workingDays}
                                            onChange={handleDoctorChange}
                                            className="w-full border p-2 mb-3"
                                        />

                                        <label className="block">Working Hours:</label>
                                        <input
                                            name="workingHours"
                                            value={updatedDoctor.workingHours}
                                            onChange={handleDoctorChange}
                                            className="w-full border p-2 mb-3"
                                        />

                                        <div className="flex justify-between mt-4">
                                            <button
                                                onClick={() => setIsEditModalOpen(false)}
                                                className="px-4 py-2 bg-gray-500 text-white rounded"
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                onClick={handleSaveDoctor}
                                                className="px-4 py-2 bg-blue-600 text-white rounded"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No doctors found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Doctors;
