import Header from "./components/Header"
import Banner from "./components/Banner"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HospitalProvider } from "./context/hospitalContext"
import PatientManagement from "./components/pages/PatientManagement"
import RegisterPatient from "./components/RegisterPatient"
import Home from "./components/pages/Home"
import AOS from "aos"
import "aos/dist/aos.css";
import Services from "./components/Services"
import Doctors from "./components/Doctors"
import DoctorDetail from "./components/DoctorDetail"
import HospitalManagementOverview from './components/HospitalManagementOverview'
import Footer from "./components/Footer"
import { useEffect } from "react"




function App() {

  const Animation = () => {
    useEffect(()=>{
      AOS.init({duration: 3000})
    }, [])
  }

  return (
    <>
    <HospitalProvider>
     <Router>
      <Header />
      <Routes>
        <Route path="/" element={
            <>
              <Banner />
              <Home />
            </>
          }/>
        <Route path="/services" element={< Services />}/>
        <Route path="/patients" element={< PatientManagement/>}/>
        <Route path="/registerPatient" element={< RegisterPatient />}/>
        <Route path="/doctors" element={< Doctors />}/>
        <Route path="/doctor/:id" element={< DoctorDetail />}/>
        <Route path="/hospitalManagement" element={< HospitalManagementOverview />}/>
        
      </Routes>
      <Animation/>
      <Footer />
    </Router>
    </HospitalProvider>
    </>
  )
}

export default App
