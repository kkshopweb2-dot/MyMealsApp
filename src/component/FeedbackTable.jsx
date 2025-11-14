import React from "react";
import "../css/FeedbackTable.css";

const FeedbackTable = () => {
  return (
    <div className="tableContainer">
      <h2 className="tableTitle">Feedback Data Table</h2>
      <div className="tableWrapper">
        <table className="feedbackTable">
          <thead>
            <tr>
              <th>Order No</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Plan</th>
              <th>Food</th>
              <th>Delivery</th>
              <th>Management</th>
              <th>Feedback</th>
              <th>Date</th>
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
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackTable;
