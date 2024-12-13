import React, { useContext } from 'react'
import Doctor from './Doctor'
import HospitalContext from '../context/HospitalContext'
import { Link } from 'react-router-dom'

function Services({item}) {
  const { Doctors } = useContext(HospitalContext)
  return (
    <>
   <section className="py-10 px-5 bg-gray-100">
      <h2 className="text-center text-2xl font-bold mb-6">Our Services</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded shadow">
          <Link to="/appointment">
          <h3 className="text-xl font-semibold">Appointments</h3>
          <p className="mt-2">Schedule your appointments easily and quickly.</p>
          </Link>
        </div>
        <div className="bg-white p-5 rounded shadow">
          <Link to="/invoice">
            <h3 className="text-xl font-semibold">Billing</h3>
            <p className="mt-2">Transparent billing processes for our services.</p>
          </Link>
        </div>
        <div className="bg-white p-5 rounded shadow">
          <Link to="/patientportal">
            <h3 className="text-xl font-semibold">Patient Portal</h3>
            <p className="mt-2">Access your health records anytime, anywhere.</p>
          </Link>
        </div>
        <div className="bg-white p-5 rounded shadow">
          <h3 className="text-xl font-semibold">Inventory Management</h3>
          <p className="mt-2">Efficient management of hospital inventory.</p>
        </div>
        <div className="bg-white p-5 rounded shadow">
          <h3 className="text-xl font-semibold">Telehealth</h3>
          <p className="mt-2">Consult with doctors remotely.</p>
        </div>
        <div className="bg-white p-5 rounded shadow">
          <h3 className="text-xl font-semibold">Emergency Care</h3>
          <p className="mt-2">24/7 emergency services available.</p>
        </div>
      </div>

      <Link to={`/doctor`}>
            <button className='text-2xl text-black'>Check Our Doctor's</button>
          </Link>
    </section>

    {/* <div>
       <h1>Our Doctors</h1>
        {Doctors.map((item) =>(
          <Doctors item={item} key={item.id}/>
     ))}
    </div> */}
    </>
  )
}

export default Services