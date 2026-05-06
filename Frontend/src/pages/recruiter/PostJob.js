import { useState } from 'react';
import { createJob } from '../../api/jobApi';
import Layout from '../../components/layout/Layout';
import { JOB_TYPES } from '../../utils/constants';
import '../candidate/Candidate.css';
import './Recruiter.css';

export default function PostJob() {
  const [form, setForm] = useState({
    title: '', description: '', location: '', salary: '',
    requiredSkills: '', jobType: 'Full Time', experience: ''
  });
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: '', type: '' });
    try {
      await createJob(form);
      setMsg({ text: '🎉 Job posted successfully! Candidates will be notified.', type: 'success' });
      setForm({ title: '', description: '', location: '', salary: '', requiredSkills: '', jobType: 'Full Time', experience: '' });
    } catch (err) {
      setMsg({ text: err.response?.data?.message || 'Failed to post job. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout showSidebar={true} showFooter={false}>
      <div className="dashboard-page">
        <div className="dashboard-header">
          <div>
            <h2 className="dashboard-greeting">Post a New Job</h2>
            <p className="dashboard-sub">Fill in the details to attract the right candidates</p>
          </div>
        </div>

        {msg.text && (
          <div className={`alert alert-${msg.type === 'success' ? 'success' : 'error'}`}>{msg.text}</div>
        )}

        <div className="card" style={{ padding: 32 }}>
          <form onSubmit={handleSubmit}>
            <div className="recruiter-form-grid">
              <div className="form-group">
                <label className="form-label">Job Title *</label>
                <input
                  className="form-input"
                  placeholder="e.g. Senior React Developer"
                  value={form.title}
                  onChange={e => set('title', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Job Type</label>
                <select
                  className="form-input"
                  value={form.jobType}
                  onChange={e => set('jobType', e.target.value)}
                >
                  {JOB_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  className="form-input"
                  placeholder="e.g. Bengaluru / Remote"
                  value={form.location}
                  onChange={e => set('location', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Salary (₹ per year)</label>
                <input
                  className="form-input"
                  type="number"
                  placeholder="e.g. 1200000"
                  value={form.salary}
                  onChange={e => set('salary', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Experience Required</label>
                <input
                  className="form-input"
                  placeholder="e.g. 3-5 years"
                  value={form.experience}
                  onChange={e => set('experience', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Required Skills *</label>
                <input
                  className="form-input"
                  placeholder="react, typescript, node.js, aws"
                  value={form.requiredSkills}
                  onChange={e => set('requiredSkills', e.target.value)}
                  required
                />
              </div>

              <div className="form-group recruiter-form-full">
                <label className="form-label">Job Description *</label>
                <textarea
                  className="form-input"
                  placeholder="Describe the role, responsibilities, requirements, and benefits..."
                  rows={7}
                  value={form.description}
                  onChange={e => set('description', e.target.value)}
                  style={{ resize: 'vertical' }}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button
                type="submit"
                className="btn btn-secondary btn-lg"
                disabled={loading}
              >
                {loading ? 'Posting...' : '📢 Post Job'}
              </button>
              <button
                type="button"
                className="btn btn-outline btn-lg"
                onClick={() => setForm({ title: '', description: '', location: '', salary: '', requiredSkills: '', jobType: 'Full Time', experience: '' })}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
