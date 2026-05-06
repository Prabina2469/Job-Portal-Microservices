import { useEffect, useState } from 'react';
import { getAllUsers, deleteUser, toggleUserBlock } from '../../api/recruiterApi';
import Layout from '../../components/layout/Layout';
import { Loader } from '../../components/common/index.js';
import { getInitials } from '../../utils/helpers';
import './Admin.css';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [msg, setMsg] = useState({ text: '', type: '' });

  const load = () => {
    setLoading(true);
    getAllUsers()
      .then(res => setUsers(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id, username) => {
    if (!window.confirm(`Delete user "${username}"? This is permanent.`)) return;
    try {
      await deleteUser(id);
      setUsers(u => u.filter(x => x.id !== id));
      setMsg({ text: `User "${username}" deleted.`, type: 'success' });
      setTimeout(() => setMsg({ text: '', type: '' }), 3000);
    } catch {
      setMsg({ text: 'Failed to delete user.', type: 'error' });
    }
  };

  const filtered = users.filter(u => {
    const matchRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchSearch = !search
      || u.username?.toLowerCase().includes(search.toLowerCase())
      || u.email?.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  return (
    <Layout showSidebar={true} showFooter={false}>
      <div className="dashboard-page">
        <div className="dashboard-header">
          <div>
            <h2 className="dashboard-greeting">Manage Users</h2>
            <p className="dashboard-sub">{users.length} total registered users</p>
          </div>
        </div>

        {msg.text && (
          <div className={`alert alert-${msg.type === 'success' ? 'success' : 'error'}`}>{msg.text}</div>
        )}

        {/* Filters */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <input
            className="form-input"
            style={{ maxWidth: 280 }}
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {['ALL', 'CANDIDATE', 'RECRUITER', 'ADMIN'].map(role => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`btn btn-sm ${roleFilter === role ? 'btn-primary' : 'btn-outline'}`}
            >
              {role === 'ALL' ? 'All Roles' : role}
            </button>
          ))}
        </div>

        {loading ? <Loader text="Loading users..." /> : (
          <div className="card" style={{ overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>ID</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-secondary)' }}>
                        No users found
                      </td>
                    </tr>
                  ) : filtered.map(u => (
                    <tr key={u.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            width: 34, height: 34, borderRadius: '50%',
                            background: u.role === 'ADMIN' ? 'linear-gradient(135deg,#dc2626,#f87171)'
                              : u.role === 'RECRUITER' ? 'linear-gradient(135deg,#7c3aed,#a78bfa)'
                              : 'linear-gradient(135deg,#1a56db,#60a5fa)',
                            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.7rem', fontWeight: 700, fontFamily: 'var(--font-heading)', flexShrink: 0
                          }}>
                            {getInitials(u.username)}
                          </div>
                          <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{u.username}</span>
                        </div>
                      </td>
                      <td style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>{u.email || '—'}</td>
                      <td>
                        <span className={`badge ${u.role === 'ADMIN' ? 'badge-red' : u.role === 'RECRUITER' ? 'badge-purple' : 'badge-blue'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
                          #{u.id}
                        </span>
                      </td>
                      <td>
                        {u.role !== 'ADMIN' && (
                          <button
                            onClick={() => handleDelete(u.id, u.username)}
                            style={{ background: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: 'var(--radius-sm)', padding: '4px 12px', fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 500 }}
                          >
                            🗑 Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
