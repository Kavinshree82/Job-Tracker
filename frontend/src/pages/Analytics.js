import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, ArcElement, Tooltip, Legend, Title
} from 'chart.js';
import Navbar from '../components/Navbar';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title);

const STATUSES = ['Applied', 'Interview', 'Offer', 'Rejected'];
const COLORS = ['#4f46e5', '#f59e0b', '#10b981', '#ef4444'];

function Analytics() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get('/jobs', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setJobs(res.data);
    };
    fetch();
  }, []);

  const counts = STATUSES.map(s => jobs.filter(j => j.status === s).length);

  const barData = {
    labels: STATUSES,
    datasets: [{
      label: 'Applications',
      data: counts,
      backgroundColor: COLORS,
      borderRadius: 6
    }]
  };

  const pieData = {
    labels: STATUSES,
    datasets: [{
      data: counts,
      backgroundColor: COLORS
    }]
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.heading}>📊 Application Analytics</h2>
        <div style={styles.stats}>
          {STATUSES.map((s, i) => (
            <div key={s} style={{ ...styles.statCard, borderTop: `4px solid ${COLORS[i]}` }}>
              <h3 style={styles.statNumber}>{counts[i]}</h3>
              <p style={styles.statLabel}>{s}</p>
            </div>
          ))}
        </div>
        <div style={styles.charts}>
          <div style={styles.chartBox}>
            <h3 style={styles.chartTitle}>Applications by Status</h3>
            <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>
          <div style={styles.chartBox}>
            <h3 style={styles.chartTitle}>Status Distribution</h3>
            <Pie data={pieData} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#f0f2f5' },
  container: { padding: '20px 30px' },
  heading: { color: '#333', marginBottom: '20px' },
  stats: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '30px' },
  statCard: { background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center' },
  statNumber: { fontSize: '32px', margin: '0 0 5px 0', color: '#333' },
  statLabel: { margin: 0, color: '#666', fontSize: '14px' },
  charts: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  chartBox: { background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', maxHeight: '400px' },
  chartTitle: { margin: '0 0 15px 0', color: '#333' }
};

export default Analytics;