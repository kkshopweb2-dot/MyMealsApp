import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import { FaSearch } from "react-icons/fa";
import "../css/DataTable.css"; // same CSS as your DataTable
import axios from "../../src/api/axios";

const DeliveryLocationTable = forwardRef(({ title }, ref) => {
  const [deliveryLocations, setDeliveryLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  const fetchDeliveryLocations = useCallback(
    async (page = 1, limit = entriesPerPage, search = debouncedSearchQuery) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `/delivery-locations?page=${page}&limit=${limit}&search=${search}`
        );
        setDeliveryLocations(response.data.data || []);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        setTotalEntries(response.data.total);
      } catch (err) {
        console.error("Failed to fetch delivery locations:", err);
        setError(
          err.response?.data?.error ||
            "Failed to fetch delivery locations. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    },
    [entriesPerPage, debouncedSearchQuery]
  );

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Fetch data when page, entries per page, or debounced search query changes
  useEffect(() => {
    // Only reset current page to 1 if debouncedSearchQuery actually changed
    if (debouncedSearchQuery) {
        setCurrentPage(1);
    }
    fetchDeliveryLocations(currentPage, entriesPerPage, debouncedSearchQuery);
  }, [currentPage, entriesPerPage, debouncedSearchQuery, fetchDeliveryLocations]);

  // Expose fetch function to parent component
  useImperativeHandle(ref, () => ({
    fetchDeliveryLocations: () =>
      fetchDeliveryLocations(1, entriesPerPage, debouncedSearchQuery),
  }));

  const handleEntriesPerPageChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when entries per page changes
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
      {/* Search Bar and Entries per page */}
      <div className="d-flex justify-content-between align-items-center mb-2">
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

      {/* Table */}
      <table className="tableWrapper">
        <thead>
          <tr>
            <th>Order No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Plan</th>
            <th>Address Line 1</th>
            <th>Address Line 2</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Is Default</th>
            <th>Created At</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="12" className="noData">
                Loading...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="12" className="noData" style={{ color: "red" }}>
                {error}
              </td>
            </tr>
          ) : deliveryLocations.length > 0 ? (
            deliveryLocations.map((row, index) => (
              <tr key={index}>
                <td>{row.order_no}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.phone}</td>
                <td>{row.plan}</td>
                <td>{row.address_line_1}</td>
                <td>{row.address_line_2}</td>
                <td>{row.city}</td>
                <td>{row.state}</td>
                <td>{row.zip_code}</td>
                <td>{row.is_default ? "Yes" : "No"}</td>
                <td>{new Date(row.created_at).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" className="noData">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
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

      {/* Entries Info */}
      <div className="entriesInfo">
        Showing {totalEntries === 0 ? 0 : startIndex + 1} to {endIndex} of{" "}
        {totalEntries}
      </div>
    </div>
  );
});

export default DeliveryLocationTable;
