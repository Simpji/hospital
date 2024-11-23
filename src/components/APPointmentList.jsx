import React, { useContext } from "react";
import HospitalContext from "../context/HospitalContext";

function APPointmentList() {
    const { appointments, cancelAppointment } = useContext(HospitalContext);

    return (
        <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Your Appointments</h2>
            {appointments.length === 0 ? (
                <p className="text-gray-500 text-center">No appointments scheduled.</p>
            ) : (
                <ul className="space-y-4">
                    {appointments.map((appointment) => (
                        <li key={appointment.id} className="flex justify-between items-center border-b py-2">
                            <div>
                                <span className="font-semibold">{appointment.date}</span> at <span className="font-semibold">{appointment.time}</span>
                            </div>
                            <button
                                onClick={() => cancelAppointment(appointment.id)}
                                className="ml-4 text-red-600 hover:text-red-800 transition duration-200"
                            >
                                Cancel
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default APPointmentList;
