import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import bgImage from '../assets/images/bg.png';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';

const Abc = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (

    <div className="dashboard-layout" >
      {/* Sidebar */}
      < Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content */}
      <div className={`dashboard-main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Header 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          onLogout={handleLogout}
        />

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
