import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../css/DataTable.css";

const RenewalPaymentTable = ({
  data = [],
  title,
  page,
  totalPages,
  onPageChange,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="tableCard">
      {title && <h3 className="mb-4 tableTitle">{title}</h3>}

      {/* Search Bar */}
      <div className="tableSearch">
        <input
          type="text"
          placeholder="Search by Order No, Name, Phone or Transaction ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch} className="search-button">
          <FaSearch />
        </button>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="tableWrapper">
          <thead>
            <tr>
              <th>Order No</th>
              <th>Location</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Plan</th>
              <th>Renewal Month</th>
              <th>Amount Paid</th>
              <th>Transaction ID</th>
              <th>Payment Mode</th>
              <th>Delivery Boy Name</th>
              <th>Delivery Boy Phone</th>
              <th>Delivery Date</th>
              <th>Delivery Time</th>
              <th>Office Date</th>
              <th>Office Time</th>
              <th>Note</th>
              <th>Screenshot</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr key={index}>
                  <td>{row.orderNo}</td>
                  <td>{row.location}</td>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.phone}</td>
                  <td>{row.address}</td>
                  <td>{row.plan}</td>
                  <td>{row.renewalMonth}</td>
                  <td>{row.amountPaid}</td>
                  <td>{row.transactionId}</td>
                  <td>{row.paymentMode}</td>
                  <td>{row.deliveryBoyName}</td>
                  <td>{row.deliveryBoyPhone}</td>
                  <td>{row.deliveryDate}</td>
                  <td>{row.deliveryTime}</td>
                  <td>{row.officeDate}</td>
                  <td>{row.officeTime}</td>
                  <td>{row.note}</td>
                  <td>
                    {row.screenshotUrl ? (
                      <img
                        src={row.screenshotUrl}
                        alt="Screenshot"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    ) : row.screenshot instanceof File ? (
                      <img
                        src={URL.createObjectURL(row.screenshot)}
                        alt="Screenshot"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="19" className="noData">
                  No data available to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          &lt;
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={page === i + 1 ? "active" : ""}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
        >
          &gt;
        </button>
      </div>

      <div className="entriesInfo">
        Showing {data.length} of {totalPages * 10} entries
      </div>
    </div>
  );
};

export default RenewalPaymentTable;
