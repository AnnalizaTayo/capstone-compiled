import React, { useState, useEffect } from "react";
import useAuth from '../utils/useAuth';
import { useNavigate } from 'react-router-dom';
import DataTable from "../components/dataTable/DataTableUsers";
import "../../assets/styles/admin/collections.scss";
import Form from "../components/dynamicForm/Form";
import axios from "axios";
import { FiRefreshCcw } from 'react-icons/fi';

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "username",
    headerName: "Username",
    width: 100,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
  },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "role",
    headerName: "Role",
    width: 100,
  },
  {
    field: "accountCreationDate",
    headerName: "Creation Date",
    width: 150,
  },
];

const columns2 = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "username",
    headerName: "Username",
    width: 100,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
  },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "role",
    headerName: "Role",
    width: 100,
  },
  {
    field: "password",
    headerName: "Temporary Password",
    width: 100,
  }
];


const Employees = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState([]);
  const [isUpdate , setIsUpdate] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState('');
  const { isAuthenticated , userRole } = useAuth();
  const [isError, setError] = useState();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      navigate('/admin-dashboard/login');
    } 
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };
      
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/users`)
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error('Error fetching users:', error));
  },[]);

  const handleRefresh = async() => {
    fetch(`${process.env.REACT_APP_API}/users`)
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error('Error fetching users:', error));
  }

  const formattedUsers = data.map(user => ({
    id: user._id, // Use _id as id
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    accountCreationDate: new Date(user.accountCreationDate).toLocaleString(),
  }));

  const onDelete= async(userId) =>{
    try {
      // Send the delete request to the backend using axios
      console.log(userId);
      await axios.delete(`${process.env.REACT_APP_API}/users`, userId);
      setData((prevData) => prevData.filter((item) => item.id !== userId));
    } catch (error) {
      console.error("Failed to Delete", error);
    }
  }

  const onEditOne = async (userId) => {
    setError('');
    setIsUpdate(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/users/${userId}`);
      if (response.data) {
        setUser(response.data);
        // Set default form data based on the selected user's data
        const defaultData = {
          username: response.data.username,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          role: response.data.role,
        };
        
        setFormData(defaultData);
        setUserId(userId);
        setOpen(true);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(error.message || "An error occurred.");
    }
  };
/* 
  const onFormSubmitUpdate = async (e) => {
    e.preventDefault();
      console.log(`User TO BE UPDATED: ${userId}`);
      setUploading(true);
      // Prepare the form data to send to the backend
      const userData = new FormData();
      userData.append("username", formData.username);
      userData.append("email", formData.email);
      userData.append("password", formData.password);
      userData.append("role", formData.role);
      userData.append("firstName", formData.firstName);
      userData.append("lastName", formData.lastName);
      
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API}/users`, userData);
      // Handle the response as needed
      console.log('User updated:', response.data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
    setFormData({});
    setUploading(false);
    setOpen(false);
  };
 */
  

  const onFormSubmitAdd = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      // Prepare the form data to send to the backend
      

      setFormData(prevData => ({
        ...prevData,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        firstName: formData.firstName,
        lastName: formData.lastName,
      }));
      console.log(formData);
      const userData = new FormData();
      userData.append("username", formData.username);
      userData.append("email", formData.email);
      userData.append("password", formData.password);
      userData.append("role", formData.role);
      userData.append("firstName", formData.firstName);
      userData.append("lastName", formData.lastName);

      console.log('Form Data before submission:', userData);

      // Send the data to the backend using axios
      await axios.post(`${process.env.REACT_APP_API}/users`, formData);

      console.log('User added:', formData);
    } catch (error) {
      console.error('Error adding user:', error);
    }

      setFormData({});
      setUploading(false);
      setOpen(false);
  };

  const handleClickAdd = () => {
    setError('');
    setFormData({});
    setIsUpdate(false);
    setOpen(true);
  }

  return (
    <div className="pageContainer collections withTable">
      <div className="info">
        <h1>Employees</h1>
        <br/>
        <span>
          {(userRole === 'admin') && <button onClick={handleClickAdd}>Add New Employee</button>}
          <FiRefreshCcw onClick={handleRefresh}/>
        </span>
      </div>
      <DataTable slug="users" columns={columns} rows={formattedUsers} onDelete={onDelete} onEdit ={onEditOne}/>
      {open && <Form
        isError={isError}
        slug="user"
        columns={columns2}
        setOpen={setOpen}
        onFormSubmit={onFormSubmitAdd}
        handleChange={handleChange}
        formData={formData}
        uploading={uploading}
         />}
    </div>
  );
};

export default Employees;
