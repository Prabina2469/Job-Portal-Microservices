import { useEffect, useState } from 'react';
import { getJobs, deleteJob, updateJob } from '../../api/jobApi';
import Layout from '../../components/layout/Layout';
import { Loader, Modal } from '../../components/common/index.js';
import { formatSalary } from '../../utils/helpers';
import '../candidate/Candidate.css';
import './Recruiter.css';

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editJob, setEditJob] = useState(null);
  const [msg, setMsg] = useState('');
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    getJobs()
      .then(res => setJobs(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job? This cannot be undone.')) return;
    try {
      await deleteJob(id);
      setJobs(jobs => jobs.filter(j => j.id !== id));
      setMsg('Job deleted successfully.');
      setTimeout(() => setMsg(''), 3000);
    } catch {
      setMsg('Failed to delete job.');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateJob(editJob.id, editJob);
      setEditJob(null);
      load();
      setMsg('Job updated successfully.');
      setTimeout(() => setMsg(''), 3000);
    } catch {
      setMsg('Failed to update job.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout showSidebar={true} showFooter={false}>
      <div className="dashboard-page">
        <div className="dashboard-header">
          <div>
            <h2 className="dashboard-greeting">Manage Jobs</h2>
            <p className="dashboard-sub">{jobs.length} active listings</p>
          </div>
        </div>

        {msg && <div className="alert alert-success">{msg}</div>}

        {loading ? <Loader text="Loading jobs..." /> : jobs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: 16 }}>📭</div>
            <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>No jobs posted yet</p>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginTop: 6 }}>
              Post your first job to start receiving applications.
            </p>
          </div>
        ) : (
          <div className="manage-jobs-list">
            {jobs.map(job => (
              <div key={job.id} className="manage-job-card">
                <div className="manage-job-info">
                  <div className="manage-job-title">{job.title}</div>
                  <div className="manage-job-meta">
                    <span>📍 {job.location || 'Not specified'}</span>
                    <span>💰 {formatSalary(job.salary)}</span>
                    {job.jobType && <span>⏱ {job.jobType}</span>}
                    {job.requiredSkills && <span>🛠 {job.requiredSkills.split(',').slice(0, 3).join(', ')}</span>}
                  </div>
                </div>
                <div className="manage-job-actions">
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => setEditJob({ ...job })}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn btn-sm"
                    style={{ background: '#fee2e2', color: '#dc2626', border: '1.5px solid #fecaca' }}
                    onClick={() => handleDelete(job.id)}
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        <Modal open={!!editJob} onClose={() => setEditJob(null)} title="Edit Job">
          {editJob && (
            <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Job Title</label>
                <input className="form-input" value={editJob.title}
                  onChange={e => setEditJob(j => ({ ...j, title: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input className="form-input" value={editJob.location || ''}
                  onChange={e => setEditJob(j => ({ ...j, location: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Salary</label>
                <input className="form-input" type="number" value={editJob.salary || ''}
                  onChange={e => setEditJob(j => ({ ...j, salary: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Required Skills</label>
                <input className="form-input" value={editJob.requiredSkills || ''}
                  onChange={e => setEditJob(j => ({ ...j, requiredSkills: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-input" rows={4} value={editJob.description || ''}
                  onChange={e => setEditJob(j => ({ ...j, description: e.target.value }))}
                  style={{ resize: 'vertical' }} />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setEditJob(null)}>Cancel</button>
              </div>
            </form>
          )}
        </Modal>
      </div>
    </Layout>
  );
}
