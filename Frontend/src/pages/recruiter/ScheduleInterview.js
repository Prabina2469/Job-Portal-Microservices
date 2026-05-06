import { useEffect, useState } from 'react';
import { scheduleInterview, getAllInterviews, getJobs } from '../../api/jobApi';
import Layout from '../../components/layout/Layout';
import { Loader } from '../../components/common/index.js';
import { formatDate } from '../../utils/helpers';
import '../candidate/Candidate.css';
import './Recruiter.css';

export default function ScheduleInterview() {
  const [form, setForm] = useState({
    candidateUsername: '', jobId: '', interviewDate: '', interviewerName: '', notes: ''
  });
  const [interviews, setInterviews] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const loadData = () => {
    setLoading(true);
    Promise.all([getAllInterviews(), getJobs()])
      .then(([iRes, jRes]) => {
        setInterviews(iRes.data || []);
        setJobs(jRes.data || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg({ text: '', type: '' });
    try {
      await scheduleInterview(form);
      setMsg({ text: '📅 Interview scheduled successfully! Candidate has been notified.', type: 'success' });
      setForm({ candidateUsername: '', jobId: '', interviewDate: '', interviewerName: '', notes: '' });
      loadData();
    } catch (err) {
      setMsg({ text: err.response?.data?.message || 'Failed to schedule interview.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const upcoming = interviews.filter(iv => new Date(iv.interviewDate) >= new Date());

  return (
    <Layout showSidebar={true} showFooter={false}>
      <div className="dashboard-page">
        <div className="dashboard-header">
          <div>
            <h2 className="dashboard-greeting">Schedule Interview</h2>
            <p className="dashboard-sub">Set up interview sessions with candidates</p>
          </div>
        </div>

        {msg.text && (
          <div className={`alert alert-${msg.type === 'success' ? 'success' : 'error'}`}>{msg.text}</div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* Form */}
          <div className="interview-schedule-form">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700 }}>New Interview</h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Candidate Username *</label>
                <input className="form-input" placeholder="candidate's username"
                  value={form.candidateUsername}
                  onChange={e => set('candidateUsername', e.target.value)} required />
              </div>

              <div className="form-group">
                <label className="form-label">Job Position *</label>
                <select className="form-input" value={form.jobId}
                  onChange={e => set('jobId', e.target.value)} required>
                  <option value="">Select a job...</option>
                  {jobs.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Interview Date & Time *</label>
                <input className="form-input" type="datetime-local"
                  value={form.interviewDate}
                  min={new Date().toISOString().slice(0, 16)}
                  onChange={e => set('interviewDate', e.target.value)} required />
              </div>

              <div className="form-group">
                <label className="form-label">Interviewer Name *</label>
                <input className="form-input" placeholder="e.g. Priya Sharma"
                  value={form.interviewerName}
                  onChange={e => set('interviewerName', e.target.value)} required />
              </div>

              <div className="form-group">
                <label className="form-label">Notes (optional)</label>
                <textarea className="form-input" rows={3} placeholder="Any instructions for the candidate..."
                  value={form.notes}
                  onChange={e => set('notes', e.target.value)}
                  style={{ resize: 'vertical' }} />
              </div>

              <button type="submit" className="btn btn-secondary btn-lg" disabled={submitting}>
                {submitting ? 'Scheduling...' : '📅 Schedule Interview'}
              </button>
            </form>
          </div>

          {/* Upcoming interviews */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 16 }}>
              Upcoming Interviews ({upcoming.length})
            </h3>
            {loading ? <Loader text="Loading..." /> : upcoming.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 24px', color: 'var(--color-text-secondary)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>📅</div>
                <p style={{ fontWeight: 600 }}>No upcoming interviews</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {upcoming.map(iv => (
                  <div key={iv.id} className="card" style={{ padding: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 4 }}>
                          {iv.candidateUsername || 'Candidate'}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                          📅 {iv.interviewDate ? new Date(iv.interviewDate).toLocaleString('en-IN', {
                            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                          }) : 'TBD'}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: 2 }}>
                          Interviewer: {iv.interviewerName}
                        </div>
                      </div>
                      <span className="badge badge-blue">Scheduled</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
