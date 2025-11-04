import React, { useState } from "react";
import styles from "../css/MealPreferenceTable.module.css";

const MealPreferenceTable = () => {
  const [rows, setRows] = useState([
    {
      orderNo: "",
      name: "",
      email: "",
      phone: "",
      plan: "",
      effectiveFrom: "",
      mealType: "",
      avoidNonVeg: "",
      avoidVeg: "",
      dishChoice: "",
    },
  ]);

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        orderNo: "",
        name: "",
        email: "",
        phone: "",
        plan: "",
        effectiveFrom: "",
        mealType: "",
        avoidNonVeg: "",
        avoidVeg: "",
        dishChoice: "",
      },
    ]);
  };

  return (
    <div className={styles.tableContainer}>
      <h2 className={styles.tableTitle}>Meal Preference Data</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Plan</th>
              <th>Effective From</th>
              <th>Meal Type</th>
              <th>Avoid Non-Veg</th>
              <th>Avoid Veg</th>
              <th>Dish Choice</th>
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

export default MealPreferenceTable;
