import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../css/DataTable.css";

const UpdateContactTable = ({ rows, title }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);

  const entriesPerPage = 10;

  const filteredData = rows.filter(
    (item) =>
      (item.field_name &&
        item.field_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.old_value &&
        item.old_value.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.new_value &&
        item.new_value.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const paginatedData = filteredData.slice(
    (activePage - 1) * entriesPerPage,
    activePage * entriesPerPage
  );

  return (
    <div className="tableCard">
        <div className="tableCardHeader">
            <h2>{title}</h2>
        </div>
      {/* Search Bar */}
      <div className="tableSearch">
        <input
          type="text"
          placeholder="Search here..."
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
            <th>Field</th>
            <th>Old Value</th>
            <th>New Value</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, index) => (
              <tr key={index}>
                <td>{row.field_name}</td>
                <td>{row.old_value}</td>
                <td>{row.new_value}</td>
                <td>{row.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="noData">
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

export default UpdateContactTable;
