import React, {useEffect} from 'react';
import useAuth from '../utils/useAuth';
import { useNavigate } from 'react-router-dom';

const Subscribers = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      navigate('/admin-dashboard/login');
    } 
  }, [isAuthenticated, navigate]);
  return (
    <div>Subscribers</div>
  );
};

export default Subscribers;