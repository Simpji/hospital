import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaRegAddressCard } from "react-icons/fa6";
import { FaPhoneVolume } from "react-icons/fa6";
import { SlClock } from "react-icons/sl";
import { CiSaveDown1 } from "react-icons/ci";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { GrStatusGood } from "react-icons/gr";
import { Swiper, SwiperSlide } from 'swiper/react';
import HospitalContext from '../../context/HospitalContext';
import { useParams } from 'react-router-dom'
import HospitalManagementOverview from '../HospitalManagementOverview';
import AppointmentForm from '../AppointmentForm';

function Home() {
 const { patients } = useContext(HospitalContext); 
  const [searchTerm, setSearchTerm] = useState('');
  

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
     <div className="father">
      <div className="flex flex-col md:flex-row justify-around bg-blue-950 text-white p-5 mt-5 items-center">
      <div className="flex flex-col items-center m-3">
        <FaRegAddressCard className="text-3xl mb-3" />
        <h1 className="text-xl mb-2">Our Location</h1>
        <p className="text-center">Doctoral Medical Center, 123 20A Medical Road, Ikeja, Lagos!...</p>
      </div>
      <div className="flex flex-col items-center m-3">
        <FaPhoneVolume className="text-3xl mb-3" />
        <h1 className="text-xl mb-2">Phone, Fax & Email</h1>
        <p className="mb-1">Mobile: +2348168606080</p>
        <p className="mb-1">Fax: +2005444, +0035580</p>
        <p className="mb-1">Email: simplewilliams965@gmail.com</p>
      </div>
      <div className="flex flex-col items-center m-3">
        <SlClock className="text-3xl mb-3" />
        <h1 className="text-xl mb-2">Opening Hours</h1>
        <p className="mb-1">Monday - Friday: 8.00 - 18.00</p>
        <p className="mb-1">Saturday: 10.00 - 18.00</p>
        <p className="mb-1">Sunday: 10.00 - 18.00</p>
      </div>
     </div>
     <div className="text-center mt-5">
        <Link to="/BookAppointment" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Book Appointment
        </Link>
      </div>
     
     
      <div className="text-center mt-10 px-4 services">
         <h1 className="text-3xl font-bold mb-4">Our Services</h1>
            <p className="w-full md:w-2/3 lg:w-1/2 mx-auto mb-8">At Simple Hospital, we are committed to delivering comprehensive healthcare solutions through our Hospital Management System. Our range of services is designed to ensure efficient patient care and management, leveraging technology for better healthcare delivery.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Link to="/services" className="bg-white text-black rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow flex flex-col items-center">
            <img src="/img/services3.jpg" alt="General Consultation" className="h-[50%] w-full object-cover rounded mb-2" />
            <h2 className="font-semibold text-xl mb-2">General Consultation</h2>
            <p className="text-sm text-center">Comprehensive health evaluations and treatment plans for various conditions.</p>
          </Link>
          <Link to="/services" className="bg-white text-black rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow flex flex-col items-center">
            <img src="/img/services5.jpg" alt="Emergency Services" className="h-[50%] w-full object-cover rounded mb-2" />
            <h2 className="font-semibold text-xl mb-2">Emergency Services</h2>
            <p className="text-sm text-center">Immediate care for acute illnesses and injuries, available 24/7.</p>
          </Link>
          <Link to="/services" className="bg-white text-black rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow flex flex-col items-center">
            <img src="/img/kp.jpg" alt="Pediatrics" className="h-[50%] w-full object-cover rounded mb-2" />
            <h2 className="font-semibold text-xl mb-2">Pediatrics</h2>
            <p className="text-sm text-center">Specialized care for infants, children, and adolescents.</p>
          </Link>


          <Link to="/services" className="bg-white text-black rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow flex flex-col items-center">
            <img src="/img/our1.jpeg" alt="Cardiology" className="h-[50%] w-full object-cover rounded mb-2" />
            <h2 className="font-semibold text-xl mb-2">Cardiology</h2>
            <p className="text-sm text-center">Diagnosis and treatment of heart-related conditions.</p>
          </Link>
          <Link to="/services" className="bg-white text-black rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow flex flex-col items-center">
            <img src="/img/services4.jpg" alt="Cardiology" className="h-[50%] w-full object-cover rounded mb-2" />
            <h2 className="font-semibold text-xl mb-2">Cardiology</h2>
            <p className="text-sm text-center">Diagnosis and treatment of heart-related conditions.</p>
          </Link>
          <Link to="/services" className="bg-white text-black rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow flex flex-col items-center">
            <img src="/img/head2.jpeg" alt="Cardiology" className="h-[50%] w-full object-cover rounded mb-2" />
            <h2 className="font-semibold text-xl mb-2">Cardiology</h2>
            <p className="text-sm text-center">Diagnosis and treatment of heart-related conditions.</p>
          </Link>
        </div>
    </div>

     <div className="Home flex flex-col md:flex-row justify-around bg-blue-950 text-white p-5 mt-5 items-center">
      <div className="flex flex-col items-center m-3">
        <FaRegAddressCard className="text-3xl mb-3" />
        <h1 className="text-xl mb-2">Our Location</h1>
        <p className="text-center">Doctoral Medical Center, 123 20A Medical Road, Ikeja, Lagos!...</p>
      </div>
      <div className="flex flex-col items-center m-3">
        <FaPhoneVolume className="text-3xl mb-3" />
        <h1 className="text-xl mb-2">Phone, Fax & Email</h1>
        <p className="mb-1">Mobile: +2348168606080</p>
        <p className="mb-1">Fax: +2005444, +0035580</p>
        <p className="mb-1">Email: simplewilliams965@gmail.com</p>
      </div>
      <div className="flex flex-col items-center m-3">
        <SlClock className="text-3xl mb-3" />
        <h1 className="text-xl mb-2">Opening Hours</h1>
        <p className="mb-1">Monday - Friday: 8.00 - 18.00</p>
        <p className="mb-1">Saturday: 10.00 - 18.00</p>
        <p className="mb-1">Sunday: 10.00 - 18.00</p>
      </div>
     </div>

     <div className="customFeatures">
      {/* <div className="grid grid-cols-3 space-x-4 mb-4"> */}
      <div className="featureItem  bg-white p-5 rounded shadow" data-aos="zoom-in-up">
        <CiSaveDown1 className="col"/>
         <h1>Most Affordable</h1>
          <p>There are No Monthly or Annual Charges</p>
      </div>
      <div className="featureItem bg-white p-5 rounded shadow" data-aos="zoom-in-up">
          <GrStatusGood className="col" />
         <h1>Unlimited Resources</h1>
          <p>Unlimited Patient, OPD, IPD & OT Records</p>
      </div>
      <div className="featureItem  bg-white p-5 rounded shadow" data-aos="zoom-in-up">
          <FaPersonCircleCheck className="col" />
         <h1>Most Affordable</h1>
          <p>100% Web-based Software.Accessible</p>
           <p>Accessible anytime, anywhere</p>
      </div>
      {/* </div> */}
     </div>

     <div>
       <div className="on">
        <div className="one">
          <img src="/img/out.jpg" alt="" />
        </div>
        <div className="one">
         <h1>Out Patient (OPD) Management</h1>
          <p>The OPD Module is a comprehensive outpatient management solution designed to streamline and enhance every aspect of patient care. From the moment a patient walks through your doors, our module facilitates efficient registration, ensuring that all relevant information is captured quickly and accurately.
           With our OPD Management System, you can effortlessly track and manage patient appointments, maintain detailed medical records, and monitor treatment progress. This powerful tool allows healthcare providers to focus more on patient care rather than administrative tasks.</p>
        </div>
       </div>
       </div>

       <div className="text-center mt-5">
        <Link to="/hospitalManagement" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          HospitalManagement
        </Link>
      </div>
          
      <div className="hard space-y-6 bg-blue-95">
  <h1 className="text-3xl font-bold text-center text-black">Our Patients</h1>
  <div className="flex justify-center">
    <input
      type="text"
      placeholder="Search by name"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full md:w-1/2 lg:w-1/3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md transition duration-300 ease-in-out"
    />
  </div>

  <div className="hard2">
    <ul
      className="space-x- grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      data-aos="flip-left"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="2000"
    >
      {filteredPatients.length === 0 ? (
        <p className="text-center text-gray-500">No patients found.</p>
      ) : (
        filteredPatients.map((patient) => (
          <li
            key={patient.id}
            className="bg-blue-950 hard3-1 p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow ease-in-out duration-300 h-[300px] flex flex-col justify-between"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <div className="flex flex-col justify-between h-full">
              <div className="flex-1 text-center">
                <img
                  src={patient.img}
                  alt={patient.name}
                  className="w-24 h-24 object-cover rounded-full mx-auto mb-4 shadow-md border-4 border-white"
                />

                <h3 className="text-xl font-semibold text-white mb-2">{patient.name}</h3>

                {/* Safe Access to Patient History */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {patient.history && patient.history.length > 0
                    ? patient.history[0].description
                    : 'No description available'}
                </h3>

                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {patient.history && patient.history.length > 0
                    ? patient.history[0].diagnosis
                    : 'No diagnosis available'}
                </h3>
              </div>
            </div>
          </li>
        ))
      )}
    </ul>
  </div>
</div>


      <div className="simple">
        <div className="simple2"  data-aos="zoom-in-up">
          <h1>120+ Countries</h1>
        <p>Trusted by top hospitals & clinics in more than 120 countries worldwide</p>
        </div>
        <div className="simple2" data-aos="zoom-in-down">
            <h1>#1</h1>
        <p>Hospital Management System</p>
        </div>
        <div className="simple2" data-aos="zoom-in-up">
            <h1>70+ Languages</h1>
        <p>Our HMS speaks your language. Available in 70+ languages</p>
        </div>
      </div>
      <div className="simp2">
         <img src="/img/doctor9.jpeg" alt="" />
      </div>

       
       <div className="Sunday">
        <div className="sunday2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-9">
          <div className="sunday3 bg-white p-5 rounded shadow ">
            <img src="/img/sunday2.jpeg" alt="" />
            <h1>Appointments</h1>
            <p>Book your appointments online with ease. Manage your schedule anytime, anywhere!.</p>
          </div>
          <div className="sunday3 bg-white p-5 rounded shadow">
            <img src="/img/sunday3.jpeg" alt="" />
            <h1>Patient Care</h1>
            <p>Your health is our top priority. We offer personalized care and easy access to your medical information, so you can focus on what matters </p>
          </div>
          <div className="sunday3 bg-white p-5 rounded shadow">
            <img src="/img/sunday4.jpeg" alt="" />
            <h1>Billing</h1>
            <p>View and manage your billing easily. Stay informed about your payment options.</p>
          </div>
        </div>
       </div>


       <div>
       <div className="on">
        <div className="one">
          <img src="/img/out.jpg" alt="" />
        </div>
        <div className="one">
         <h1>Out Patient (OPD) Management</h1>
          <p>The OPD Module is a comprehensive outpatient management solution designed to streamline and enhance every aspect of patient care. From the moment a patient walks through your doors, our module facilitates efficient registration, ensuring that all relevant information is captured quickly and accurately.
           With our OPD Management System, you can effortlessly track and manage patient appointments, maintain detailed medical records, and monitor treatment progress. This powerful tool allows healthcare providers to focus more on patient care rather than administrative tasks.</p>
        </div>
       </div>
       <div className="on">
        <div className="one">
         <h1>Out Patient (OPD) Management</h1> <p>The OPD Management System is a comprehensive solution designed to optimize outpatient care from start to finish. From the moment a patient arrives, the system ensures smooth registration by capturing all necessary information quickly and accurately. This streamlines the process, reducing wait times and enhancing patient satisfaction.With our OPD System, healthcare providers can efficiently manage patient appointments, track medical histories, and monitor treatment progress in real time. The system helps maintain detailed records,</p> 
        </div>
        <div className="one">
          <img src="/img/out2.jpg" alt="" />
        </div>
       </div>
       </div>
      
     
  </div>
  
  )
}

export default Home