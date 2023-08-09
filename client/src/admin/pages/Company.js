import React, { useState, useEffect } from 'react';
import useAuth from '../utils/useAuth';
import { useNavigate } from 'react-router-dom';
import CompanyEditForm from "../components/companyForms/companyFormEdit";
import '../../assets/styles/admin/Company.scss';


const Company = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [ companyData, setCompanyData ] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const logoURL = '/company/logo';
  const highlightURL = '/company/highlight';
  const companyInfo = '/company/info';

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      navigate('/admin-dashboard/login');
    } 

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    if(!companyData){
      fetch(companyInfo)
        .then(response => response.json())
        .then((data) => setCompanyData(data))
        .catch((error) => console.error("Error fetching data:", error)); 
    }
  }, [companyData, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="comp">
        <div className="info">
          <h1>Company Info</h1>
          <br/>
          <div>Fetching data...</div>
          <br/>
        </div>
      </div>
    );
  }

  const {
    contact,
    about,
    mission,
    vision,
  } = companyData;

  // Check if the contact object is defined before accessing its properties
  const email = contact?.email || "";
  const landLineNumber = contact?.landLineNumber || "";
  const mobileNumber = contact?.mobileNumber || "";
  const website = contact?.website || "";
  const address = contact?.address || "";

  return (
    <div className="comp">
      <div className="info">
        <h1>Company Info</h1>
        <br/>
        <div className="editFormToggle fade-in-2">
            <CompanyEditForm/>
        </div>
      </div>
      {isLoading ? <div>Loading...</div> : 
        <div className="company fade-in-2">
          <div className="view comp">
            <h1>House of J</h1>
            <img src={logoURL} alt='logo' className="fade-in-4"/>
            <br/>
            <h2>About:</h2>
            <br/>
            <p>{about}</p>
          </div>
          <div className="about view">
            <h2>Mission:</h2>
            <p>{mission}</p>
            <h2>Vision:</h2>
            <p>{vision}</p>
          </div>
          <div className="contactInfos view">
            <h2>Contact Information:</h2>
            <div>
              <h4>Email:</h4>
              <p>{email}</p>
            </div>
            <div>
              <h4>Landline Number:</h4>
              <p>{landLineNumber}</p>
            </div>
            <div>
              <h4>Mobile Number:</h4>
              <p>{mobileNumber}</p>
            </div>
            <div>
              <h4>Website:</h4>
              <p>{website}</p>
            </div>
            <div>
              <h4>Address:</h4>
              <p>{address}</p>
            </div>
          </div>
          
          
          <div className="highlight view">
            <h2>Highlight Image:</h2>
            <img src={highlightURL} alt='highlight' className="fade-in-4"/>
          </div>
        </div>
      }
    </div>
  );
};

export default Company;