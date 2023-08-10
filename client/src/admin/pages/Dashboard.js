import React, {useEffect,useState} from 'react';
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
import { FaUserAlt } from 'react-icons/fa';
import { fetchSubscriberData } from '../utils/dataCollection/totalSubs';
import { fetchWeeklyView } from '../utils/dataCollection/weeklyViews';





const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [totalSubs, setTotalSubs] = useState(null);
  const [weeklyViews, setweeklyViews] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      navigate('/admin-dashboard/login');
    } 
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    fetchSubscriberData()
        .then(data => setTotalSubs(data))
        .catch(error => console.error('Error initializing component:', error));
}, []);

useEffect(() => {
  fetchWeeklyView()
      .then(data => setweeklyViews(data))
      .catch(error => console.error('Error initializing component:', error));
}, []);


  return (
    <div className='dashboard'>
      <div className="info">
        <h1>Dashboard</h1>
        <br/>
      </div>
      <div className="dash">
        <div className="box box1">
          <ChartBox {...totalSubs} />
        </div>
        <div className="box box2">
          <ChartBox {...weeklyViews} />
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
