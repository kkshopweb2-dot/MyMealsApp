import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import '../css/dashboard.css';
import bgImage from '../assets/images/bg.png'; 

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content */}
      <div className={`dashboard-main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main
          className="dashboard-content"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            padding: '20px',
            color: '#fff', 
          }}
        >
          <h1 className="dashboard-title">Welcome</h1>

          {/* Dashboard content */}
          <div className="empty-dashboard">
            <p></p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
