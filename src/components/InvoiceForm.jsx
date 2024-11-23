import { useState, useContext } from "react";
import HospitalContext from "../context/HospitalContext";
import { Link } from "react-router-dom";

function InvoiceForm() {
    const { generateInvoice } = useContext(HospitalContext);
    const [amount, setAmount] = useState('');
    const [patientId, setPatientId] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
    e.preventDefault();
    if (amount <= 0) {
        setError('Amount must be a positive number.');
        return;
    }
    generateInvoice({ amount, patientId })
        .then((invoice) => {
            setSuccess(`Invoice generated successfully! Invoice ID: ${invoice.id}`);
            setAmount('');
            setPatientId('');
            setError('');
        })
        .catch((err) => setError(err.message));
 };
    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Generate Invoice</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Patient ID:</label>
                <input 
                    type="text" 
                    value={patientId} 
                    onChange={(e) => setPatientId(e.target.value)} 
                    className="border border-gray-300 p-2 rounded-md w-full"
                    required 
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Amount:</label>
                <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    className="border border-gray-300 p-2 rounded-md w-full"
                    required 
                />
            </div>
            <button 
                type="submit" 
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
                Generate Invoice
            </button>

            <div className="text-center mt-5">
                <Link 
                    to="/paymentprocessing" 
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Payment Processing
                </Link>
            </div>
        </form>
    );
}

export default InvoiceForm;
