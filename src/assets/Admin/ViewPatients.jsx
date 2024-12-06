import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import HospitalContext from "../../context/HospitalContext"; // Import the context
import { FaRegUser, FaCalendarAlt, FaHistory, FaUserAlt } from 'react-icons/fa'; // Icons for the UI
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS styles

function ViewPatients() {
  const { patients } = useContext(HospitalContext); // This will give us the list of patients

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease-in-out", // Easing function
      once: true, // Animation will happen only once
    });
  }, []);

  return (
    <div className="flex-1 p-4 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">Patient List</h2>

      {/* Patient Grid - 3 columns for large screens, 2 columns for medium, 1 for small */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {patients && patients.length > 0 ? (
          patients.map((patient) => (
            <div
              key={patient.id}
              className="bg-blue-950 shadow-sm rounded-lg p-4 hover:shadow-md transition-all duration-300"
              data-aos="fade-up" // AOS animation for fade-up
            >
              {/* Patient Image */}
              <div className="flex justify-center mb-3">
                <img
                  src={patient.img}
                  alt={patient.name}
                  className="w-24 h-24 object-cover rounded-full border-2 border-yellow-500"
                />
              </div>

              {/* Patient Info */}
              <div className="text-center mb-3">
                <h3 className="text-xl font-semibold text-white">{patient.name}</h3>
                <p className="text-white text-sm">{patient.email}</p>
                <div className="text-white text-sm">
                  <FaCalendarAlt className="inline mr-1" />
                  DOB: {patient.dob}
                </div>
              </div>

              {/* Active/Inactive Status */}
              <div className="flex justify-center items-center mb-3">
                <span
                  className={`text-white py-1 px-2 rounded-full text-xs ${patient.isActive ? "bg-green-500" : "bg-gray-400"}`}
                >
                  {patient.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Medical History */}
              {patient.history && patient.history.length > 0 && (
                <div className="mt-4 border-t pt-3">
                  <h4 className="font-semibold text-sm text-white flex items-center mb-2">
                    <FaHistory className="mr-1 text-blue-600" />
                    Medical History
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-white text-sm">
                    {patient.history.map((historyItem, index) => (
                      <li key={index}>
                        <strong>{historyItem.date}</strong>: {historyItem.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* View Details Button */}
              <div className="mt-4 text-center">
                <Link
                  to={`/patients/${patient.id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  <FaUserAlt className="inline mr-1" />
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">No patients found</p>
        )}
      </div>
    </div>
  );
}

export default ViewPatients;
