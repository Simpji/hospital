import React from 'react'

function Footer() {
  return (
    <div className="bg-blue-950 p-8 flex flex-col md:flex-row justify-around items-start text-white footer mt-8">
        <div className="text-white Link">
            <h1 className='text-3xl mb-2'>Page</h1>
           <p className="mb-1">Appointments</p>
           <p className="mb-1">Billing</p>
           <p className="mb-1">Inventory</p>
           <p className="mb-1">Patient</p>
           <p className="mb-1">Patient Portal</p>
        </div>
        <div className="text-white Link">
            <h1 className='text-3xl mb-2'>Social media</h1>
           <p className="mb-1">Facebook</p>
           <p className="mb-1">Twitter</p>
           <p className="mb-1">Instagram</p>
           <p className="mb-1">Linkedin</p>
           <p className="mb-1">Patient Portal</p>
        </div>
        <div className="text-white Link">
            <h1 className='text-3xl mb-2'>Page</h1>
           <p className="mb-1">Appointments</p>
           <p className="mb-1">Billing</p>
           <p className="mb-1">Inventory</p>
           <p className="mb-1">Patient</p>
           <p className="mb-1">Patient Portal</p>
        </div>
        <div className="text-white Link flex flex-col">
            <h1 className="text-3xl mb-2">Newsletter</h1>
            <p className="font-bold w-[50%] mb-2">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.</p>
            <input type="text" id='email' placeholder="Email Address" className="p-3 w-[50%] link"/>
            <button></button>
        </div>
    </div>
  )
}

export default Footer