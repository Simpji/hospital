import React, { useContext } from "react";
import HospitalContext from "../context/HospitalContext";
import { Link } from "react-router-dom";

function ViewAppointmentSchedule() {
    const { appointments } = useContext(HospitalContext);

    return (
        <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Your Appointments</h2>
            {appointments.length === 0 ? (
                <p className="text-gray-500 text-center">No appointments scheduled.</p>
            ) : (
                <ul className="space-y-4">
                    {appointments.map((appointment) => (
                        <li key={appointment.id} className="border-b py-2">
                            <div className="font-semibold">
                                {appointment.firstName} {appointment.lastName}
                            </div>
                            <div>
                                {appointment.date} at {appointment.time}
                            </div>
                        </li>
                    ))}
                </ul>
            )}

             <div className="text-center mt-5">
           <Link to="/appointmentlist" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            APPointmentList
        </Link>
      </div>
    </div>
    );
}

export default ViewAppointmentSchedule;
