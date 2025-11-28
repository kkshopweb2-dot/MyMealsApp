import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "../css/DataTable.css";

const ComplaintTable = ({ data = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);

  const entriesPerPage = 10;

  const safeData = Array.isArray(data) ? data : [];

  const filteredData = safeData.filter(
    (item) =>
      item?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.orderNo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.issue?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const paginatedData = filteredData.slice(
    (activePage - 1) * entriesPerPage,
    activePage * entriesPerPage
  );

  useEffect(() => {
    setActivePage(1);
  }, [searchQuery]);

  return (
    <div className="tableCard">
      <h3 className="complaint-title" style={{ color: "black" }}>
        Complaint Summary
      </h3>

      {/* Search Bar */}
      <div className="tableSearch">
        <input
          type="text"
          placeholder="Search complaints..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FaSearch />
      </div>

      {/* Table */}
      <table className="tableWrapper">
        <thead>
          <tr>
            <th>Order No</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Meal</th>
            <th>Issue</th>
            <th>Date</th>
            <th>Image</th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, index) => (
              <tr key={index}>
                <td>{row.orderNo}</td>
                <td>{row.name}</td>
                <td>{row.phone}</td>
                <td>{row.meal}</td>
                <td>{row.issue}</td>
                <td>{row.date}</td>
                <td>
                  {row.image ? (
                    <img
                      src={row.image}
                      alt="complaint"
                      style={{ width: "50px", borderRadius: "6px" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="noData">
                No complaints found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ Pagination - now always visible if needed */}
      {totalPages >= 1 && (
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
            onClick={() => setActivePage((p) => Math.min(p + 1, totalPages))}
            disabled={activePage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}

      <div className="entriesInfo">
        Showing {paginatedData.length} of {filteredData.length} complaints
      </div>
    </div>
  );
};

export default ComplaintTable;
