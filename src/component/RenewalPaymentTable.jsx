import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../css/DataTable.css";

const RenewalPaymentTable = ({ data = [], title }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);

  const entriesPerPage = 10;

  // 🔍 Filter logic for multiple fields
  const filteredData = data.filter((item) =>
    item.orderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.transactionId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const paginatedData = filteredData.slice(
    (activePage - 1) * entriesPerPage,
    activePage * entriesPerPage
  );

  return (
    <div className="tableCard">
      {title && <h3 className="mb-4">{title}</h3>}

      {/* Search Bar */}
      <div className="tableSearch">
        <input
          type="text"
          placeholder="Search by Order No, Name, Phone or Transaction ID..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setActivePage(1);
          }}
        />
        <FaSearch />
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
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
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
                  <td>{row.screenshot ? row.screenshot.name : 'N/A'}</td>
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
          onClick={() => setActivePage((p) => Math.max(p - 1, 1))}
          disabled={activePage === 1}
          className="arrow-btn"
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
          className="arrow-btn"
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

export default RenewalPaymentTable;
