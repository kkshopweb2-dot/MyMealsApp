import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import { FaSearch } from "react-icons/fa";
import "../css/DataTable.css";
import axios from "../../src/api/axios";

const UpdateContactTable = forwardRef(({ title }, ref) => {
  const [contactUpdates, setContactUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  const fetchContactUpdates = useCallback(
    async (page = 1, limit = entriesPerPage, search = debouncedSearchQuery) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `/user-contact-updates?page=${page}&limit=${limit}&search=${search}`
        );
        setContactUpdates(response.data.data || []);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        setTotalEntries(response.data.total);
      } catch (err) {
        console.error("Failed to fetch contact updates:", err);
        setError(
          err.response?.data?.error ||
            "Failed to fetch contact updates. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    },
    [entriesPerPage, debouncedSearchQuery]
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedSearchQuery) {
      setCurrentPage(1);
    }
    fetchContactUpdates(currentPage, entriesPerPage, debouncedSearchQuery);
  }, [
    currentPage,
    entriesPerPage,
    debouncedSearchQuery,
    fetchContactUpdates,
  ]);

  useImperativeHandle(ref, () => ({
    fetchContactUpdates: () =>
      fetchContactUpdates(1, entriesPerPage, debouncedSearchQuery),
  }));

  const handleEntriesPerPageChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    setDebouncedSearchQuery(searchQuery);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, totalEntries);

  return (
    <div className="tableCard">
      <div className="tableCardHeader">
        <h2 className="tableTitle">{title}</h2>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          Show
          <select
            value={entriesPerPage}
            onChange={handleEntriesPerPageChange}
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
            placeholder="Search here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <FaSearch onClick={handleSearch} style={{ cursor: "pointer" }} />
        </div>
      </div>

      <table className="tableWrapper">
        <thead>
          <tr>
            <th>Order No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Plan</th>
            <th>Old Phone</th>
            <th>New Phone</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="8" className="noData">
                Loading...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="8" className="noData" style={{ color: "red" }}>
                {error}
              </td>
            </tr>
          ) : contactUpdates.length > 0 ? (
            contactUpdates.map((row, index) => (
              <tr key={index}>
                <td>{row.order_no}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.plan}</td>
                <td>{row.old_value}</td>
                <td>{row.new_value}</td>
                <td>{row.status}</td>
                <td>{new Date(row.created_at).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="noData">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>

      <div className="entriesInfo">
        Showing {totalEntries === 0 ? 0 : startIndex + 1} to {endIndex} of{" "}
        {totalEntries} entries
      </div>
    </div>
  );
});

export default UpdateContactTable;
