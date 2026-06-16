import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';
import JobForm from '../components/JobForm';

const STATUSES = ['Applied', 'Interview', 'Offer', 'Rejected'];

const STATUS_COLORS = {
  Applied: '#4f46e5',
  Interview: '#f59e0b',
  Offer: '#10b981',
  Rejected: '#ef4444'
};

function Dashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [editJob, setEditJob] = useState(null);
  const [search, setSearch] = useState('');

  const fetchJobs = async () => {
    try {
      const res = await axios.get('/jobs', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchJobs(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const handleAdd = async (form) => {
    try {
      await axios.post('/jobs', form, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (form) => {
    try {
      await axios.put(`/jobs/${editJob._id}`, form, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setEditJob(null);
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job?')) return;
    try {
      await axios.delete(`/jobs/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.position.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <JobForm
          onSubmit={editJob ? handleUpdate : handleAdd}
          editJob={editJob}
          onCancel={() => setEditJob(null)}
        />
        <input
          style={styles.search}
          placeholder="🔍 Search by company or position..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div style={styles.board}>
          {STATUSES.map(status => (
            <div key={status} style={styles.column}>
              <h3 style={{ ...styles.columnTitle, borderBottom: `3px solid ${STATUS_COLORS[status]}` }}>
                {status} ({filteredJobs.filter(j => j.status === status).length})
              </h3>
              {filteredJobs
                .filter(job => job.status === status)
                .map(job => (
                  <JobCard
                    key={job._id}
                    job={job}
                    onDelete={handleDelete}
                    onEdit={setEditJob}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#f0f2f5' },
  container: { padding: '20px 30px' },
  search: { width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box', fontSize: '14px' },
  board: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' },
  column: { background: '#f8f9fa', padding: '15px', borderRadius: '10px', minHeight: '400px' },
  columnTitle: { margin: '0 0 15px 0', paddingBottom: '8px', color: '#333', fontSize: '16px' }
};

export default Dashboard;