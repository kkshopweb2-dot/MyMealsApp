import React from "react";
import "../css/RenewalPaymentTable.css";

const RenewalPaymentTable = () => {
  return (
    <div className="payment-table-container">
      <h3>Renewal Payment Summary</h3>

      <div className="table-scroll">
        <table className="payment-table">
        
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
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default RenewalPaymentTable;
