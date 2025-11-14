import React from "react";
import styles from "../css/MealPreferenceTable.module.css";

const MealPreferenceTable = ({ rows }) => {
  return (
    <div className={styles.tableContainer}>
      <h3 className={styles.tableTitle}>Submitted Meal Preferences</h3>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Plan</th>
              <th>Effective From</th>
              <th>Meal Type</th>
            </tr>
          </thead>
          <tbody>
            {rows && rows.length > 0 ? (
              rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.orderNo}</td>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.plan}</td>
                  <td>{row.effectiveFrom}</td>
                  <td>{row.mealType}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className={styles.noData}>
                 
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MealPreferenceTable;
