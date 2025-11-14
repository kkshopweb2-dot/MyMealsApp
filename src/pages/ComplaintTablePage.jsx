import React from "react";
import "../css/ComplaintTable.Module.css";

const ComplaintTable = () => {
  return (
    <div className="complaint-table-container">
      <h3 className="complaint-title">Complaint Summary</h3>

      <table className="complaint-table">
        <thead>
          <tr>
            <th>Order No</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Meal</th>
            <th>Issue</th>
            <th>Date</th>
            <th>Image</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintTable;
