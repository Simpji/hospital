import React, { useContext } from "react";
import HospitalContext from "../context/HospitalContext";

const PatientBilling = ({ patientId }) => {
  const { invoices, paymentHistory, patients } = useContext(HospitalContext);

  const patient = patients.find((p) => p.id === patientId);
  const myInvoices = invoices.filter((inv) => inv.patientId === patientId);
  const myPayments = paymentHistory.filter((pay) => pay.patientId === patientId);

  if (!patient) return <p className="p-6">Patient not found.</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        💰 Billing for {patient.fullName}
      </h1>

      {/* Invoices */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Invoices</h2>
        {myInvoices.length === 0 ? (
          <p className="text-gray-500">No invoices available.</p>
        ) : (
          <ul className="bg-white rounded-md shadow divide-y">
            {myInvoices.map((inv) => (
              <li key={inv.id} className="p-4 flex justify-between">
                <div>
                  <p><strong>Amount:</strong> ${inv.amount}</p>
                  <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                </div>
                <button className="bg-green-600 text-white px-4 py-1 rounded-md">
                  Pay Now
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Payment History */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Payment History</h2>
        {myPayments.length === 0 ? (
          <p className="text-gray-500">No payments yet.</p>
        ) : (
          <ul className="bg-white rounded-md shadow divide-y">
            {myPayments.map((pay) => (
              <li key={pay.id} className="p-4 flex justify-between">
                <div>
                  <p><strong>Amount:</strong> ${pay.amount}</p>
                  <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                </div>
                <span className="text-green-600 font-semibold">Paid</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default PatientBilling;
