import { FaUserAlt } from 'react-icons/fa';


export const fetchWeeklyView = async() => {
    return fetch(process.env.REACT_APP_API + '/subs/total')
        .then(response => response.json())
        .then(data => {
            const dailyData = data.chartData; // Assuming this property holds your daily subscriber data
            const totalSubs = {
                color: "#8884d8",
                icon: <FaUserAlt />,
                title: "Views",
                number: data.totalWeeklySubs !== null ? data.totalWeeklySubs.toString() : "Loading...",
                dataKey: "subs",
                chartData: dailyData.map(dayData => ({
                    name: dayData.name, // Convert date to day name
                    subs: dayData.subs, // Assuming 'subscribers' is a property in your dailyData
                })),
            };
            return totalSubs;
        })
        .catch(error => {
            console.error('Error fetching subscriber data:', error);
            throw error;
        });
};

