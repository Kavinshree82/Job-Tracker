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
const [selectedTag, setSelectedTag] = useState('');
const allTags = [...new Set(jobs.flatMap(job => job.tags || []))];

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
    console.log('Form data:', form); // add this line
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

 const filteredJobs = jobs.filter(job => {
  const matchesSearch = job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.position.toLowerCase().includes(search.toLowerCase());
  const matchesTag = selectedTag === '' || (job.tags && job.tags.includes(selectedTag));
  return matchesSearch && matchesTag;
});

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
        <div style={styles.tagFilter}>
          <span style={styles.tagFilterLabel}>Filter by tag:</span>
          <span
            style={{ ...styles.tagBtn, background: selectedTag === '' ? '#4f46e5' : '#e0e7ff', color: selectedTag === '' ? 'white' : '#4f46e5' }}
            onClick={() => setSelectedTag('')}
          >All</span>
          {allTags.map(tag => (
            <span
              key={tag}
              style={{ ...styles.tagBtn, background: selectedTag === tag ? '#4f46e5' : '#e0e7ff', color: selectedTag === tag ? 'white' : '#4f46e5' }}
              onClick={() => setSelectedTag(tag)}
            >{tag}</span>
          ))}
        </div>
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
  columnTitle: { margin: '0 0 15px 0', paddingBottom: '8px', color: '#333', fontSize: '16px' },
  tagFilter: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' },
tagFilterLabel: { fontSize: '14px', color: '#666' },
tagBtn: { padding: '4px 12px', borderRadius: '12px', fontSize: '13px', cursor: 'pointer', fontWeight: 'bold' }
};

export default Dashboard;