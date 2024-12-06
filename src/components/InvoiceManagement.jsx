import React, { useContext } from 'react';
import HospitalContext from '../context/HospitalContext';

const InvoiceManagement = () => {
  const { invoices, generateInvoice } = useContext(HospitalContext);

  return (
    <div>
      <h2>Manage Invoices</h2>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            <span>{invoice.patientName} - ${invoice.amount}</span>
            <button onClick={() => generateInvoice(invoice.id)}>Generate Invoice</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceManagement;
