import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "../css/DataTable.css"; // reuse same CSS used by your DataTable
import axios from "../../src/api/axios";

const MealPreferenceTable = ({ title }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [mealPreferences, setMealPreferences] = useState([]);

  useEffect(() => {
    const fetchMealPreferences = async () => {
      try {
        const response = await axios.get("/meal-preferences");
        setMealPreferences(response.data.data);
      } catch (error) {
        console.error("Failed to fetch meal preferences:", error);
      }
    };
    fetchMealPreferences();
  }, []);

  const entriesPerPage = 10;

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

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const paginatedData = filteredData.slice(
    (activePage - 1) * entriesPerPage,
    activePage * entriesPerPage
  );

  return (
    <div className="tableCard">
      {title && <h3 className="tableTitle">{title}</h3>}

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
            <th>Preference Details</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row) => (
              <tr
                key={row.id}
                className={row.isCurrent ? "currentPreferenceRow" : ""}
              >
                <td>{row.order_no}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.plan}</td>
                <td>{row.effectiveFrom}</td>
                <td>{row.meal_type}</td>
                <td>
                  {row.preference_details &&
                    Object.entries(JSON.parse(row.preference_details))
                      .map(([key, value]) => `${key}: ${value}`)
                      .join(", ")}
                </td>
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
