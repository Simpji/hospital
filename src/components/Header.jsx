import { useState } from "react";
import { SlMenu } from "react-icons/sl";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";

function Header() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (section) => {
    setDropdownOpen(dropdownOpen === section ? null : section);
  };

  return (
    <div className="bg-blue-950 sticky top-0 z-[20] flex items-center py-[10px] justify-between px-[30px]">
      <div>
        <Link to="/"><h1 className="text-[24px] text-white font-bold">Simple Hospital</h1></Link>
      </div>
      <nav className="hidden lg:flex space-x-4 text-white text-[15px]">
        <Link to="/home">Home</Link>
        <div className="relative">
          <button
            onClick={() => toggleDropdown('management')}
            className="flex items-center space-x-2"
          >
            <span>Management</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div className={`absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg ${dropdownOpen === 'management' ? 'block' : 'hidden'}`}>
            <Link to="/appointments" className="block px-4 py-2 hover:bg-gray-100">Appointments</Link>
            <Link to="/registerPatient" className="block px-4 py-2 hover:bg-gray-100">Register Patient</Link>
            <Link to="/billing" className="block px-4 py-2 hover:bg-gray-100">Billing</Link>
            <Link to="/inventory" className="block px-4 py-2 hover:bg-gray-100">Inventory</Link>
            <Link to="/patient-portal" className="block px-4 py-2 hover:bg-gray-100">Patient Portal</Link>
            <Link to="/ContactInfo" className="block px-4 py-2 hover:bg-gray-100">ContactInfo</Link>
          </div>
        </div>
        <Link to="/login">Login</Link>
      </nav>
      <button onClick={() => setOpen(!open)} className="flex items-center justify-center w-[35px] h-[35px] lg:hidden">
        <SlMenu className="text-3xl text-white" />
      </button>
      <div onClick={() => setOpen(!open)} className={`fixed lg:hidden top-0 w-full bg-black z-[20] ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}></div>
      <div className={`fixed lg:hidden left-0 top-0 w-[300px] h-screen overflow-auto z-[30] bg-white transition-all duration-200 ${open ? "translate-x-0" : "translate-x-[-500px]"}`}>
        <div className="flex justify-end p-4">
          <MdCancel onClick={() => setOpen(false)} className="text-red-500 text-3xl cursor-pointer" />
        </div>
        <nav className="flex flex-col text-black text-[15px]">
          <Link to="/home" onClick={() => setOpen(false)}>Home</Link>
          <button onClick={() => toggleDropdown('management')} className="flex items-center space-x-2">
            <span>Management</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div className={`flex flex-col ${dropdownOpen === 'management' ? 'block' : 'hidden'}`}>
            <Link to="/appointments" onClick={() => setOpen(false)} className="px-4 py-2 hover:bg-gray-100">Appointments</Link>
            <Link to="/billing" onClick={() => setOpen(false)} className="px-4 py-2 hover:bg-gray-100">Billing</Link>
            <Link to="/inventory" onClick={() => setOpen(false)} className="px-4 py-2 hover:bg-gray-100">Inventory</Link>
            <Link to="/patient-portal" onClick={() => setOpen(false)} className="px-4 py-2 hover:bg-gray-100">Patient Portal</Link>
          </div>
          <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
        </nav>
      </div>
    </div>
  );
}

export default Header;