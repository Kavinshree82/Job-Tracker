import { useState, useEffect } from 'react';

function JobForm({ onSubmit, editJob, onCancel }) {
  const [form, setForm] = useState({ company: '', position: '', status: 'Applied', deadline: '', notes: '' });

  useEffect(() => {
    if (editJob) {
      setForm({
        company: editJob.company,
        position: editJob.position,
        status: editJob.status,
        deadline: editJob.deadline ? editJob.deadline.split('T')[0] : '',
        notes: editJob.notes || ''
      });
    }
  }, [editJob]);

  const handleSubmit = () => {
    if (!form.company || !form.position) return alert('Company and Position are required');
    onSubmit(form);
    setForm({ company: '', position: '', status: 'Applied', deadline: '', notes: '' });
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>{editJob ? 'Edit Job' : 'Add New Job'}</h3>
      <input style={styles.input} placeholder="Company" value={form.company}
        onChange={e => setForm({ ...form, company: e.target.value })} />
      <input style={styles.input} placeholder="Position" value={form.position}
        onChange={e => setForm({ ...form, position: e.target.value })} />
      <select style={styles.input} value={form.status}
        onChange={e => setForm({ ...form, status: e.target.value })}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
      <input style={styles.input} type="date" value={form.deadline}
        onChange={e => setForm({ ...form, deadline: e.target.value })} />
      <textarea style={styles.input} placeholder="Notes" value={form.notes}
        onChange={e => setForm({ ...form, notes: e.target.value })} />
      <div style={styles.actions}>
        <button style={styles.submitBtn} onClick={handleSubmit}>{editJob ? 'Update' : 'Add Job'}</button>
        {editJob && <button style={styles.cancelBtn} onClick={onCancel}>Cancel</button>}
      </div>
    </div>
  );
}

const styles = {
  container: { background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '20px' },
  title: { margin: '0 0 15px 0', color: '#333' },
  input: { width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box', fontSize: '14px' },
  actions: { display: 'flex', gap: '10px' },
  submitBtn: { padding: '8px 20px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  cancelBtn: { padding: '8px 20px', background: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }
};

export default JobForm;