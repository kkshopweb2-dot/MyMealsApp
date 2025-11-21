import React, { useState } from "react";
import styles from "../../css/Changedeliverylocation.module.css";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { FaSearch } from "react-icons/fa";

import "../../css/dashboard.css";
import bgImage from "../../assets/images/bg.png";

import Step1BasicInfo from "./Step1BasicInfo";
import Step2EffectiveDate from "./Step2EffectiveDate";
import Step3Meals from "./Step3Meals";
import Step4ChangeFor from "./Step4ChangeFor";
import Step5Address from "./Step5Address";
import Step6Preview from "./Step6Preview";
import Step7ThankYou from "./Step7ThankYou";

// ================= TABLE COMPONENT =================
const DeliveryLocationTable = ({ rows }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const entriesPerPage = 10;

  const filteredData = rows.filter((item) =>
    `${item.orderNo} ${item.name} ${item.phone}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const paginatedData = filteredData.slice(
    (activePage - 1) * entriesPerPage,
    activePage * entriesPerPage
  );

  return (
    <div className="tableCard">
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
      <div className="tableResponsive">
        <table className="tableWrapper">
          <thead>
            <tr>
              <th>Order No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Plan</th>
              <th>Effective Date</th>
              <th>Meals</th>
              <th>Change For</th>
              <th>Address</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <tr key={index}>
                  <td>{row.orderNo || "-"}</td>
                  <td>{row.name || "-"}</td>
                  <td>{row.email || "-"}</td>
                  <td>{row.phone || "-"}</td>
                  <td>{row.plan || "-"}</td>
                  <td>{row.effectiveDate || "-"}</td>
                  <td>
                    {Array.isArray(row.meals)
                      ? row.meals.join(", ")
                      : "-"}
                  </td>
                  <td>{row.changeFor || "-"}</td>
                  <td>
                    {row.addressType === "primary"
                      ? `${row.primaryAddress}, ${row.primaryCity}, ${row.primaryState} - ${row.primaryZip}`
                      : `${row.secondaryAddress}, ${row.secondaryCity}, ${row.secondaryState} - ${row.secondaryZip}`}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="noData">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
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
      )}

      <div className="entriesInfo">
        Showing {paginatedData.length} of {filteredData.length} entries
      </div>
    </div>
  );
};

// ================= MAIN COMPONENT =================
const Changedeliverylocation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);

  const initialFormState = {
    orderNo: "",
    name: "",
    email: "",
    phone: "",
    plan: "",
    effectiveDate: "",
    meals: [],
    changeFor: "",
    addressType: "",
    primaryAddress: "",
    primaryCity: "",
    primaryLandmark: "",
    primaryState: "",
    primaryZip: "",
    secondaryAddress: "",
    secondaryCity: "",
    secondaryLandmark: "",
    secondaryState: "",
    secondaryZip: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "meals") {
      setFormData((prev) => ({
        ...prev,
        meals: checked
          ? [...prev.meals, value]
          : prev.meals.filter((m) => m !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setSubmittedData((prev) => [...prev, formData]);
    setStep(7);
  };

  const handleNewSubmission = () => {
    setFormData(initialFormState);
    setStep(1);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className={`dashboard-main ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main
          className="dashboard-content"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="empty-dashboard">
            <div className={styles.formTableWrapper}>
              <div className={styles.formContainer}>
                {step === 1 && (
                  <Step1BasicInfo {...{ formData, handleChange, confirmed, setConfirmed, nextStep }} />
                )}
                {step === 2 && (
                  <Step2EffectiveDate {...{ formData, handleChange, nextStep, prevStep }} />
                )}
                {step === 3 && (
                  <Step3Meals {...{ formData, handleChange, nextStep, prevStep }} />
                )}
                {step === 4 && (
                  <Step4ChangeFor {...{ formData, handleChange, nextStep, prevStep }} />
                )}
                {step === 5 && (
                  <Step5Address {...{ formData, handleChange, nextStep, prevStep }} />
                )}
                {step === 6 && (
                  <Step6Preview {...{ formData, handleSubmit, prevStep }} />
                )}
                {step === 7 && (
                  <Step7ThankYou handleNewSubmission={handleNewSubmission} />
                )}
              </div>

              <div className={styles.tableCard}>
                <DeliveryLocationTable rows={submittedData} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Changedeliverylocation;
