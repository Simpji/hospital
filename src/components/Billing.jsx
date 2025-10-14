import React from 'react';

const currentPatientId = '392c';

const Billing = ({ billing = [] }) => {
  const patientBills = billing.filter((bill) => bill.patientId === currentPatientId);

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Billing History</h2>

      {patientBills.length === 0 ? (
        <p className="text-gray-500 text-center">No bills available.</p>
      ) : (
        <div className="space-y-4">
          {patientBills.map((bill) => (
            <div
              key={bill.id}
              className="border rounded p-4 bg-gray-50 shadow-sm"
            >
              <p className="font-semibold mb-1">{bill.description}</p>
              <p className="text-sm text-gray-600 mb-2">{bill.date}</p>
              <p className="font-bold mb-1">₦{bill.amount.toLocaleString()}</p>
              <p className={bill.paid ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                {bill.paid ? 'Paid' : 'Unpaid'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Billing;
