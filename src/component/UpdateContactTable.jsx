import React, { useState } from "react";
import styles from "../css/UpdateContactTable.module.css";

const UpdateContactTable = () => {
  const [rows, setRows] = useState([
    {
      orderNo: "",
      name: "",
      email: "",
      plan: "",
      oldPhone: "",
      newPhone: "",
    },
  ]);

  // Handle input change for a specific cell
  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  // Add a new blank row
  const addRow = () => {
    setRows([
      ...rows,
      {
        orderNo: "",
        name: "",
        email: "",
        plan: "",
        oldPhone: "",
        newPhone: "",
      },
    ]);
  };

  // Optional: Delete a specific row
  const deleteRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  return (
    <div className={styles.tableContainer}>
      <h2 className={styles.tableTitle}>Update Contact Details</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Plan</th>
              <th>Old Phone</th>
              <th>New Phone</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.keys(row).map((key) => (
                  <td key={key}>
                    <input
                      type="text"
                      value={row[key]}
                      onChange={(e) =>
                        handleChange(rowIndex, key, e.target.value)
                      }
                      className={styles.inputCell}
                    />
                  </td>
                ))}
                <td>
                  <button
                    onClick={() => deleteRow(rowIndex)}
                    className={styles.deleteButton}
                  >
                    ✖
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={addRow} className={styles.addButton}>
        + Add Row
      </button>
    </div>
  );
};

export default UpdateContactTable;
