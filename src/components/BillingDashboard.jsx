
import React, { useContext } from "react";
import HospitalContext from "../context/HospitalContext";

const BillingDashboard = () => {
  const { appointments, patients, doctors, generateInvoiceForAppointment, invoices } =
    useContext(HospitalContext);

  // Filter appointments that are confirmed
  const confirmedAppointments = appointments.filter(
    (appt) => appt.status === "Confirmed"
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">💳 Billing Dashboard</h1>

      <table className="w-full border-collapse border text-left bg-white rounded-md shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 border">Patient</th>
            <th className="p-3 border">Doctor</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Invoice</th>
          </tr>
        </thead>
        <tbody>
          {confirmedAppointments.map((appt) => {
            const patient = patients.find((p) => p.id === appt.patientId);
            const doctor = doctors.find((d) => d.id === appt.doctorId);
            const hasInvoice = invoices.some(
              (inv) => inv.appointmentId === appt.id
            );

            return (
              <tr key={appt.id}>
                <td className="p-3 border">{patient?.fullName}</td>
                <td className="p-3 border">{doctor?.name}</td>
                <td className="p-3 border text-green-600">{appt.status}</td>
                <td className="p-3 border">
                  {hasInvoice ? (
                    <span className="text-green-700 font-semibold">
                      Invoice Generated ✅
                    </span>
                  ) : (
                    <button
                      onClick={() => generateInvoiceForAppointment(appt.id)}
                      className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition"
                    >
                      Generate Invoice
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BillingDashboard;
