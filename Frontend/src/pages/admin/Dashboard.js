import { useEffect, useState } from 'react';
import { getAllUsers, getStats } from '../../api/recruiterApi';
import { getJobs } from '../../api/jobApi';
import Layout from '../../components/layout/Layout';
import { Loader } from '../../components/common/index.js';
import './Admin.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, candidates: 0, recruiters: 0, jobs: 0 });
  const [loading, setLoading] = useState(true);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    Promise.all([getAllUsers(), getJobs()])
      .then(([usersRes, jobsRes]) => {
        const users = usersRes.data || [];
        const jobs = jobsRes.data || [];
        setStats({
          users: users.length,
          candidates: users.filter(u => u.role === 'CANDIDATE').length,
          recruiters: users.filter(u => u.role === 'RECRUITER').length,
          jobs: jobs.length,
        });
        setRecentUsers(users.slice(0, 5));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: 'Total Users', val: stats.users, icon: '👥', color: 'blue', bg: '#eff6ff', border: '#bfdbfe', text: '#1e40af' },
    { label: 'Candidates', val: stats.candidates, icon: '👤', color: 'green', bg: '#ecfdf5', border: '#a7f3d0', text: '#065f46' },
    { label: 'Recruiters', val: stats.recruiters, icon: '🏢', color: 'purple', bg: '#f5f3ff', border: '#ddd6fe', text: '#4c1d95' },
    { label: 'Job Listings', val: stats.jobs, icon: '💼', color: 'yellow', bg: '#fffbeb', border: '#fde68a', text: '#92400e' },
  ];

  return (
    <Layout showSidebar={true} showFooter={false}>
      <div className="dashboard-page">
        <div className="dashboard-header">
          <div>
            <h2 className="dashboard-greeting">Admin Dashboard</h2>
            <p className="dashboard-sub">System-wide overview and management</p>
          </div>
        </div>

        {loading ? <Loader /> : (
          <>
            <div className="stats-grid">
              {statCards.map(s => (
                <div key={s.label} style={{
                  background: s.bg, border: `1.5px solid ${s.border}`,
                  borderRadius: 'var(--radius-lg)', padding: '22px 20px',
                  display: 'flex', flexDirection: 'column', gap: 8
                }}>
                  <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: s.text, lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: s.text, opacity: 0.85 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Recent activity */}
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 16 }}>
                Recently Registered Users
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map(u => (
                      <tr key={u.id}>
                        <td>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-light)' }}>#{u.id}</span>
                        </td>
                        <td style={{ fontWeight: 600 }}>{u.username}</td>
                        <td style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>{u.email || '—'}</td>
                        <td>
                          <span className={`badge ${u.role === 'ADMIN' ? 'badge-red' : u.role === 'RECRUITER' ? 'badge-purple' : 'badge-blue'}`}>
                            {u.role}
                          </span>
                        </td>
                        <td>
                          <span className="badge badge-green">Active</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
