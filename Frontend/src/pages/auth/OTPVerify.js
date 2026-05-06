import { useState, useRef } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { verifyOTP, sendOTP } from '../../api/authApi';
import Layout from '../../components/layout/Layout';
import './Auth.css';

export default function OTPVerify() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const inputs = useRef([]);

  if (!state?.email) {
    return <Navigate to="/auth/register" replace />;
  }

  const handleChange = (i, val) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    if (val && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

const handleVerify = async () => {
  console.log("VERIFY CLICKED");

  const code = otp.join('');
  if (code.length < 6) {
    setError('Please enter the 6-digit OTP.');
    return;
  }

  // 🔍 Debug — check state has all data
  console.log("State:", state);

  setLoading(true);
  setError('');

  try {
    // ✅ Send ALL fields to backend
    await verifyOTP({
      email: state.email,
      otp: code,
      username: state.username,  // ✅ add
      password: state.password,  // ✅ add
      role: state.role           // ✅ add
    });

    navigate('/auth/login', { state: { verified: true } });

  } catch (err) {
    const msg =
      err.response?.data?.message ||
      err.response?.data ||
      'Invalid or expired OTP.';

    setError(msg);
    setOtp(['', '', '', '', '', '']);
    inputs.current[0]?.focus();

  } finally {
    setLoading(false);
  }
};

  const handleResend = async () => {
    try {
      await sendOTP(state.email);
      setResent(true);
      setTimeout(() => setResent(false), 30000);
    } catch {
      setError('Failed to resend OTP.');
    }
  };

  return (
    <Layout showSidebar={false} showFooter={false}>
      <div className="auth-page">
        <div className="auth-card" style={{ maxWidth: 440 }}>
          <div className="otp-icon">📧</div>
          <div className="auth-header">
            <h1 className="auth-title">Verify your email</h1>
            <p className="auth-sub">
              We sent a 6-digit code to<br />
              <strong>{state.email}</strong>
            </p>
          </div>

          {error && <div className="alert alert-error">{error}</div>}
          {resent && <div className="alert alert-success">OTP resent successfully!</div>}

          <form onSubmit={handleVerify} className="auth-form">
            <div className="otp-inputs">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={el => inputs.current[i] = el}
                  className="otp-box"
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleChange(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  onFocus={e => e.target.select()}
                />
              ))}
            </div>

<button
  type="button"   // 🔥 change THIS
  className="btn btn-primary btn-lg"
  style={{ width: '100%' }}
  disabled={loading || otp.join('').length < 6}
  onClick={handleVerify}   // 🔥 ADD THIS
>
  {loading ? 'Verifying...' : 'Verify & Continue →'}
</button>
          </form>

          <div className="auth-switch">
            Didn't receive the code?{' '}
            <button
              className="auth-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
              onClick={handleResend}
              disabled={resent}
            >
              {resent ? 'OTP Sent!' : 'Resend OTP'}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}