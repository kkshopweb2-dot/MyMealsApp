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

const MealPreferenceTable = forwardRef(({ title }, ref) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [mealPreferences, setMealPreferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const fetchMealPreferences = useCallback(
    async (page = 1, limit = entriesPerPage, search = debouncedSearchQuery) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `/meal-preferences?page=${page}&limit=${limit}&search=${search}`
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
    fetchMealPreferences(currentPage, entriesPerPage, debouncedSearchQuery);
  }, [
    currentPage,
    entriesPerPage,
    debouncedSearchQuery,
    fetchMealPreferences,
  ]);

  useImperativeHandle(ref, () => ({
    fetchMealPreferences: () =>
      fetchMealPreferences(1, entriesPerPage, debouncedSearchQuery),
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
        <div className="tableSearch">
          <input
            type="text"
            placeholder="Search meal preferences..."
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
          ) : mealPreferences.length > 0 ? (
            mealPreferences.map((row) => (
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
        {totalEntries}
      </div>
    </div>
  );
});

export default MealPreferenceTable;
