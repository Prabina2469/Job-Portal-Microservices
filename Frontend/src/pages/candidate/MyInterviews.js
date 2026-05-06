import { useEffect, useState } from 'react';
import { getMyInterviews } from '../../api/jobApi';
import Layout from '../../components/layout/Layout';
import { Loader } from '../../components/common/index.js';
import { formatDate } from '../../utils/helpers';

export default function MyInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyInterviews()
      .then(res => setInterviews(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const upcoming = interviews.filter(iv => new Date(iv.interviewDate) >= new Date());
  const past = interviews.filter(iv => new Date(iv.interviewDate) < new Date());

  return (
    <Layout showSidebar={true} showFooter={false}>
      <div className="dashboard-page">
        <div className="dashboard-header">
          <div>
            <h2 className="dashboard-greeting">My Interviews</h2>
            <p className="dashboard-sub">{interviews.length} total interviews</p>
          </div>
        </div>

        {loading ? <Loader text="Loading interviews..." /> : interviews.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: 16 }}>📅</div>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 6 }}>No interviews yet</p>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              Keep applying! Interviews will appear here once scheduled by recruiters.
            </p>
          </div>
        ) : (
          <>
            {upcoming.length > 0 && (
              <div>
                <h3 className="section-group-title">🔜 Upcoming</h3>
                <div className="interview-list">
                  {upcoming.map(iv => <InterviewCard key={iv.id} iv={iv} upcoming />)}
                </div>
              </div>
            )}
            {past.length > 0 && (
              <div>
                <h3 className="section-group-title">📁 Past Interviews</h3>
                <div className="interview-list">
                  {past.map(iv => <InterviewCard key={iv.id} iv={iv} />)}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        .section-group-title {
          font-family: var(--font-heading); font-size: 1rem; font-weight: 700;
          color: var(--color-text-secondary); text-transform: uppercase;
          letter-spacing: 0.06em; margin-bottom: 12px;
        }
        .interview-list { display: flex; flex-direction: column; gap: 14px; margin-bottom: 28px; }
        .interview-card {
          background: var(--color-white); border-radius: var(--radius-lg);
          border: 1.5px solid var(--color-border); padding: 20px 24px;
          display: grid; grid-template-columns: auto 1fr auto; gap: 16px; align-items: start;
          transition: all var(--transition-slow);
        }
        .interview-card:hover { box-shadow: var(--shadow-card-hover); border-color: #c7d8ff; }
        .interview-card.upcoming { border-left: 4px solid var(--color-primary); }
        .iv-date-box {
          background: var(--color-primary-light); border-radius: var(--radius-md);
          padding: 12px 16px; text-align: center; min-width: 64px;
        }
        .iv-date-day { font-size: 1.5rem; font-weight: 800; font-family: var(--font-heading); color: var(--color-primary); line-height: 1; }
        .iv-date-mon { font-size: 0.7rem; font-weight: 600; color: var(--color-primary); text-transform: uppercase; }
        .iv-info { display: flex; flex-direction: column; gap: 4px; }
        .iv-interviewer { font-size: 1rem; font-weight: 700; font-family: var(--font-heading); }
        .iv-meta { font-size: 0.8rem; color: var(--color-text-secondary); }
        .iv-feedback {
          margin-top: 8px; padding: 10px 14px; background: var(--color-primary-light);
          border-radius: var(--radius-sm); font-size: 0.825rem; color: var(--color-primary);
          font-style: italic;
        }
      `}</style>
    </Layout>
  );
}

function InterviewCard({ iv, upcoming }) {
  const date = iv.interviewDate ? new Date(iv.interviewDate) : null;
  const day = date ? date.getDate() : '–';
  const mon = date ? date.toLocaleString('en', { month: 'short' }) : '';

  return (
    <div className={`interview-card ${upcoming ? 'upcoming' : ''}`}>
      <div className="iv-date-box">
        <div className="iv-date-day">{day}</div>
        <div className="iv-date-mon">{mon}</div>
      </div>
      <div className="iv-info">
        <div className="iv-interviewer">Interviewer: {iv.interviewerName || 'TBD'}</div>
        <div className="iv-meta">
          {date && `${date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} · `}
          Status: <strong>{iv.status || 'Scheduled'}</strong>
        </div>
        {iv.feedback && (
          <div className="iv-feedback">💬 Feedback: {iv.feedback}</div>
        )}
      </div>
      <div>
        <span className={`badge ${upcoming ? 'badge-blue' : 'badge-purple'}`}>
          {upcoming ? '🔜 Upcoming' : '✓ Completed'}
        </span>
      </div>
    </div>
  );
}
