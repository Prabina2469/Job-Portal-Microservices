import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { registerUser, sendOTP } from '../../api/authApi';
import Layout from '../../components/layout/Layout';
import './Auth.css';

export default function Register() {
  const [params] = useSearchParams();
  const role = params.get('role') || 'CANDIDATE';
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const setField = (key, val) => {
    setForm(prev => ({ ...prev, [key]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔍 Validation
    if (!form.username || !form.email || !form.password) {
      setError('All fields are required.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setError('');

try {
  console.log("Step 1: Register");
  await registerUser(form);

  console.log("Step 2: Send OTP");
  await sendOTP(form.email);           // ✅ no need to check response status

  console.log("Step 3: Navigate");
  navigate('/auth/verify-otp', { 
     state: { 
    email: form.email,
    username: form.username,
    password: form.password,
    role: form.role
  } 
   }); // ✅ only ONE navigate

} catch (err) {
  console.log("ERROR:", err);
  let message = 'Registration failed. Please try again.';
  if (err.response?.data) {
    message = typeof err.response.data === 'string'
      ? err.response.data
      : err.response.data.message || message;
  } else if (err.message) {
    message = err.message;
  }
  setError(message);
} finally {
  setLoading(false);
}
  }

  const isCandidate = role === 'CANDIDATE';

  return (
    <Layout showSidebar={false} showFooter={false}>
      <div className="auth-page">
        <div className="auth-card">

          <div className={`auth-role-banner ${isCandidate ? 'blue' : 'purple'}`}>
            {isCandidate ? '👤 Candidate Registration' : '🏢 Recruiter Registration'}
          </div>

          <div className="auth-header">
            <h1>Create your account</h1>
            <p>
              Already have one?{' '}
              <Link to="/auth/login" className="auth-link">Sign in</Link>
            </p>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">

            {/* Username */}
            <div className="form-group">
              <label htmlFor="username">Full Name</label>
              <input
                id="username"
                name="username"
                type="text"
                className="form-input"
                value={form.username}
                onChange={e => setField('username', e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                value={form.email}
                onChange={e => setField('email', e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-input"
                value={form.password}
                onChange={e => setField('password', e.target.value)}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="form-input"
                value={form.confirmPassword}
                onChange={e => setField('confirmPassword', e.target.value)}
                required
              />
              {form.confirmPassword &&
                form.password !== form.confirmPassword && (
                  <span className="field-error">Passwords don't match</span>
              )}
            </div>

            <button
              type="submit"
              className={`btn btn-lg ${isCandidate ? 'btn-primary' : 'btn-secondary'}`}
              disabled={loading}
            >
              {loading ? 'Sending OTP...' : 'Send OTP & Continue →'}
            </button>

          </form>

          <div className="auth-switch">
            <span>Want to register as </span>
            <Link
              to={`/auth/register?role=${isCandidate ? 'RECRUITER' : 'CANDIDATE'}`}
              className="auth-link"
            >
              {isCandidate ? 'Recruiter' : 'Candidate'}
            </Link>
          </div>

        </div>
      </div>
    </Layout>
  );
}