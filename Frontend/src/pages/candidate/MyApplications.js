import { useEffect, useState } from 'react';
import { getMyApplications } from '../../api/jobApi';
import Layout from '../../components/layout/Layout';
import { Loader } from '../../components/common/index.js';
import './Candidate.css';

const STATUS_CONFIG = {
  APPLIED:              { label: 'Applied',             cls: 'badge-blue',   icon: '📤' },
  ACCEPTED:             { label: 'Accepted',            cls: 'badge-green',  icon: '✅' },
  REJECTED:             { label: 'Rejected',            cls: 'badge-red',    icon: '❌' },
  INTERVIEW_SCHEDULED:  { label: 'Interview Scheduled', cls: 'badge-purple', icon: '📅' },
};

export default function MyApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    getMyApplications()
      .then(res => setApps(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statuses = ['ALL', 'APPLIED', 'ACCEPTED', 'REJECTED', 'INTERVIEW_SCHEDULED'];
  const filtered = filter === 'ALL' ? apps : apps.filter(a => a.status === filter);

  return (
    <Layout showSidebar={true} showFooter={false}>
      <div className="dashboard-page">
        <div className="dashboard-header">
          <div>
            <h2 className="dashboard-greeting">My Applications</h2>
            <p className="dashboard-sub">{apps.length} total applications</p>
          </div>
        </div>

        {/* Status filter tabs */}
        <div className="app-filter-tabs">
          {statuses.map(s => {
            const count = s === 'ALL' ? apps.length : apps.filter(a => a.status === s).length;
            return (
              <button
                key={s}
                className={`app-filter-tab ${filter === s ? 'active' : ''}`}
                onClick={() => setFilter(s)}
              >
                {s === 'ALL' ? 'All' : STATUS_CONFIG[s]?.label}
                <span className="tab-count">{count}</span>
              </button>
            );
          })}
        </div>

        {loading ? <Loader text="Loading applications..." /> : (
          filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <p className="empty-title">No applications found</p>
              <p className="empty-sub">
                {filter === 'ALL' ? "You haven't applied to any jobs yet." : `No applications with status "${STATUS_CONFIG[filter]?.label}".`}
              </p>
            </div>
          ) : (
            <div className="apps-list">
              {filtered.map(app => {
                const status = STATUS_CONFIG[app.status] || STATUS_CONFIG.APPLIED;
                return (
                  <div key={app.id} className="app-card card">
                    <div className="app-card-left">
                      <div className="app-job-icon">💼</div>
                      <div>
                        <div className="app-job-title">
                          {app.jobTitle || `Job #${app.jobId}`}
                        </div>
                        <div className="app-company">
                          {app.companyName || 'Company'} &middot; Applied as <strong>{app.username}</strong>
                        </div>
                        {app.appliedAt && (
                          <div className="app-date">Applied on {new Date(app.appliedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                        )}
                      </div>
                    </div>
                    <div className="app-card-right">
                      <span className={`badge ${status.cls}`}>
                        {status.icon} {status.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>

      <style>{`
        .app-filter-tabs { display: flex; gap: 6px; flex-wrap: wrap; }
        .app-filter-tab {
          display: flex; align-items: center; gap: 6px;
          padding: 8px 16px; border-radius: var(--radius-full);
          border: 1.5px solid var(--color-border);
          background: var(--color-white); font-size: 0.825rem; font-weight: 500;
          cursor: pointer; transition: all var(--transition); color: var(--color-text-secondary);
          font-family: var(--font-body);
        }
        .app-filter-tab:hover { border-color: var(--color-primary); color: var(--color-primary); }
        .app-filter-tab.active { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }
        .tab-count {
          background: rgba(0,0,0,0.1); border-radius: var(--radius-full);
          padding: 1px 7px; font-size: 0.72rem; font-weight: 700;
        }
        .apps-list { display: flex; flex-direction: column; gap: 12px; }
        .app-card { padding: 18px 22px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .app-card-left { display: flex; align-items: center; gap: 14px; }
        .app-job-icon {
          width: 44px; height: 44px; border-radius: var(--radius-md);
          background: var(--color-primary-light); display: flex; align-items: center;
          justify-content: center; font-size: 1.2rem; flex-shrink: 0;
        }
        .app-job-title { font-size: 0.95rem; font-weight: 700; font-family: var(--font-heading); margin-bottom: 2px; }
        .app-company { font-size: 0.8rem; color: var(--color-text-secondary); margin-bottom: 2px; }
        .app-date { font-size: 0.75rem; color: var(--color-text-light); }
        .empty-state { text-align: center; padding: 80px 24px; }
        .empty-icon { font-size: 3.5rem; margin-bottom: 16px; }
        .empty-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 6px; }
        .empty-sub { font-size: 0.875rem; color: var(--color-text-secondary); }
      `}</style>
    </Layout>
  );
}
