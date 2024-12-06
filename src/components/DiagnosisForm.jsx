import React, { useState } from 'react';

const DiagnosisForm = ({ createDiagnosis }) => {
  const [diagnosis, setDiagnosis] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createDiagnosis(diagnosis);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Diagnosis</h2>
      <textarea 
        value={diagnosis} 
        onChange={(e) => setDiagnosis(e.target.value)} 
        placeholder="Write diagnosis here..." 
      />
      <button type="submit">Submit Diagnosis</button>
    </form>
  );
};

export default DiagnosisForm;
