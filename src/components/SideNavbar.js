import React from 'react'
import { NavLink } from 'react-router'
import "../App.css"

function SideNavbar() {
  return (
    <div className=' sideNavbar w-100 m-0 p-0'>
        <div className='logo d-flex justify-content-center '>
            <img className='w-50 h-50 mt-2 rounded animate-fadeIn '  src='/newlogo.png' alt='logo-img'/>

        </div>
      <ul className='list-group mt-5 p-5'>
        {/* <li className='list-group-items'>
            <NavLink to="/dashboard"  className="nav-link"  activeClassName ="active" >Dashboard</NavLink>

        </li> */}

        <li className='list-group-items  text-center p-3 animate-slideInLeft'>
            <NavLink to="/usermanagement"  className="nav-link fs-2 fw-bolder"  activeClassName ="active" >User</NavLink>

        </li>


        <li className='list-group-items  text-center p-3 animate-slideInLeft '>
            <NavLink to="/rolemanagement"  className="nav-link fs-2 fw-bolder"  activeClassName ="active" >Role</NavLink>

        </li>
      </ul>
   

<div className="d-flex justify-content-center align-items-center text-light fw-bolder p-5 m-5 animate-fadeUp mt-auto">
        <img
          src="/profile.png"
          className="profile-img rounded-circle my-5 p-2 hover-rotate"
          alt="profile icon"
        
        />
        <p className="my-3">Admin</p>
      </div>
    </div>
  )
}

export default SideNavbar


