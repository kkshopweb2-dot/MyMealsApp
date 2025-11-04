// src/components/NewAccountsTable.jsx
import React from 'react';
import '../css/Card.css';

const data = [
  { id: '#US523', date: '24 April, 2025', user: 'Dan Adrick', status: 'Verified', username: '@omlions' },
  { id: '#US652', date: '24 April, 2025', user: 'Daniel Olsen', status: 'Verified', username: '@allilates' },
  { id: '#US862', date: '20 April, 2025', user: 'Jack Roldan', status: 'Pending', username: '@grlys' },
  { id: '#US756', date: '18 April, 2025', user: 'Betty Cox', status: 'Verified', username: '@reffon' },
  { id: '#US420', date: '18 April, 2025', user: 'Carlos Johnson', status: 'Blocked', username: '@bebo' },
];

const NewAccountsTable = () => {
  return (
    <div className="card">
      <h4>New Accounts</h4>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Date</th><th>User</th><th>Status</th><th>Username</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{row.id}</td>
              <td>{row.date}</td>
              <td>{row.user}</td>
              <td><span className={`status ${row.status.toLowerCase()}`}>{row.status}</span></td>
              <td>{row.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewAccountsTable;
