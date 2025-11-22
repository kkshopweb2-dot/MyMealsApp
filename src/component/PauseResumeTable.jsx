import React, { useState } from "react";
import "../css/DataTable.css";

const PauseResumeTable = ({ orderNo, name, email, phone, plan, meals = {} }) => {
  const mealRows = Object.entries(meals).filter(([meal, data]) => data.checked);

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

  const handleInputChange = (index, field, value) => {
    const updated = [...blankRows];
    updated[index][field] = value;
    setBlankRows(updated);
  };

  return (
    <div className="tableCard">
      <h3 className="tableTitle">Pause / Resume Summary</h3>

      <div className="tableWrapper">
        <table className="tableWrapper">
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
            {mealRows.length ? (
              mealRows.map(([meal, data], index) => (
                <tr key={index}>
                  {index === 0 && (
                    <>
                      <td rowSpan={mealRows.length}>{orderNo || "-"}</td>
                      <td rowSpan={mealRows.length}>{name || "-"}</td>
                      <td rowSpan={mealRows.length}>{email || "-"}</td>
                      <td rowSpan={mealRows.length}>{phone || "-"}</td>
                      <td rowSpan={mealRows.length}>{plan || "-"}</td>
                    </>
                  )}

                  <td>{meal}</td>
                  <td>{data.pause ? "Yes" : "No"}</td>
                  <td>{data.resume ? "Yes" : "No"}</td>
                  <td>{data.dates.pause || "-"}</td>
                  <td>{data.dates.resume || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="noData">
                  No meal data found
                </td>
              </tr>
            )}

            {blankRows.map((row, index) => (
              <tr key={index} className="blankRow">
                {Object.entries(row).map(([field, value]) => (
                  <td key={field}>
                    <input
                      type={field.includes("Date") ? "date" : "text"}
                      className="tableInput"
                      placeholder={field.replace(/([A-Z])/g, " $1")}
                      value={value}
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
    </div>
  );
};

export default PauseResumeTable;
