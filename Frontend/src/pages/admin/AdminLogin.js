import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/authApi';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/layout/Layout';
import '../auth/Auth.css';
import './Admin.css';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await loginUser({ ...form, role: 'ADMIN' });
      if (res.data.role !== 'ADMIN') throw new Error('Not an admin account');
      login(res.data);
      navigate('/admin');
    } catch {
      setError('Invalid admin credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout showSidebar={false} showFooter={false}>
      <div className="auth-page">
        <div className="auth-card">
          <div className="admin-login-header">
            <div className="admin-shield">🛡️</div>
            <h1 className="auth-title">Admin Login</h1>
            <p className="auth-sub">Secure access for administrators only</p>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Admin Username</label>
              <input
                className="form-input"
                placeholder="admin"
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                placeholder="Admin password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-lg"
              style={{ width: '100%', background: '#0f172a', color: '#fff' }}
              disabled={loading}
            >
              {loading ? 'Authenticating...' : '🔐 Access Admin Panel'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
