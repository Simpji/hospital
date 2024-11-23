import React, { useContext } from "react";
import HospitalContext from "../context/HospitalContext";

function PaymentHistory() {
    const { paymentHistory } = useContext(HospitalContext);

    
    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, 
            timeZone: 'africa/lagos'
        };
        return new Date(dateString).toLocaleString('en-NG', options);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Payment History</h2>
            {paymentHistory.length === 0 ? (
                <p className="text-center text-gray-500">No payment history available.</p>
            ) : (
                <ul className="space-y-4">
                    {paymentHistory.map((payment) => (
                        <li key={payment.id} className="border-b pb-2">
                            <div className="font-semibold">Invoice ID: {payment.invoiceId}</div>
                            <div>Amount: NGN {payment.amount}</div>
                            <div>Payment Method: {payment.paymentMethod}</div>
                            <div>Date: {formatDate(payment.date)}</div> 
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default PaymentHistory;
