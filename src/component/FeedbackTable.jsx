import React, { useState } from "react";
import "../css/FeedbackTable.css";

const FeedbackTable = () => {
  const [rows, setRows] = useState([
    {
      orderNo: "",
      name: "",
      phoneNumber: "",
      plan: "",
      feedbackText: "",
      selectedDate: "",
      food: "",
      delivery: "",
      management: "",
    },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        orderNo: "",
        name: "",
        phoneNumber: "",
        plan: "",
        feedbackText: "",
        selectedDate: "",
        food: "",
        delivery: "",
        management: "",
      },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

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
            {rows.map((row, index) => (
              <tr key={index}>
                {Object.keys(row).map((field) => (
                  <td key={field}>
                    <input
                      type="text"
                      value={row[field]}
                      onChange={(e) =>
                        handleInputChange(index, field, e.target.value)
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="addRowBtn" onClick={addRow}>
        + Add Row
      </button>
    </div>
  );
};

export default FeedbackTable;
