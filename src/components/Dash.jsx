// Dashboard.jsx
import React, { useState } from 'react';
import Messaging from './Messaging';
import Billing from './Billing';

const Dashboard = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [billing, setBilling] = useState([]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome to Patient Portal</h1>
      <Messaging allMessages={allMessages} setAllMessages={setAllMessages} setBilling={setBilling} />
      <Billing billing={billing} />
    </div>
  );
};

export default Dashboard;
