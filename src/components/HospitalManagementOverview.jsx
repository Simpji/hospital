import { Link } from "react-router-dom";

function HospitalManagementOverview() {
  return (
    <div className="overview-container max-w-4xl mx-auto px-4 py-8">
      <h1 className="overview-title text-3xl font-bold text-center text-gray-800 mb-6 md:text-4xl">
        Hospital Management System Overview
      </h1>
      <p className="overview-description text-base text-gray-700 leading-relaxed mb-6 md:text-lg">
        The Hospital Management System (HMS) is designed to streamline and enhance the day-to-day operations of healthcare facilities.
        This comprehensive platform offers efficient solutions for managing patient information, scheduling appointments, processing billing, 
        and overseeing inventory. By integrating advanced technology and user-friendly interfaces, HMS ensures high-quality patient care and operational efficiency.
      </p>
      <h2 className="overview-subtitle text-2xl font-semibold text-gray-800 mb-4 md:text-3xl">
        Key Components
      </h2>
      <ul className="overview-list list-disc pl-6 space-y-3">
        <li><strong className="text-gray-800">Patient Management:</strong> Efficient registration and management of patient records.</li>
        <li><strong className="text-gray-800">Appointment Management:</strong> Easy scheduling, viewing, and modifying appointments.</li>
        <li><strong className="text-gray-800">Billing and Insurance:</strong> Automated invoicing and secure payment processing.</li>
        <li><strong className="text-gray-800">Patient Portal:</strong> Secure access for patients to their medical records and communication with providers.</li>
        <li><strong className="text-gray-800">Inventory Management:</strong> Real-time tracking of medical supplies to ensure availability.</li>
        <li><strong className="text-gray-800">Reporting and Analytics:</strong> Comprehensive insights into performance and operational efficiency.</li>
      </ul>
      <div className="text-center mt-5">
        <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Back to Home 
        </Link>
      </div>
    </div>
  );
}

export default HospitalManagementOverview;
