import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../css/DataTable.css";

const FeedbackTable = ({ data = [] }) => {   // ✅ default empty array
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);

  const entriesPerPage = 10;

  // ✅ Safe filtering
  const filteredData = Array.isArray(data)
    ? data.filter((item) =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.orderNo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone?.includes(searchQuery)
    )
    : [];

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const paginatedData = filteredData.slice(
    (activePage - 1) * entriesPerPage,
    activePage * entriesPerPage
  );

  return (
    <div className="tableCard">
      <h2
        className="tableTitle"
        style={{ color: "#000", fontWeight: "600", marginBottom: "10px" }}
      >
        Feedback Data Table
      </h2>


      {/* Search */}
      <div className="tableSearch">
        <input
          type="text"
          placeholder="Search by name, order no or phone..."
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
            <th>Plan</th>
            <th>Food</th>
            <th>Delivery</th>
            <th>Management</th>
            <th>Feedback</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, index) => (
              <tr key={index}>
                <td>{row.orderNo}</td>
                <td>{row.name}</td>
                <td>{row.phone}</td>
                <td>{row.plan}</td>
                <td>{row.food}</td>
                <td>{row.delivery}</td>
                <td>{row.management}</td>
                <td>{row.feedback}</td>
                <td>{row.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="noData">
                No feedback found
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
          onClick={() => setActivePage((p) => Math.min(p + 1, totalPages))}
          disabled={activePage === totalPages || totalPages === 0}
        >
          &gt;
        </button>
      </div>

      <div className="entriesInfo">
        Showing {paginatedData.length} of {filteredData.length} entries
      </div>
    </div>
  );
};

export default FeedbackTable;
