import React, { useState, useMemo } from "react";
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

  /* ================= PAGINATION ================= */
  const [activePage, setActivePage] = useState(1);
  const rowsPerPage = 5;

  const filteredData = mealRows;

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (activePage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, activePage]);
  /* ================================================= */

  const handleAddRow = () => {
    setBlankRows(prev => [
      ...prev,
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
        <table className="dataTable">
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
            {paginatedData.length ? (
              paginatedData.map(([meal, data], index) => (
                <tr key={index}>
                  {index === 0 && (
                    <>
                      <td rowSpan={paginatedData.length}>{orderNo || "-"}</td>
                      <td rowSpan={paginatedData.length}>{name || "-"}</td>
                      <td rowSpan={paginatedData.length}>{email || "-"}</td>
                      <td rowSpan={paginatedData.length}>{phone || "-"}</td>
                      <td rowSpan={paginatedData.length}>{plan || "-"}</td>
                    </>
                  )}

                  <td>{meal}</td>
                  <td>{data.pause ? "Yes" : "No"}</td>
                  <td>{data.resume ? "Yes" : "No"}</td>
                  <td>{data.dates?.pause || "-"}</td>
                  <td>{data.dates?.resume || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="noData">
                  No meal data found
                </td>
              </tr>
            )}

            {/* Editable Blank Rows */}
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

      <button className="addRowBtn" onClick={handleAddRow}>
        + Add Row
      </button>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setActivePage(p => Math.max(p - 1, 1))}
            disabled={activePage === 1}
            className="arrow-btn"
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={activePage === i + 1 ? "active" : ""}
              onClick={() => setActivePage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setActivePage(p => Math.min(p + 1, totalPages))}
            disabled={activePage === totalPages}
            className="arrow-btn"
          >
            &gt;
          </button>
        </div>
      )}

      <div className="entriesInfo">
        Showing {paginatedData.length} of {filteredData.length} entries
      </div>
    </div>
  );
};

export default PauseResumeTable;
