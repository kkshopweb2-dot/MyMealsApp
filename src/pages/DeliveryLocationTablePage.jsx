import React, { useState } from "react";
import styles from "../css/DeliveryLocationTable.module.css";

const DeliveryLocationTable = ({ initialData = [] }) => {
  const [formDataList, setFormDataList] = useState(initialData);

  // Handle input change
  const handleChange = (index, field, value) => {
    const updatedData = [...formDataList];
    updatedData[index][field] = value;
    setFormDataList(updatedData);
  };

  // Add new blank row
  const handleAddRow = () => {
    setFormDataList([
      ...formDataList,
      {
        orderNo: "",
        name: "",
        email: "",
        phone: "",
        plan: "",
        effectiveDate: "",
        meals: "",
        changeFor: "",
        addressType: "",
        primaryAddress: "",
        primaryCity: "",
        primaryLandmark: "",
        primaryState: "",
        primaryZip: "",
        secondaryAddress: "",
        secondaryCity: "",
        secondaryLandmark: "",
        secondaryState: "",
        secondaryZip: "",
      },
    ]);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.headerRow}>
        <h3>Delivery Location Details</h3>
        <button className={styles.addButton} onClick={handleAddRow}>
          + Add Row
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Order No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Plan</th>
            <th>Effective Date</th>
            <th>Meals</th>
            <th>Change For</th>
            <th>Address Type</th>
            <th>Primary Address</th>
            <th>Primary City</th>
            <th>Primary Landmark</th>
            <th>Primary State</th>
            <th>Primary Zip</th>
            <th>Secondary Address</th>
            <th>Secondary City</th>
            <th>Secondary Landmark</th>
            <th>Secondary State</th>
            <th>Secondary Zip</th>
          </tr>
        </thead>

        <tbody>
          {formDataList.length > 0 ? (
            formDataList.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {Object.keys(data).map((field) => (
                  <td key={field}>
                    <input
                      type="text"
                      className={styles.inputField}
                      value={data[field]}
                      placeholder="-"
                      onChange={(e) =>
                        handleChange(index, field, e.target.value)
                      }
                    />
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="20" className={styles.noData}>
                No records yet. Click “Add Row” to begin.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryLocationTable;
