import React from 'react'
import { Link } from 'react-router-dom';
import { FaRegAddressCard } from "react-icons/fa6";
import { FaPhoneVolume } from "react-icons/fa6";
import { SlClock } from "react-icons/sl";
import { CiSaveDown1 } from "react-icons/ci";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { GrStatusGood } from "react-icons/gr";
import HospitalManagementOverview from '../HospitalManagementOverview';

function Home() {
  return (
     <div>
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
     </div>

      <div className="simple mt-6">
        <div className="simple2"  data-aos="fade-right">
            <h1>120+
        Countries</h1>
        <p>Trusted by top hospitals & clinics in more than 120 countries worldwide</p>
        </div>
        <div className="simple2" data-aos="zoom-in-down">
            <h1>#1</h1>
        <p>Hospital Management System</p>
        </div>
        <div className="simple2" data-aos="fade-left">
            <h1>70+ Languages</h1>
        <p>Our HMS speaks your language. Available in 70+ languages</p>
        </div>
      </div>
      <div className="simp2">
         <img src="/img/doctor9.jpeg" alt="" />
      </div>
     
  </div>
  
  )
}

export default Home