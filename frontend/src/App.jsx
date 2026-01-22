// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './App.css';

// 1. Register Chart Components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const socket = io('http://localhost:5000');

function App() {
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState(null);

  const fetchData = () => {
    axios.get('http://localhost:5000/api/data')
      .then(res => {
        // Reverse array so the chart goes from Left (Old) -> Right (New)
        setData(res.data.reverse()); 
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchData();

    socket.on('system_alert', (alertData) => {
      setAlert(alertData.message);
      setTimeout(() => setAlert(null), 5000);
    });

    socket.on('data_update', () => {
      fetchData();
    });

    return () => {
      socket.off('system_alert');
      socket.off('data_update');
    };
  }, []);

  // 2. Prepare Data for the Chart
  const chartData = {
    labels: data.map(row => new Date(row.created_at).toLocaleTimeString()), // X-Axis (Time)
    datasets: [
      {
        label: 'Bitcoin Price (USD)',
        data: data.map(row => row.price), // Y-Axis (Price)
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3, // Makes line curvy
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Real-time Price Trend' },
    },
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '800px', margin: '0 auto' }}>
      <h1>📊 Automated Data Monitor</h1>
      
      {alert && (
        <div style={{ 
          backgroundColor: '#ffdddd', color: 'red', padding: '15px', 
          marginBottom: '20px', border: '1px solid red', borderRadius: '5px'
        }}>
          <strong>🚨 ALERT:</strong> {alert}
        </div>
      )}

      <p>Status: <span style={{color: 'green'}}>Active Monitoring</span></p>

      {/* 3. Render the Chart */}
      <div style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
        <Line options={chartOptions} data={chartData} />
      </div>
      
      <h3>Raw Data Log</h3>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f4f4f4' }}>
            <th>Time</th>
            <th>Item</th>
            <th>Value ($)</th>
          </tr>
        </thead>
        <tbody>
          {/* We reverse it back here to show newest at top for the table */}
          {[...data].reverse().map((row) => (
            <tr key={row.id}>
              <td>{new Date(row.created_at).toLocaleString()}</td>
              <td>{row.item}</td>
              <td>{row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;