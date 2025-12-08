import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { FaSearch } from "react-icons/fa";
import "../css/DataTable.css";
import axios from "../../src/api/axios";

const MealPreferenceTable = forwardRef(({ title }, ref) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mealPreferences, setMealPreferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(10); // Added entriesPerPage state

  const fetchMealPreferences = async (page = 1, limit = entriesPerPage) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `/meal-preferences?page=${page}&limit=${limit}`
      );
      setMealPreferences(response.data.data || []);
      setCurrentPage(response.data.page);
      setTotalPages(response.data.totalPages);
      setTotalEntries(response.data.total);
    } catch (error) {
      console.error("Failed to fetch meal preferences:", error);
      setError(
        error.response?.data?.error ||
          "Failed to fetch meal preferences. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMealPreferences(currentPage, entriesPerPage);
  }, [currentPage, entriesPerPage]); // Added entriesPerPage to dependencies

  useImperativeHandle(ref, () => ({
    fetchMealPreferences: () => fetchMealPreferences(1, entriesPerPage), // Fetch first page with current limit
  }));

  const handleEntriesPerPageChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when entries per page changes
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredData = mealPreferences.filter(
    (item) =>
      (item.order_no &&
        item.order_no.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.name &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.email &&
        item.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.plan &&
        item.plan.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.meal_type &&
        item.meal_type.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderPreferenceDetails = (details) => {
    if (!details) return "N/A";
    try {
      const parsedDetails =
        typeof details === "string" ? JSON.parse(details) : details;
      return Object.entries(parsedDetails)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ");
    } catch (e) {
      console.error("Failed to parse preference details:", e);
      return "Invalid preference format";
    }
  };

  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, totalEntries);

  return (
    <div className="tableCard">
      <h3 className="tableTitle">{title || "Meal Preference History"}</h3>

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
            placeholder="Search meal preferences..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch />
        </div>
      </div>

      <table className="tableWrapper">
        <thead>
          <tr>
            <th>Order No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Plan</th>
            <th>Effective From</th>
            <th>Meal Type</th>
            <th>Preference Details</th>
            <th>Status</th>
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
          ) : filteredData.length > 0 ? (
            filteredData.map((row) => (
              <tr
                key={row.id}
                className={row.isCurrent ? "currentPreferenceRow" : ""}
              >
                <td>{row.order_no}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.plan}</td>
                <td>{row.effective_from}</td>
                <td>{row.meal_type}</td>
                <td>{renderPreferenceDetails(row.preference_details)}</td>
                <td className={row.isCurrent ? "currentPreferenceCell" : ""}>
                  {row.isCurrent ? "Current" : "Previous"}
                </td>
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

      {/* Pagination Controls */}
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

export default MealPreferenceTable;

