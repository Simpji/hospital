import React, { useState, useContext } from 'react';
import HospitalContext from '../context/HospitalContext';

const AddDoctor = () => {
    const { error } = useContext(HospitalContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [workingDays, setWorkingDays] = useState([]);
    const [daysOff, setDaysOff] = useState([]);
    const [workingHours, setWorkingHours] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const handleWorkingDaysChange = (day) => {
        setWorkingDays(prevDays =>
            prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]
        );
    };

    const handleDaysOffChange = (day) => {
        setDaysOff(prevDays =>
            prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]
        );
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    // Removed the doctor adding logic to comply with your request
    const resetForm = () => {
        setName('');
        setEmail('');
        setSpecialty('');
        setWorkingDays([]);
        setDaysOff([]);
        setWorkingHours('');
        setYearsOfExperience('');
        setImage(null);
        setImagePreview('');
    };

    return (
        <form className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Doctor Form</h2>
            <input
                type="text"
                placeholder="Name"
                value={name} id="name"
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="email"
                placeholder="Email"
                value={email} id="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                placeholder="Specialty"
                value={specialty} id="specialty"
                onChange={(e) => setSpecialty(e.target.value)}
                required
                className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="w-full mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {imagePreview && (
                <div className="mb-4">
                    <img src={imagePreview} alt="Preview" className="w-full h-auto rounded-md" />
                </div>
            )}
            <input
                type="text"
                placeholder="Working Hours (e.g., 9:00 AM - 5:00 PM)"
                value={workingHours} id="workingHours"
                onChange={(e) => setWorkingHours(e.target.value)}
                required
                className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="number"
                placeholder="Years of Experience"
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(e.target.value)}
                required
                className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Working Days</h3>
                {daysOfWeek.map(day => (
                    <label key={day} className="inline-flex items-center mr-4">
                        <input
                            type="checkbox"
                            checked={workingDays.includes(day)}
                            onChange={() => handleWorkingDaysChange(day)}
                            className="form-checkbox"
                        />
                        <span className="ml-2">{day}</span>
                    </label>
                ))}
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Days Off</h3>
                {daysOfWeek.map(day => (
                    <label key={day} className="inline-flex items-center mr-4">
                        <input
                            type="checkbox"
                            checked={daysOff.includes(day)}
                            onChange={() => handleDaysOffChange(day)}
                            className="form-checkbox"
                        />
                        <span className="ml-2">{day}</span>
                    </label>
                ))}
            </div>
            {/* Removed the submit button for adding doctors */}
            {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
        </form>
    );
};

export default AddDoctor;
