import { useState } from 'react';
import { analyzeResume } from '../../api/jobApi';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/layout/Layout';
import { skillsToArray } from '../../utils/helpers';

export default function ResumeATS() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    candidateName: user?.username || '',
    email: user?.email || '',
    jobTitle: '',
    skills: '',
    requiredSkills: '',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!form.skills || !form.requiredSkills) {
      setError('Please enter both your skills and the required skills.');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await analyzeResume(form);
      setResult(res.data);
    } catch {
      setError('Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = result
    ? result.atsScore >= 70 ? '#059669'
    : result.atsScore >= 40 ? '#d97706'
    : '#dc2626'
    : '#1a56db';

  const scoreLabel = result
    ? result.atsScore >= 70 ? 'Strong Match ✅'
    : result.atsScore >= 40 ? 'Moderate Match ⚠️'
    : 'Weak Match ❌'
    : '';

  return (
    <Layout showSidebar={true} showFooter={false}>
      <div className="dashboard-page">
        <div className="dashboard-header">
          <div>
            <h2 className="dashboard-greeting">🤖 ATS Resume Analyzer</h2>
            <p className="dashboard-sub">Check how well your resume matches a job's requirements</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: 24 }}>
          {/* Form */}
          <div className="card" style={{ padding: 28 }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 20 }}>
              Enter Details
            </h3>

            {error && <div className="alert alert-error">{error}</div>}

            <form onSubmit={handleAnalyze} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div className="form-group">
                <label className="form-label">Job Title You're Applying For</label>
                <input
                  className="form-input"
                  placeholder="e.g. Senior React Developer"
                  value={form.jobTitle}
                  onChange={e => set('jobTitle', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Your Skills</label>
                <textarea
                  className="form-input"
                  placeholder="e.g. react, javascript, css, node.js, mongodb"
                  value={form.skills}
                  onChange={e => set('skills', e.target.value)}
                  rows={4}
                  style={{ resize: 'vertical' }}
                  required
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginTop: 4 }}>
                  Comma-separated list of your skills
                </span>
              </div>

              <div className="form-group">
                <label className="form-label">Job Required Skills</label>
                <textarea
                  className="form-input"
                  placeholder="e.g. react, typescript, aws, kubernetes, docker"
                  value={form.requiredSkills}
                  onChange={e => set('requiredSkills', e.target.value)}
                  rows={4}
                  style={{ resize: 'vertical' }}
                  required
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginTop: 4 }}>
                  Copy from the job description
                </span>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={loading}
                style={{ width: '100%' }}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                    <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                    Analyzing...
                  </span>
                ) : '🔍 Analyze My Resume'}
              </button>
            </form>
          </div>

          {/* Results */}
          {result && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Score Card */}
              <div className="card" style={{ padding: 28, textAlign: 'center' }}>
                <div style={{
                  width: 120, height: 120, borderRadius: '50%',
                  background: `conic-gradient(${scoreColor} ${result.atsScore * 3.6}deg, #e5e7eb 0)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px',
                  boxShadow: `0 0 0 8px ${scoreColor}22`
                }}>
                  <div style={{
                    width: 96, height: 96, borderRadius: '50%',
                    background: '#fff', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '1.75rem', fontWeight: 800, color: scoreColor, fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
                      {result.atsScore}%
                    </span>
                    <span style={{ fontSize: '0.6rem', color: 'var(--color-text-secondary)', marginTop: 2 }}>ATS Score</span>
                  </div>
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: scoreColor }}>{scoreLabel}</div>
                <p style={{ fontSize: '0.825rem', color: 'var(--color-text-secondary)', marginTop: 8 }}>
                  {result.atsScore >= 70
                    ? 'Great! Your resume is highly compatible.'
                    : result.atsScore >= 40
                    ? 'Close! A few more skills could boost your chances.'
                    : 'Needs improvement. Consider adding more matching skills.'}
                </p>
              </div>

              {/* Matched Skills */}
              <div className="card" style={{ padding: 20 }}>
                <h4 style={{ fontWeight: 700, marginBottom: 12, color: '#059669' }}>✅ Matched Skills</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {skillsToArray(result.matchedSkills).length > 0
                    ? skillsToArray(result.matchedSkills).map(s => (
                      <span key={s} style={{ padding: '4px 12px', background: '#ecfdf5', color: '#065f46', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 600, border: '1px solid #a7f3d0' }}>
                        {s}
                      </span>
                    ))
                    : <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>No matches found</span>
                  }
                </div>
              </div>

              {/* Missing Skills */}
              <div className="card" style={{ padding: 20 }}>
                <h4 style={{ fontWeight: 700, marginBottom: 12, color: '#dc2626' }}>❌ Missing Skills</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {skillsToArray(result.missingSkills).length > 0
                    ? skillsToArray(result.missingSkills).map(s => (
                      <span key={s} style={{ padding: '4px 12px', background: '#fef2f2', color: '#991b1b', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 600, border: '1px solid #fecaca' }}>
                        {s}
                      </span>
                    ))
                    : <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>🎉 No missing skills!</span>
                  }
                </div>
              </div>

              {/* Tips */}
              {result.atsScore < 70 && (
                <div className="card" style={{ padding: 20, background: '#fffbeb', borderColor: '#fde68a' }}>
                  <h4 style={{ fontWeight: 700, marginBottom: 8, color: '#92400e' }}>💡 Tips to Improve</h4>
                  <ul style={{ paddingLeft: 16, fontSize: '0.825rem', color: '#78350f', lineHeight: 1.8 }}>
                    <li>Add missing skills to your resume if you have experience with them</li>
                    <li>Use keywords directly from the job description</li>
                    <li>Quantify achievements with numbers and metrics</li>
                    <li>Tailor your resume for each specific job application</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
