import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './companyFormEdit.scss';
import fetchData from '../../utils/requests/fetchData';


const CompanyEditForm = () => {
    const [companyData, setCompanyData] = useState(null); 
    const [isToggleOn, setToggleOn] = useState(false);
    const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);

    const handleToggleForm = () => {
        setToggleOn((prevState) => !prevState);
    };

    const closeSuccessPopup = () => {
        setIsSuccessPopupVisible(false);
    };

    useEffect(() => {
        fetchData(process.env.REACT_APP_COMPANY_INFO)
            .then((result) => setCompanyData(result.data))
            .catch((error) => console.error('Error fetching data:', error)); 
    }, []);
    
      if (!companyData) {
        return <div>Loading...</div>;
      }

    const {
        // eslint-disable-next-line
        companyLogo,
        contact,
        about,
        mission,
        vision,
        // eslint-disable-next-line
        highlightCollection,
    } = companyData;
    
    // Check if the contact object is defined before accessing its properties
    const email = contact?.email || '';
    const landLineNumber = contact?.landLineNumber || '';
    const mobileNumber = contact?.mobileNumber || '';
    const website = contact?.website || '';
    const address = contact?.address || '';
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setCompanyData((prevCompany) => ({
        ...prevCompany,
        [name]: value,
        }));
        console.log(`handleChange`);
        console.log(companyData);
        console.log(`handleChange`);
    };
    
    const handleContactChange = (event) => {
        const { name, value } = event.target;
        setCompanyData((prevCompany) => ({
        ...prevCompany,
        contact: {
            ...prevCompany.contact,
            [name]: value,
        },
        }));
        console.log(`handleContactChange`);
        console.log(companyData);
        console.log(`handleContactChange`);
    };
    
    const handleLogoChange = (event) => {
        const file = event.target.files[0];
        setCompanyData((prevCompany) => ({
        ...prevCompany,
        companyLogo: file,
        }));
        console.log(`handleLogoChange`);
        console.log(companyData);
        console.log(`handleLogoChange`);
    };
    
    const handleHighlightCollectionChange = (event) => {
        const file = event.target.files[0];
        setCompanyData((prevCompany) => ({
        ...prevCompany,
        highlightCollection: file,
        })
        );
        console.log(`handleHighlightCollectionChange`);
        console.log(companyData);
        console.log(`handleHighlightCollectionChange`);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('about', companyData.about);
        formData.append('mission', companyData.mission);
        formData.append('vision', companyData.vision);
        formData.append('email', companyData.contact.email);
        formData.append('landLineNumber', companyData.contact.landLineNumber);
        formData.append('mobileNumber', companyData.contact.mobileNumber);
        formData.append('website', companyData.contact.website);
        formData.append('address', companyData.contact.address);
        formData.append('companyLogo', companyData.companyLogo);
        formData.append('highlightCollection', companyData.highlightCollection);
        
        console.log(...formData);
        // Send the updated company data to the backend API
        axios.put(process.env.REACT_APP_COMPANY_UPDATE, formData)
        .then((response) => {
            console.log('Company updated successfully:', response.data);
            setIsSuccessPopupVisible(true);
            setToggleOn(false);
            // Optionally, you can redirect to a success page or perform any other actions here
        })
        .catch((error) => {
            console.error('Error updating company data:', error);
        });
    };
    
    return (
        <div className='editCompany'>
            <button onClick={handleToggleForm}>Update Company Information</button>
            {isToggleOn && (
                <div className='container'>
                    <div className='form-container'>
                        <button className='close' onClick={handleToggleForm}>&times;</button>
                        <h1>Edit House of J's infomation</h1>
                        <form onSubmit={handleSubmit}>
                            <label>
                            Company Logo:
                            <input
                                type="file"
                                name="companyLogo"
                                onChange={handleLogoChange}
                                accept="image/*"
                            />
                            </label>
                            <br />
                            <label>
                            Contact Email:
                            <input
                                type="email"
                                name="email"
                                defaultValue={email}
                                onChange={handleContactChange}
                                required
                            />
                            </label>
                            <br />
                            <label>
                            Landline Number:
                            <input
                                type="text"
                                name="landLineNumber"
                                defaultValue={landLineNumber}
                                onChange={handleContactChange}
                            />
                            </label>
                            <br />
                            <label>
                            Mobile Number:
                            <input
                                type="text"
                                name="mobileNumber"
                                defaultValue={mobileNumber}
                                onChange={handleContactChange}
                            />
                            </label>
                            <br />
                            <label>
                            Website:
                            <input
                                type="text"
                                name="website"
                                defaultValue={website}
                                onChange={handleContactChange}
                            />
                            </label>
                            <label>
                            Address:
                            <input
                                type="text"
                                name="address"
                                defaultValue={address}
                                onChange={handleContactChange}
                            />
                            </label>
                            <br />
                            <label>
                            About:
                            <textarea
                                name="about"
                                defaultValue={about}
                                onChange={handleChange}
                                required
                            />
                            </label>
                            <br />
                            <label>
                            Mission:
                            <input
                                type="text"
                                name="mission"
                                defaultValue={mission}
                                onChange={handleChange}
                            />
                            </label>
                            <br />
                            <label>
                            Vision:
                            <input
                                type="text"
                                name="vision"
                                defaultValue={vision}
                                onChange={handleChange}
                            />
                            </label>
                            <br />
                            <label>
                            Highlight Image:
                            <input
                                type="file"
                                name="highlightCollection"
                                onChange={handleHighlightCollectionChange}
                                accept="image/*"
                            />
                            </label>
                            <button type="submit">Update Company</button>
                        </form>
                    </div>
                    <div className='background' onClick={handleToggleForm}>
                    </div>
                </div>
                
            )}
            {isSuccessPopupVisible && (
                <div className="success-popup">
                <p>Form submitted successfully!</p>
                <button onClick={closeSuccessPopup}>Close</button>
                </div>
            )}
        </div>
    );
}

export default CompanyEditForm;