import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
  const [faviconUrl, setFaviconUrl] = useState('');
  const [isCacheData, setCacheData] = useState({});

  useEffect(() => {
    // Retrieve cacheData from localStorage
    const cacheDataString = localStorage.getItem('cacheData');
    
    // Check if cacheDataString is not null before parsing as JSON
    if (cacheDataString) {
      setCacheData(JSON.parse(cacheDataString));
    } else {
      // If no data in localStorage, set the cacheData state to an empty object
      setCacheData({});
    }

    setFaviconUrl(process.env.REACT_APP_COMPANY_FAVICON);
  }, []); // Only run the effect once, when the component mounts

  return (
    <div className="adminnavbar">
      <Link to="/" className="logo">
        <img src={faviconUrl} alt="logo" />
        <span><h1>House of J</h1></span>
      </Link>
      <div className="icons">
        <div className="user">
          <span>Hi {isCacheData.user ? isCacheData.user : 'User' } !</span>
        </div>
        <Link to="/company?activateToggle=true">
          <img src="/image/settings.svg" alt="" className="icon" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
