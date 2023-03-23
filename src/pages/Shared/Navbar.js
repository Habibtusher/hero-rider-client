import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GETUSER } from "../../api/ApiConstant";
import { getByEmail } from "../../api/CommonServices";


const Navbar = () => {
const [profile,setProfile] = useState()
const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")))



const getUser = async() => {
const res = await getByEmail(GETUSER,user.email)
setProfile(res.data)
}
useEffect(()=>{
  getUser()
},[user])
  const menuItems = (
    <>
  
     <li>
        <Link to="/profile">Profile</Link>
      </li>
    
   
      {
        profile?.is_admin && <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      }
      <label className="swap swap-rotate ml-2 mt-1">
       
     
        <svg
          className="swap-on fill-current w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>
      </label>
    </>
  );


  return (
    <div className="navbar bg-base-100">
      <div
        style={{
          width: "100%",
          justifyContent: "flex-start",
        }}
        className="navbar-start"
      >
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={1}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
         Hero Rider
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuItems}</ul>
      </div>
     
     
    </div>
  );
};

export default Navbar;
