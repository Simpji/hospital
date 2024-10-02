import React from 'react'

function HospitalManagementOverview() {
  return (
   
      <div className="overview-container">
            <h1 className="overview-title">Hospital Management System Overview</h1>
            <p className="overview-description">
                The Hospital Management System (HMS) is designed to streamline and enhance the day-to-day operations of healthcare facilities. 
                This comprehensive platform offers efficient solutions for managing patient information, scheduling appointments, processing billing, and overseeing inventory. 
                By integrating advanced technology and user-friendly interfaces, HMS ensures high-quality patient care and operational efficiency.
            </p>
            <h2 className="overview-subtitle">Key Components</h2>
            <ul className="overview-list">
                <li><strong>Patient Management:</strong> Efficient registration and management of patient records.</li>
                <li><strong>Appointment Management:</strong> Easy scheduling, viewing, and modifying appointments.</li>
                <li><strong>Billing and Insurance:</strong> Automated invoicing and secure payment processing.</li>
                <li><strong>Patient Portal:</strong> Secure access for patients to their medical records and communication with providers.</li>
                <li><strong>Inventory Management:</strong> Real-time tracking of medical supplies to ensure availability.</li>
                <li><strong>Reporting and Analytics:</strong> Comprehensive insights into performance and operational efficiency.</li>
            </ul>
        </div>
  )
}

export default HospitalManagementOverview