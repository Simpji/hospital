import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from 'react-icons/md';
import { FaCalendarAlt, FaUser, FaUsers, FaMicrophone, FaUserCircle, FaCog } from 'react-icons/fa';
import HospitalContext from "../../context/HospitalContext";

export default function AddDoctors() {
    const { AddDoctorToContext } = useState(HospitalContext);
    const [fullName, setFullName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [doctorImage, setDoctorImage] = useState(null);
    const [workingDays, setWorkingDays] = useState([]);  // State for working days
    const [time, setTime] = useState('');  // New state for time
    const [isDoctorDropdownOpen, setIsDoctorDropdownOpen] = useState(false);
    const [isPatientDropdownOpen, setIsPatientDropdownOpen] = useState(false);
    const [isAppointmentDropDown, setIsAppointmentDropDown] = useState(false);

    const toggleDoctorDropdown = () => setIsDoctorDropdownOpen(!isDoctorDropdownOpen);
    const togglePatientDropdown = () => setIsPatientDropdownOpen(!isPatientDropdownOpen);
    const toggleAppointmentDropDown = () => setIsAppointmentDropDown(!isAppointmentDropDown);

    const handleSubmit = (e) => {
        e.preventDefault();
        const doctorData = {
            fullName,
            dob,
            gender,
            phone,
            email,
            address,
            specialty,
            workingDays,  // Include workingDays in the data
            doctorImage,
            time  // Include time in the data
        };
        if (AddDoctorToContext) {
            AddDoctorToContext(doctorData);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setDoctorImage(URL.createObjectURL(file));  // Preview the image
        }
    };

    const handleWorkingDayChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setWorkingDays((prev) => [...prev, value]);
        } else {
            setWorkingDays((prev) => prev.filter((day) => day !== value));
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-gradient-to-r from-blue-500 to-blue-800 p-6 text-white shadow-lg">
                <h1 className="text-left text-4xl font-extrabold">Admin Dashboard</h1>
                <p className="text-lg mt-2">Welcome to the control panel</p>
            </div>
            <div className="flex flex-col md:flex-row p-6">
                <div className="bg-white shadow-lg rounded-lg w-full md:w-64 p-6 space-y-6">
                    <Link to="/admin" className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg">
                        <MdDashboard className="w-5 h-5 text-blue-500" />
                        <h2 className="text-lg">Admin</h2>
                    </Link>
                    <Link to="/admin" className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg">
                        <MdDashboard className="w-5 h-5 text-blue-500" />
                        <h2 className="text-lg">Dashboard</h2>
                    </Link>
                    <div className="relative">
                        <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg" onClick={toggleAppointmentDropDown}>
                            <MdDashboard className="w-5 h-5 text-blue-500" />
                            <h2 className="text-lg">Appointment</h2>
                        </div>
                        {isAppointmentDropDown && (
                            <ul className="absolute bg-white shadow-lg border w-48 mt-2 z-10">
                                <Link to="/appointment" className="block">
                                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Book Appointment</li>
                                </Link>
                                <Link to="/appointment" className="block">
                                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Appointment List</li>
                                </Link>
                            </ul>
                        )}
                    </div>
                    <div className="relative">
                        <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg" onClick={togglePatientDropdown}>
                            <MdDashboard className="w-5 h-5 text-blue-500" />
                            <h2 className="text-lg">Patient</h2>
                        </div>
                        {isPatientDropdownOpen && (
                            <ul className="absolute bg-white shadow-lg border w-48 mt-2 z-10">
                                <Link to="/viewPatients" className="block">
                                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">View Patient</li>
                                </Link>
                                <Link to="/AddPatient" className="block">
                                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Add Patient</li>
                                </Link>
                                <Link to="/patients" className="block">
                                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Patient History</li>
                                </Link>
                            </ul>
                        )}
                    </div>
                    <div className="relative">
                        <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg" onClick={toggleDoctorDropdown}>
                            <MdDashboard className="w-5 h-5 text-blue-500" />
                            <h2 className="text-lg">Doctor</h2>
                        </div>
                        {isDoctorDropdownOpen && (
                            <ul className="absolute bg-white shadow-lg border w-48 mt-2 z-10">
                                <Link to="/AddDoctors" className="block">
                                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Add Doctor</li>
                                </Link>
                                <Link to="/doctors" className="block">
                                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Our Doctor's</li>
                                </Link>
                                <Link to="/pat" className="block">
                                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Patient History</li>
                                </Link>
                            </ul>
                        )}
                    </div>
                    <div className="space-y-2 mt-6">
                        <Link to="/mic-page" className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg">
                            <FaMicrophone className="w-5 h-5 text-blue-600" />
                            <h2 className="text-lg">Mic Page</h2>
                        </Link>
                        <Link to="/user" className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg">
                            <FaUserCircle className="w-5 h-5 text-blue-600" />
                            <h2 className="text-lg">User</h2>
                        </Link>
                        <Link to="/settings" className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-3 rounded-lg">
                            <FaCog className="w-5 h-5 text-blue-600" />
                            <h2 className="text-lg">Settings</h2>
                        </Link>
                    </div>
                </div>
                {/* Main Content Section */}
                <div className="flex-1 p-6">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Doctor</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Form Fields */}
                            <div className="flex flex-col">
                                <label htmlFor="fullName" className="mb-2 text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="dob" className="mb-2 text-sm font-medium text-gray-700">Date of Birth</label>
                                <input
                                    type="date"
                                    id="dob"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    required
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="gender" className="mb-2 text-sm font-medium text-gray-700">Gender</label>
                                <select
                                    id="gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="phone" className="mb-2 text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="text"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="address" className="mb-2 text-sm font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="specialty" className="mb-2 text-sm font-medium text-gray-700">Specialty</label>
                                <textarea
                                    id="specialty"
                                    value={specialty}
                                    onChange={(e) => setSpecialty(e.target.value)}
                                    required
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Working Days Section */}
                            <div className="flex flex-col">
                                <label className="mb-2 text-sm font-medium text-gray-700">Working Days</label>
                                <div className="space-y-2">
                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                                        <label key={day}>
                                            <input
                                                type="checkbox"
                                                value={day}
                                                checked={workingDays.includes(day)}
                                                onChange={handleWorkingDayChange}
                                                className="mr-2"
                                            />
                                            {day}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Time Section */}
                            <div className="flex flex-col">
                                <label htmlFor="time" className="mb-2 text-sm font-medium text-gray-700">Time</label>
                                <input
                                    type="time"
                                    id="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    required
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Image Upload Section */}
                            <div className="flex flex-col">
                                <label htmlFor="doctorImage" className="mb-2 text-sm font-medium text-gray-700">Doctor's Image</label>
                                <input
                                    type="file"
                                    id="doctorImage"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {doctorImage && <img src={doctorImage} alt="Doctor" className="mt-2 h-32 object-cover" />}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="mt-3 mb-5 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            Add Doctor
                        </button>
                    </form>

                    {/* Go Back Button */}
                    <Link 
                        to="/Admin" 
                        className=" px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                        Go Back admin
                    </Link>
                </div>
            </div>
        </div>
    );
}
