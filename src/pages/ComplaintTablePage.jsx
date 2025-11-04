import React, { useState } from "react";
import "../css/ComplaintTable.Module.css"; // Make sure this file is inside src/css/

const ComplaintTable = () => {
  // Dynamic blank rows state
  const [blankRows, setBlankRows] = useState([
    { orderNo: "", name: "", phone: "", meal: "", issue: "", date: "", image: "" },
  ]);

  const handleAddRow = () => {
    setBlankRows([
      ...blankRows,
      { orderNo: "", name: "", phone: "", meal: "", issue: "", date: "", image: "" },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...blankRows];
    updated[index][field] = value;
    setBlankRows(updated);
  };

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
          {blankRows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  placeholder="Order No"
                  value={row.orderNo}
                  onChange={(e) => handleInputChange(index, "orderNo", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Name"
                  value={row.name}
                  onChange={(e) => handleInputChange(index, "name", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="tel"
                  placeholder="Phone"
                  value={row.phone}
                  onChange={(e) => handleInputChange(index, "phone", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Meal"
                  value={row.meal}
                  onChange={(e) => handleInputChange(index, "meal", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Issue"
                  value={row.issue}
                  onChange={(e) => handleInputChange(index, "issue", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={row.date}
                  onChange={(e) => handleInputChange(index, "date", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleInputChange(index, "image", e.target.files[0]?.name || "")
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="addRowBtn" onClick={handleAddRow}>
        + Add Row
      </button>
    </div>
  );
};

export default ComplaintTable;
