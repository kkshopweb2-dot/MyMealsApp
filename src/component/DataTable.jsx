import React, { useState, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import "../css/DataTable.css";

const DataTable = ({ columns = [], data = [], title = "", defaultEntries = 10 }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(defaultEntries);

  // 🔍 Filter data based on all string values of columns
  const filteredData = useMemo(() => {
    return data.filter(row =>
      columns.some(col => {
        const value = row[col.accessor];
        return value?.toString().toLowerCase().includes(searchQuery.toLowerCase());
      })
    );
  }, [data, searchQuery, columns]);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage) || 1;
  const startIndex = (activePage - 1) * entriesPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + entriesPerPage);

  return (
    <div className="tableCard">
      {title && <h3 className="mb-4">{title}</h3>}

      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          Show
          <select
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setActivePage(1);
            }}
            className="entriesSelect"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          entries
        </div>

        <div className="tableSearch">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setActivePage(1);
            }}
          />
          <FaSearch />
        </div>
      </div>

      <div className="table-responsive">
        <table className="tableWrapper">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length ? (
              paginatedData.map((row, rIdx) => (
                <tr key={rIdx}>
                  {columns.map((col, cIdx) => (
                    <td key={cIdx}>
                      {col.render ? col.render(row[col.accessor], row) : row[col.accessor] || "-"}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="noData">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setActivePage(p => Math.max(p - 1, 1))} disabled={activePage === 1}>
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

        <button onClick={() => setActivePage(p => Math.min(p + 1, totalPages))} disabled={activePage === totalPages}>
          &gt;
        </button>
      </div>

      <div className="entriesInfo">
        Showing {paginatedData.length} of {filteredData.length} entries
      </div>
    </div>
  );
};

export default DataTable;
