import { useEffect, useState } from 'react';
import { getJobs, getApplicationsByJob, updateApplicationStatus } from '../../api/jobApi';
import Layout from '../../components/layout/Layout';
import CandidateCard from '../../components/cards/CandidateCard';
import { Loader } from '../../components/common/index.js';
import '../candidate/Candidate.css';

export default function ViewCandidates() {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [msg, setMsg] = useState({ text: '', type: '' });

  useEffect(() => {
    getJobs()
      .then(res => setJobs(res.data || []))
      .catch(() => {})
      .finally(() => setJobsLoading(false));
  }, []);

  const loadCandidates = async (jobId) => {
    if (!jobId) return;
    setSelectedJobId(jobId);
    setLoading(true);
    try {
      const res = await getApplicationsByJob(jobId);
      setCandidates(res.data || []);
    } catch {
      setMsg({ text: 'Failed to load candidates.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await updateApplicationStatus(id, status);
      setCandidates(c => c.map(app => app.id === id ? { ...app, status } : app));
      setMsg({ text: `Application ${status.toLowerCase()} successfully.`, type: 'success' });
      setTimeout(() => setMsg({ text: '', type: '' }), 3000);
    } catch {
      setMsg({ text: 'Failed to update status.', type: 'error' });
    }
  };

  const selectedJob = jobs.find(j => String(j.id) === String(selectedJobId));
  const total = candidates.length;
  const accepted = candidates.filter(c => c.status === 'ACCEPTED').length;
  const rejected = candidates.filter(c => c.status === 'REJECTED').length;
  const pending = candidates.filter(c => c.status === 'APPLIED').length;

  return (
    <Layout showSidebar={true} showFooter={false}>
      <div className="dashboard-page">
        <div className="dashboard-header">
          <div>
            <h2 className="dashboard-greeting">View Candidates</h2>
            <p className="dashboard-sub">Review and manage applicants for your job listings</p>
          </div>
        </div>

        {/* Job selector */}
        <div className="card" style={{ padding: 20 }}>
          <div className="form-group">
            <label className="form-label">Select a Job to View Applicants</label>
            {jobsLoading ? (
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Loading jobs...</p>
            ) : (
              <select
                className="form-input"
                value={selectedJobId}
                onChange={e => loadCandidates(e.target.value)}
              >
                <option value="">— Choose a job listing —</option>
                {jobs.map(job => (
                  <option key={job.id} value={job.id}>
                    {job.title} {job.location ? `(${job.location})` : ''}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {msg.text && (
          <div className={`alert alert-${msg.type === 'success' ? 'success' : 'error'}`}>{msg.text}</div>
        )}

        {selectedJobId && (
          <>
            {/* Stats strip */}
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { label: 'Total', val: total, color: '#1e40af', bg: '#eff6ff', border: '#bfdbfe' },
                { label: 'Pending', val: pending, color: '#92400e', bg: '#fffbeb', border: '#fde68a' },
                { label: 'Accepted', val: accepted, color: '#065f46', bg: '#ecfdf5', border: '#a7f3d0' },
                { label: 'Rejected', val: rejected, color: '#991b1b', bg: '#fef2f2', border: '#fecaca' },
              ].map(s => (
                <div key={s.label} style={{
                  flex: 1, background: s.bg, border: `1.5px solid ${s.border}`,
                  borderRadius: 'var(--radius-md)', padding: '12px 16px', textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: s.color, fontFamily: 'var(--font-heading)' }}>{s.val}</div>
                  <div style={{ fontSize: '0.75rem', color: s.color, fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {loading ? (
              <Loader text="Loading candidates..." />
            ) : candidates.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 24px' }}>
                <div style={{ fontSize: '3rem', marginBottom: 12 }}>👥</div>
                <p style={{ fontWeight: 700 }}>No applicants yet</p>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginTop: 4 }}>
                  Share your job listing to attract candidates.
                </p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
                {candidates.map(c => (
                  <CandidateCard
                    key={c.id}
                    candidate={c}
                    onAccept={(id) => handleStatus(id, 'ACCEPTED')}
                    onReject={(id) => handleStatus(id, 'REJECTED')}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
