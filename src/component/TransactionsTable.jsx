// src/components/TransactionsTable.jsx
import React from 'react';
import '../css/Card.css';

const data = [
  { id: '#98521', date: '24 April, 2025', amount: '$120.55', status: 'Success', desc: 'Commissions' },
  { id: '#20158', date: '24 April, 2025', amount: '$9.68', status: 'Success', desc: 'Affiliates' },
  { id: '#36589', date: '20 April, 2025', amount: '$105.22', status: 'Declined', desc: 'Grocery' },
  { id: '#95362', date: '18 April, 2025', amount: '$80.59', status: 'Success', desc: 'Refunds' },
  { id: '#75214', date: '18 April, 2025', amount: '$750.95', status: 'Declined', desc: 'Bill Payments' },
];

const TransactionsTable = () => {
  return (
    <div className="card">
      <h4>Recent Transactions</h4>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Date</th><th>Amount</th><th>Status</th><th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{row.id}</td>
              <td>{row.date}</td>
              <td>{row.amount}</td>
              <td><span className={`status ${row.status.toLowerCase()}`}>{row.status}</span></td>
              <td>{row.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
