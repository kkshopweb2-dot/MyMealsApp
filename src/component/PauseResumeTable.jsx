import React, { useState } from "react";
import styles from "../css/PauseResumeTable.module.css";

const PauseResumeTable = ({ orderNo, name, email, phone, plan, meals = {} }) => {
  // Convert meal state into an array for easy rendering
  const mealRows = Object.entries(meals).filter(([meal, data]) => data.checked);

  // Local state for dynamic blank rows
  const [blankRows, setBlankRows] = useState([
    {
      orderNo: "",
      name: "",
      email: "",
      phone: "",
      plan: "",
      meal: "",
      pause: "",
      resume: "",
      pauseDate: "",
      resumeDate: "",
    },
  ]);

  // Add a new blank row
  const handleAddRow = () => {
    setBlankRows([
      ...blankRows,
      {
        orderNo: "",
        name: "",
        email: "",
        phone: "",
        plan: "",
        meal: "",
        pause: "",
        resume: "",
        pauseDate: "",
        resumeDate: "",
      },
    ]);
  };

  // Handle input change for blank rows
  const handleInputChange = (index, field, value) => {
    const updated = [...blankRows];
    updated[index][field] = value;
    setBlankRows(updated);
  };

  return (
    <div className={styles.tableContainer}>
      <h3 className={styles.tableTitle}>Pause / Resume Summary</h3>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Order No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Plan</th>
            <th>Meal</th>
            <th>Pause</th>
            <th>Resume</th>
            <th>Pause Date</th>
            <th>Resume Date</th>
          </tr>
        </thead>

        <tbody>
          {/* Existing meal rows */}
          {mealRows.length > 0 ? (
            mealRows.map(([meal, data], index) => (
              <tr key={index}>
                {index === 0 ? (
                  <>
                    <td rowSpan={mealRows.length}>{orderNo || "-"}</td>
                    <td rowSpan={mealRows.length}>{name || "-"}</td>
                    <td rowSpan={mealRows.length}>{email || "-"}</td>
                    <td rowSpan={mealRows.length}>{phone || "-"}</td>
                    <td rowSpan={mealRows.length}>{plan || "-"}</td>
                  </>
                ) : null}

                <td>{meal}</td>
                <td>{data.pause ? "Yes" : "No"}</td>
                <td>{data.resume ? "Yes" : "No"}</td>
                <td>{data.dates.pause || "-"}</td>
                <td>{data.dates.resume || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className={styles.noData}>
                No meal data found.
              </td>
            </tr>
          )}

          {/* Dynamic blank input rows */}
          {blankRows.map((row, index) => (
            <tr key={`blank-${index}`} className={styles.blankRow}>
              <td>
                <input
                  type="text"
                  placeholder="Enter Order No"
                  value={row.orderNo}
                  onChange={(e) => handleInputChange(index, "orderNo", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={row.name}
                  onChange={(e) => handleInputChange(index, "name", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={row.email}
                  onChange={(e) => handleInputChange(index, "email", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="tel"
                  placeholder="Enter Phone"
                  value={row.phone}
                  onChange={(e) => handleInputChange(index, "phone", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Plan"
                  value={row.plan}
                  onChange={(e) => handleInputChange(index, "plan", e.target.value)}
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
                  placeholder="Pause (Yes/No)"
                  value={row.pause}
                  onChange={(e) => handleInputChange(index, "pause", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Resume (Yes/No)"
                  value={row.resume}
                  onChange={(e) => handleInputChange(index, "resume", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={row.pauseDate}
                  onChange={(e) => handleInputChange(index, "pauseDate", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={row.resumeDate}
                  onChange={(e) => handleInputChange(index, "resumeDate", e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Row Button */}
      <button className={styles.addRowBtn} onClick={handleAddRow}>
        + Add Row
      </button>
    </div>
  );
};

export default PauseResumeTable;
