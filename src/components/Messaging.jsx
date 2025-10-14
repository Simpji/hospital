// Messaging.jsx
import React, { useState } from 'react';

const currentPatientId = '392c';
const doctorId = '3';

const Messaging = ({
  allMessages = [],
  setAllMessages = () => console.warn('setAllMessages not provided'),
  setBilling = () => console.warn('setBilling not provided'),
}) => {
  const [message, setMessage] = useState('');

  // Filter messages for this patient and doctor
  const messages = allMessages.filter(
    (msg) => msg.patientId === currentPatientId && msg.doctorId === doctorId
  );

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    const newMsg = {
      id: 'msg' + Date.now(),
      patientId: currentPatientId,
      doctorId,
      sender: 'patient',
      recipient: 'doctor',
      timestamp: new Date().toISOString(),
      message: trimmed,
      billGenerated: false,
    };

    const updatedMessages = [...allMessages, newMsg];
    setAllMessages(updatedMessages);
    setMessage('');

    setTimeout(() => {
      const reply = {
        id: 'msg' + (Date.now() + 1),
        patientId: currentPatientId,
        doctorId,
        sender: 'doctor',
        recipient: 'patient',
        timestamp: new Date().toISOString(),
        message: "Thank you for your message. I’ll send you a bill now.",
        billGenerated: true,
      };

      const messagesWithReply = [...updatedMessages, reply];
      setAllMessages(messagesWithReply);

      const newBill = {
        id: 'bill' + Date.now(),
        patientId: currentPatientId,
        doctorId,
        date: new Date().toISOString().split('T')[0],
        description: 'Online consultation via message',
        amount: 100,
        paid: false,
      };

      setBilling((prev) => (Array.isArray(prev) ? [...prev, newBill] : [newBill]));
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow flex flex-col h-[500px]">
      <h2 className="text-2xl font-bold mb-4 text-center">Message Your Doctor</h2>

      <div className="flex-1 overflow-y-auto mb-4 space-y-3 px-2">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages yet. Start the conversation!</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[75%] px-4 py-2 rounded-lg ${
                msg.sender === 'patient'
                  ? 'bg-blue-500 text-white self-end'
                  : 'bg-gray-200 self-start'
              }`}
            >
              <p>{msg.message}</p>
              <small className="text-xs mt-1 block text-right text-gray-600">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </small>
            </div>
          ))
        )}
      </div>

      <textarea
        rows={3}
        placeholder="Type your message..."
        className="border rounded p-2 resize-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) =>
          e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())
        }
      />

      <button
        onClick={handleSend}
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
      >
        Send
      </button>
    </div>
  );
};

export default Messaging;
