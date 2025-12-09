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
      item?.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.order_no?.toLowerCase().includes(searchQuery.toLowerCase())
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
      <h3 className="tableTitle">
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
            <th>Name</th>
            <th>Phone</th>
            <th>Order No.</th>
            <th>Subject</th>
            <th>Description</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.phone}</td>
                <td>{row.order_no}</td>
                <td>{row.subject}</td>
                <td>{row.description}</td>
                <td>{new Date(row.created_at).toLocaleDateString()}</td>
                <td>{row.status}</td>
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
