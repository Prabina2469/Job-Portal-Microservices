import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getJobs, getAllInterviews } from '../../api/jobApi';
import Layout from '../../components/layout/Layout';
import { Loader } from '../../components/common/index.js';
import './Recruiter.css';

export default function RecruiterDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ jobs: 0, interviews: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getJobs(), getAllInterviews()])
      .then(([jRes, iRes]) => {
        setStats({ jobs: (jRes.data || []).length, interviews: (iRes.data || []).length });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const quickLinks = [
    { label: 'Post a Job', path: '/recruiter/post-job', icon: '📝', desc: 'Create a new job listing', color: 'purple' },
    { label: 'Manage Jobs', path: '/recruiter/jobs', icon: '💼', desc: 'Edit or remove your listings', color: 'blue' },
    { label: 'View Candidates', path: '/recruiter/candidates', icon: '👥', desc: 'Accept or reject applicants', color: 'green' },
    { label: 'Schedule Interview', path: '/recruiter/interviews', icon: '📅', desc: 'Set up interview sessions', color: 'orange' },
  ];

  return (
    <Layout showSidebar={true} showFooter={false}>
      <div className="dashboard-page">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-greeting">Welcome, {user?.username}! 🏢</h1>
            <p className="dashboard-sub">Manage your recruitment pipeline</p>
          </div>
          <button className="btn btn-secondary" onClick={() => navigate('/recruiter/post-job')}>
            + Post a Job
          </button>
        </div>

        {loading ? <Loader /> : (
          <div className="stats-grid">
            <div className="stat-card stat-purple">
              <div className="stat-icon">💼</div>
              <div className="stat-val">{stats.jobs}</div>
              <div className="stat-lbl">Active Job Listings</div>
            </div>
            <div className="stat-card stat-blue">
              <div className="stat-icon">📅</div>
              <div className="stat-val">{stats.interviews}</div>
              <div className="stat-lbl">Interviews Scheduled</div>
            </div>
            <div className="stat-card stat-green">
              <div className="stat-icon">👥</div>
              <div className="stat-val">—</div>
              <div className="stat-lbl">Total Applicants</div>
            </div>
            <div className="stat-card stat-yellow">
              <div className="stat-icon">✅</div>
              <div className="stat-val">—</div>
              <div className="stat-lbl">Candidates Accepted</div>
            </div>
          </div>
        )}

        <div className="quick-links-title">Quick Actions</div>
        <div className="quick-links-grid">
          {quickLinks.map(link => (
            <button
              key={link.path}
              className={`quick-link-card ql-${link.color}`}
              onClick={() => navigate(link.path)}
            >
              <span className="ql-icon">{link.icon}</span>
              <span className="ql-label">{link.label}</span>
              <span className="ql-desc">{link.desc}</span>
              <span className="ql-arrow">→</span>
            </button>
          ))}
        </div>

        <div className="tip-banner" style={{ borderColor: '#ddd6fe', background: 'linear-gradient(135deg, #f5f3ff, #eff6ff)' }}>
          <span className="tip-icon">🔔</span>
          <div>
            <strong>Kafka Notifications:</strong> Candidates are notified in real-time when you post new jobs. Make sure your job descriptions are detailed and accurate.
          </div>
        </div>
      </div>
    </Layout>
  );
}
