import React, { useContext, useState, useEffect } from 'react';
import HospitalContext from '../context/HospitalContext';

const DoctorMessage = ({ doctorId }) => {
  const { messages = [], addMessage } = useContext(HospitalContext);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [replyMap, setReplyMap] = useState({});

  // Messages for this doctor only
  const doctorMessages = messages.filter(msg => String(msg.doctorId) === String(doctorId));

  // Get unique patient IDs who messaged this doctor
  const uniquePatientIds = [...new Set(doctorMessages.map(msg => msg.patientId))];

  // On mount, select the first patient if none selected yet
  useEffect(() => {
    if (!selectedPatientId && uniquePatientIds.length > 0) {
      setSelectedPatientId(uniquePatientIds[0]);
    }
  }, [uniquePatientIds, selectedPatientId]);

  // Messages for the selected patient & doctor
  const patientMessages = doctorMessages.filter(
    msg => String(msg.patientId) === String(selectedPatientId)
  );

  const handleReply = (patientId) => {
    const text = replyMap[patientId];
    if (!text) return;

    addMessage({
      doctorId,
      patientId,
      text,
      sender: 'doctor',
    });

    setReplyMap(prev => ({ ...prev, [patientId]: '' }));
  };

  return (
    <div>
      {uniquePatientIds.length === 0 ? (
        <p className="text-gray-500">No messages from patients.</p>
      ) : (
        <>
          {/* Patient selector */}
          <div className="mb-4 flex space-x-2">
            {uniquePatientIds.map(pid => (
              <button
                key={pid}
                onClick={() => setSelectedPatientId(pid)}
                className={`px-3 py-1 rounded ${
                  pid === selectedPatientId ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                Patient {pid}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="mb-4 p-4 border rounded">
            <h4 className="font-semibold mb-2">Conversation with Patient ID: {selectedPatientId}</h4>
            <ul className="mb-2 space-y-1 max-h-60 overflow-y-auto">
              {patientMessages.map((msg, index) => (
                <li
                  key={index}
                  className={`p-2 ${
                    msg.sender === 'doctor' ? 'text-left bg-green-100' : 'text-right bg-blue-100'
                  }`}
                >
                  <strong>{msg.sender === 'doctor' ? 'Doctor:' : 'Patient:'}</strong> {msg.text}
                </li>
              ))}
            </ul>
            <textarea
              value={replyMap[selectedPatientId] || ''}
              onChange={(e) =>
                setReplyMap(prev => ({ ...prev, [selectedPatientId]: e.target.value }))
              }
              placeholder="Type your reply..."
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={() => handleReply(selectedPatientId)}
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              Send Reply
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DoctorMessage;
