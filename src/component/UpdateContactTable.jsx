import React from "react";
import styles from "../css/UpdateContactTable.module.css";

const UpdateContactTable = ({ formData }) => {
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
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{formData.orderNo}</td>
              <td>{formData.name}</td>
              <td>{formData.email}</td>
              <td>{formData.plan}</td>
              <td>{formData.oldPhone}</td>
              <td>{formData.newPhone}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpdateContactTable;
