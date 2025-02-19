import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HospitalProvider } from "./context/HospitalContext"; // No need to import HospitalContext, only HospitalProvider
import PatientManagement from "./assets/Admin/PatientManagement";
import ViewPatients from "./assets/Admin/ViewPatients";
import PatientHistory from "./assets/Admin/PatientHistory"
import AddPatient from "./assets/Admin/AddPatient";
import AddDoctors from "./assets/Admin/AddDoctors";
import AdminDashboards from "./assets/Admin/AdminDashboards";
import Dashboard from "./assets/Admin/Dashboard"
import ComfirmAppointment from "./assets/Admin/ComfirmAppointment";
import RegisterPatient from "./components/RegisterPatient";
import PatientLogin from "./components/PatientLogin";
import Home from "./components/pages/Home";
import ContactInfo from "./components/ContactInfo";
import AOS from "aos";
import "aos/dist/aos.css";
import Services from "./components/Services";
import Doctors from "./assets/Admin/Doctors";
import Doctor from "./components/Doctor";
import DoctorDetail from "./components/DoctorDetail";
import EditDoctor from "./components/EditDoctor";
import AppointmentForm from "./components/AppointmentForm";
import BookAppointment from "./assets/Admin/BookAppointment"
import ViewAppointmentSchedule from "./assets/Admin/ViewAppointmentSchedule";
import ViewAppointment from "./components/ViewAppointment"
import ViewAppoint from "./assets/Admin/ViewAppoint";
import APPointmentList from "./components/APPointmentList";
import AppointmentDetail from "./components/AppointmentDetail";
import InvoiceForm from "./components/InvoiceForm";
import PaymentProcessing from "./components/PaymentProcessing";
import PaymentHistory from "./components/PaymentHistory";
import PatientPortal from "./components/PatientPortal";
import AdminDashboard from "./assets/Admin/AdminDasboard";
import DoctorDashboard from "./components/DoctorDashboard";
import PatientDashboard from "./components/PatientDashboard";
import InvoiceManagement from "./components/InvoiceManagement"
import DiagnosisForm from "./components/DiagnosisForm";
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
          <Route path="/Admin" element={<AdminDashboards />} />
          <Route path="/patients" element={<PatientManagement />} />
          <Route path="/ViewPatients" element={<ViewPatients />} />
          <Route path="/ViewAppoint" element={<ViewAppoint />} />
          <Route path="/PatientHistory" element={<PatientHistory />} />
          <Route path="/AddPatient" element={<AddPatient />} />
          <Route path="/AddDoctors" element={<AddDoctors />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/comfirm-appointment/:appointmentId" element={<ComfirmAppointment />} />
          <Route path="/registerPatient" element={<RegisterPatient onRegister={handleRegister} />} />
          <Route path="/patientlogin" element={<PatientLogin patients={patients} />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/Doctor" element={<Doctor />} />
          <Route path="/contactinfo" element={<ContactInfo/>} />
          <Route path="/doctor-detail/:id" element={<DoctorDetail />} />
          <Route path="/edit-doctor/:id" element={<EditDoctor />} />
          <Route path="/appointment" element={<AppointmentForm />} />
          <Route path="/appointmentlist" element={<APPointmentList />} />
          <Route path="/BookAppointment" element={<BookAppointment />} />
          <Route path="/viewAppointment" element={<ViewAppointmentSchedule />} />
          <Route path="/view" element={< ViewAppointment />} />
          <Route path="/appointmentDetail/:id" element={<AppointmentDetail />} />
          <Route path="/invoice" element={<InvoiceForm />} />
          <Route path="/paymentprocessing" element={<PaymentProcessing />} />
          <Route path="/paymenthistory" element={<PaymentHistory />} />
          <Route path="/patientportal" element={<PatientPortal />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/doctorDashboard" element={<DoctorDashboard />} />
          <Route path="/patientDashboard" element={<PatientDashboard />} />
          <Route path="/invoiceManagement" element={<InvoiceManagement />} />
          {/* <Route path="/appointmentLists" element={<AppointmentLists />} /> */}
          <Route path="/hospitalManagement" element={<HospitalManagementOverview />} />
        </Routes>
        <Footer />
      </Router>
    </HospitalProvider>
  );
}

export default App;
