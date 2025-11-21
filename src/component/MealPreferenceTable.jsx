import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../css/DataTable.css"; // reuse same CSS used by your DataTable

const MealPreferenceTable = ({ rows }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);

  const entriesPerPage = 10;

  const filteredData = rows.filter((item) =>
    item.orderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.plan.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.mealType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const paginatedData = filteredData.slice(
    (activePage - 1) * entriesPerPage,
    activePage * entriesPerPage
  );

  return (
    <div className="tableCard">

      {/* Search Bar */}
      <div className="tableSearch">
        <input
          type="text"
          placeholder="Search meal preferences..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setActivePage(1);
          }}
        />
        <FaSearch />
      </div>

      {/* Table */}
      <table className="tableWrapper">
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
          {paginatedData.length > 0 ? (
            paginatedData.map((row, index) => (
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
              <td colSpan="6" className="noData">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setActivePage((p) => Math.max(p - 1, 1))}
          disabled={activePage === 1}
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
          onClick={() =>
            setActivePage((p) => Math.min(p + 1, totalPages))
          }
          disabled={activePage === totalPages}
        >
          &gt;
        </button>
      </div>

      {/* Entries Info */}
      <div className="entriesInfo">
        Showing {paginatedData.length} of {filteredData.length} entries
      </div>
    </div>
  );
};

export default MealPreferenceTable;
