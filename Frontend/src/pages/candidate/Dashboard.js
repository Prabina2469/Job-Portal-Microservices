import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getMyApplications, getMyInterviews } from '../../api/jobApi';
import Layout from '../../components/layout/Layout';
import { Loader } from '../../components/common/index.js';
import './Candidate.css';

export default function CandidateDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ applications: 0, interviews: 0, accepted: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getMyApplications(), getMyInterviews()])
      .then(([appRes, intRes]) => {
        const apps = appRes.data || [];
        const ints = intRes.data || [];
        setStats({
          applications: apps.length,
          interviews: ints.length,
          accepted: apps.filter(a => a.status === 'ACCEPTED').length,
          pending: apps.filter(a => a.status === 'APPLIED').length,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const quickLinks = [
    { label: 'Browse Jobs', path: '/candidate/jobs', icon: '💼', desc: 'Find new opportunities', color: 'blue' },
    { label: 'My Applications', path: '/candidate/applications', icon: '📋', desc: 'Track your applications', color: 'green' },
    { label: 'ATS Resume', path: '/candidate/resume', icon: '🤖', desc: 'Optimize your resume with AI', color: 'purple' },
    { label: 'My Interviews', path: '/candidate/interviews', icon: '📅', desc: 'View scheduled interviews', color: 'orange' },
  ];

  return (
    <Layout showSidebar={true} showFooter={false}>
      <div className="dashboard-page">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-greeting">
              Good {getTimeOfDay()}, {user?.username}! 👋
            </h1>
            <p className="dashboard-sub">Here's your job search overview</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/candidate/jobs')}
          >
            Browse Jobs →
          </button>
        </div>

        {/* Stats */}
        {loading ? <Loader /> : (
          <div className="stats-grid">
            <div className="stat-card stat-blue">
              <div className="stat-icon">📋</div>
              <div className="stat-val">{stats.applications}</div>
              <div className="stat-lbl">Total Applications</div>
            </div>
            <div className="stat-card stat-yellow">
              <div className="stat-icon">⏳</div>
              <div className="stat-val">{stats.pending}</div>
              <div className="stat-lbl">Pending Review</div>
            </div>
            <div className="stat-card stat-green">
              <div className="stat-icon">✅</div>
              <div className="stat-val">{stats.accepted}</div>
              <div className="stat-lbl">Accepted</div>
            </div>
            <div className="stat-card stat-purple">
              <div className="stat-icon">📅</div>
              <div className="stat-val">{stats.interviews}</div>
              <div className="stat-lbl">Interviews</div>
            </div>
          </div>
        )}

        {/* Quick links */}
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

        {/* Tips */}
        <div className="tip-banner">
          <span className="tip-icon">💡</span>
          <div>
            <strong>Pro tip:</strong> Use our ATS Resume Analyzer to boost your chances — candidates with 80%+ ATS scores get 3x more callbacks!
          </div>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => navigate('/candidate/resume')}
          >
            Try Now
          </button>
        </div>
      </div>
    </Layout>
  );
}

function getTimeOfDay() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}
