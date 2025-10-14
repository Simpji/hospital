// import React from 'react';

// const BillingHistory = ({ bills, onPay }) => (
//   <div className="bg-white p-6 rounded shadow mt-4">
//     <h2 className="text-xl font-semibold mb-4">Billing History</h2>
//     <table className="w-full text-left border-collapse">
//       <thead>
//         <tr className="border-b">
//           <th className="pb-2">Date</th>
//           <th className="pb-2">Amount</th>
//           <th className="pb-2">Status</th>
//           <th className="pb-2">Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {bills.length > 0 ? (
//           bills.map((bill, idx) => (
//             <tr key={idx} className="border-b">
//               <td className="py-2">{bill.date}</td>
//               <td>${bill.amount}</td>
//               <td>{bill.status}</td>
//               <td>
//                 {bill.status === 'Unpaid' ? (
//                   <button
//                     onClick={() => onPay(bill.id)}
//                     className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
//                   >
//                     Pay Now
//                   </button>
//                 ) : (
//                   <span className="text-gray-400">Paid</span>
//                 )}
//               </td>
//             </tr>
//           ))
//         ) : (
//           <tr>
//             <td colSpan="4">No billing records found.</td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   </div>
// );

// export default BillingHistory;
