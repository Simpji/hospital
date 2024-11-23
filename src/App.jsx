import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HospitalProvider } from "./context/HospitalContext"; // No need to import HospitalContext, only HospitalProvider
import PatientManagement from "./components/pages/PatientManagement";
import RegisterPatient from "./components/RegisterPatient";
import PatientLogin from "./components/PatientLogin";
import Home from "./components/pages/Home";
import ContactInfo from "./components/ContactInfo";
import AOS from "aos";
import "aos/dist/aos.css";
import Services from "./components/Services";
import Doctors from "./components/Doctors";
import DoctorDetail from "./components/DoctorDetail";
import EditDoctor from "./components/EditDoctor";
import AppointmentForm from "./components/AppointmentForm";
import APPointmentList from "./components/APPointmentList";
import ViewAppointmentSchedule from "./components/ViewAppointmentSchedule";
import AppointmentManagement from "./components/AppointmentManagement";
import InvoiceForm from "./components/InvoiceForm";
import PaymentProcessing from "./components/PaymentProcessing";
import PaymentHistory from "./components/PaymentHistory";
import PatientPortal from "./components/PatientPortal";
import HospitalManagementOverview from "./components/HospitalManagementOverview";
import Footer from "./components/Footer";

function App() {
  const [patients, setPatients] = useState([]);

  const handleRegister = (newPatient) => {
    setPatients((prevPatients) => [
      ...prevPatients,
      { ...newPatient, id: prevPatients.length + 1 }
    ]);
  };

  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);

  return (
    <HospitalProvider> 
      <Router>
        <Header />
        <Routes>
            <Route path="/" element={
          <>
           <Banner/>
           <Home/>
          </>
        } />
       
          {/* <Route path="/home" element={<><Banner /><Home /></>} /> */}
          <Route path="/services" element={<Services />} />
          <Route path="/patients" element={<PatientManagement />} />
          <Route path="/registerPatient" element={<RegisterPatient onRegister={handleRegister} />} />
          <Route path="/patientlogin" element={<PatientLogin patients={patients} />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/contactinfo" element={<ContactInfo/>} />
          <Route path="/doctor-detail/:id" element={<DoctorDetail />} />
          <Route path="/edit-doctor/:id" element={<EditDoctor />} />
          <Route path="/appointment" element={<AppointmentForm />} />
          <Route path="/appointmentlist" element={<APPointmentList />} />
          <Route path="/viewAppointment" element={<ViewAppointmentSchedule />} />
          <Route path="/appointments" element={<AppointmentManagement />} />
          <Route path="/invoice" element={<InvoiceForm />} />
          <Route path="/paymentprocessing" element={<PaymentProcessing />} />
          <Route path="/paymenthistory" element={<PaymentHistory />} />
          <Route path="/patientportal" element={<PatientPortal />} />
          <Route path="/hospitalManagement" element={<HospitalManagementOverview />} />
        </Routes>
        <Footer />
      </Router>
    </HospitalProvider>
  );
}

export default App;
