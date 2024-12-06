import React from 'react';

const Billings = ({ bills }) => {
  return (
    <div>
      <h2>Billing Information</h2>
      <ul>
        {bills.map((bill, index) => (
          <li key={index}>
            <p>Amount: ${bill.amount} - Status: {bill.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Billings;
