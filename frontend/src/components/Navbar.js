import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>🗂 Job Tracker</h2>
      <div style={styles.right}>
        <span style={styles.name}>Hi, {user?.name}</span>
        <Link to="/analytics" style={styles.link}> Analytics</Link>
        <button style={styles.button} onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', background: '#0900ad', color: 'white' },
  logo: { margin: 0 },
  right: { display: 'flex', alignItems: 'center', gap: '15px' },
  name: { fontSize: '14px' },
  link: { color: 'white', textDecoration: 'none', fontSize: '14px' },
  button: { padding: '8px 16px', background: 'white', color: '#4f46e5', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }
};

export default Navbar;