function JobCard({ job, onDelete, onEdit }) {
  const deadlineDate = job.deadline ? new Date(job.deadline) : null;
  const isOverdue = deadlineDate && deadlineDate < new Date();

  return (
    <div style={styles.card}>
      <h4 style={styles.position}>{job.position}</h4>
      <p style={styles.company}>{job.company}</p>
      {deadlineDate && (
        <p style={{ ...styles.deadline, color: isOverdue ? 'red' : '#666' }}>
          📅 {deadlineDate.toLocaleDateString()}
          {isOverdue && ' ⚠️ Overdue'}
        </p>
      )}
      {job.notes && <p style={styles.notes}>{job.notes}</p>}
      {job.tags && job.tags.length > 0 && (
      <div style={styles.tags}>
        {job.tags.map((tag, i) => (
          <span key={i} style={styles.tag}>{tag}</span>
        ))}
      </div>
      )}
      <div style={styles.actions}>
        <button style={styles.editBtn} onClick={() => onEdit(job)}>Edit</button>
        <button style={styles.deleteBtn} onClick={() => onDelete(job._id)}>Delete</button>
      </div>
    </div>
  );
}

const styles = {
  card: { background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)', marginBottom: '10px' },
  position: { margin: '0 0 5px 0', color: '#333' },
  company: { margin: '0 0 5px 0', color: '#666', fontSize: '14px' },
  deadline: { fontSize: '12px', margin: '0 0 5px 0' },
  notes: { fontSize: '12px', color: '#888', margin: '0 0 10px 0' },
  actions: { display: 'flex', gap: '8px' },
  editBtn: { padding: '4px 10px', background: '#6445d5', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },
  deleteBtn: { padding: '4px 10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },
  tags: { display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '8px' },
tag: { background: '#e0e7ff', color: '#6445d5', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }
};

export default JobCard;