import React, { useState, useContext } from "react";
import HospitalContext from "../context/HospitalContext";
import { Link } from "react-router-dom";

function PaymentProcessing() {
    const { processPayment } = useContext(HospitalContext);
    const [invoiceId, setInvoiceId] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        processPayment({ invoiceId, paymentMethod })
            .then(() => {
                setSuccess('Payment processed successfully!');
                setInvoiceId('');
                setPaymentMethod('');
                setError('');
            })
            .catch((err) => setError(err.message));
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Process Payment</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Invoice ID:</label>
                <input 
                    type="text" 
                    value={invoiceId} 
                    onChange={(e) => setInvoiceId(e.target.value)} 
                    className="border border-gray-300 p-2 rounded-md w-full"
                    required 
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Payment Method:</label>
                <input 
                    type="text" 
                    value={paymentMethod} 
                    onChange={(e) => setPaymentMethod(e.target.value)} 
                    className="border border-gray-300 p-2 rounded-md w-full"
                    required 
                />
            </div>
            <button 
                type="submit" 
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
                Process Payment
            </button>

            <div className="text-center mt-5">
                <Link 
                    to="/paymenthistory" 
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Payment History
                </Link>
            </div>
        </form>
    );
}

export default PaymentProcessing;
