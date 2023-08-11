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
    field: "email",
    headerName: "Email",
    width: 150,
  },
  {
    field: "subscriptionDate",
    headerName: "Creation Date",
    width: 150,
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
      
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/subs`)
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error('Error fetching users:', error));
  },[]);

  const handleRefresh = async() => {
    fetch(`${process.env.REACT_APP_API}/subs`)
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error('Error fetching users:', error));
  }

  const formattedUsers = data.map(user => ({
    id: user._id,
    email: user.email,
    subscriptionDate: new Date(user.subscriptionDate).toLocaleString(),
  }));

  return (
    <div className="pageContainer collections withTable">
      <div className="info">
        <h1>Subscribers</h1>
        <br/>
        <span>
          <FiRefreshCcw onClick={handleRefresh}/>
        </span>
      </div>
      <DataTable slug="users" columns={columns} rows={formattedUsers} />
      
    </div>
  );
};

export default Employees;
