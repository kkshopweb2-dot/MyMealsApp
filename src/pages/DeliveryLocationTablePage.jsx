import React from "react";
import styles from "../css/Changedeliverylocation.module.css";

const DeliveryLocationTablePage = ({ rows }) => {
  if (!rows || rows.length === 0) {
    return (
      <div className={styles.tableContainer}>
        <h3 className={styles.tableTitle}></h3>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <h3 className={styles.tableTitle}>Submitted Delivery Changes</h3>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Plan</th>
              <th>Effective Date</th>
              <th>Meals</th>
              <th>Change For</th>
              <th>Primary Address</th>
              <th>Secondary Address</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{row.orderNo}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.phone}</td>
                <td>{row.plan}</td>
                <td>{row.effectiveDate}</td>
                <td>{row.meals.join(", ")}</td>
                <td>{row.changeFor}</td>
                <td>
                  {row.primaryAddress}, {row.primaryCity},{" "}
                  {row.primaryLandmark}, {row.primaryState}, {row.primaryZip}
                </td>
                <td>
                  {row.secondaryAddress}, {row.secondaryCity},{" "}
                  {row.secondaryLandmark}, {row.secondaryState}, {row.secondaryZip}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveryLocationTablePage;
