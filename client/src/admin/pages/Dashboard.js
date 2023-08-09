import React, {useEffect} from 'react';
import useAuth from '../utils/useAuth';
import { useNavigate } from 'react-router-dom';
import BarChartBox from "../components/barChartBox/BarChartBox";
import BigChartBox from "../components/bigChartBox/BigChartBox";
import ChartBox from "../components/chartBox/ChartBox";
import TopBox from "../components/topBox/TopBox";
import {
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from "../data";
import "../../assets/styles/admin/dashboard.scss";

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      navigate('/admin-dashboard/login');
    } 
  }, [isAuthenticated, navigate]);


  return (
    <div className='dashboard'>
      <div className="info">
        <h1>Dashboard</h1>
        <br/>
      </div>
      <div className="dash">
        <div className="box box1">
          <ChartBox {...chartBoxUser} />
        </div>
        <div className="box box2">
          <ChartBox {...chartBoxProduct} />
        </div>
        <div className="box box3">
          <TopBox />
        </div>
        <div className="box box4">
          <ChartBox {...chartBoxConversion} />
        </div>
        <div className="box box5">
          <ChartBox {...chartBoxRevenue} />
        </div>
        <div className="box box6">
          <BigChartBox />
        </div>
        <div className="box box7">
          <BarChartBox {...barChartBoxVisit} />
        </div>
      </div>
    </div>
    
  );
};

export default Dashboard;
