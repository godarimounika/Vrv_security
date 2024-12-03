import React, { useState } from 'react';
import SideNavbar from './SideNavbar';
import { Routes, Route } from 'react-router-dom';
import RoleManagement from './RoleManagement';
import UserManagement from './UserManagement';
import "../App.css";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

function Dashboard() {
  const [isNavOpen, setIsNavOpen] = useState(false); // State for toggling the side navbar

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen); // Toggle the sidebar open/close
  };

  return (
    <div className="container-fluid border wrapper">
      <div className="row">
        {/* Sidebar on large screens */}
        <div className="d-none d-md-block col-md-3 p-0">
          <SideNavbar />
        </div>

        {/* Hamburger menu button on small screens */}
        <div className="d-md-none col-12 p-0">
        <button
  className="navbar-toggler position-fixed top-0 end-0 m-2 z-3"
  onClick={toggleNavbar}
  style={{
    backgroundColor: 'transparent',
    border: 'none',
    color: '#333',
    zIndex: 1050, // Ensure it stays above the sidebar
  }}
>
  {/* Toggling between the hamburger menu and close (X) icon */}
  {isNavOpen ? <CloseOutlinedIcon style={{ fontSize: '2rem', color: 'red' }} /> : <MenuOutlinedIcon style={{ fontSize: '2rem' }} />}
</button>

          {/* Conditional render of the sidebar for small screens */}
          <div
            className={`sideNavbar ${isNavOpen ? 'open' : ''} position-fixed top-0 start-0 h-100 bg-white`}
            style={{
              zIndex: 1050,
              width: '250px',
              transform: isNavOpen ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'transform 0.3s ease-in-out',
            }}
          >
            <SideNavbar />
       
          </div>
        </div>

        {/* Main content area */}
        <div className="col-12 col-md-9 p-0 mainContainer">
          <Routes>
            <Route path="/" element={<UserManagement />} />
            <Route path="/usermanagement" element={<UserManagement />} />
            <Route path="/rolemanagement" element={<RoleManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

