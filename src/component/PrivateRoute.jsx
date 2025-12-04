import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import bgImage from '../assets/images/bg.png';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Abc = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (

    <div className="dashboard-layout" >
      {/* Sidebar */}
      < Sidebar
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
        ><Outlet />
        </main>
      </div>
    </div >
  );
}

const PrivateRoute = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return isLoggedIn ? <Abc /> : <Navigate to="/login" />;
};

export default PrivateRoute;
