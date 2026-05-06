import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getInitials } from '../../utils/helpers';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

const getDashboardPath = () => {
  const role = user?.role;

  if (!role) return '/auth/login';

  return `/${role.toLowerCase()}`;
};

  const navLinks = !user ? [
    { label: 'Jobs', to: '/jobs' },
    { label: 'Companies', to: '/companies' },
    { label: 'Services', to: '/services' },
  ] : user.role === 'CANDIDATE' ? [
    { label: 'Browse Jobs', to: '/candidate/jobs' },
    { label: 'Applications', to: '/candidate/applications' },
    { label: 'Interviews', to: '/candidate/interviews' },
    { label: 'ATS Resume', to: '/candidate/resume' },
  ] : user.role === 'RECRUITER' ? [
    { label: 'Post Job', to: '/recruiter/post-job' },
    { label: 'Manage Jobs', to: '/recruiter/jobs' },
    { label: 'Candidates', to: '/recruiter/candidates' },
    { label: 'Interviews', to: '/recruiter/interviews' },
  ] : [
    { label: 'Dashboard', to: '/admin' },
    { label: 'Users', to: '/admin/users' },
  ];

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">JP</span>
          <span className="logo-text">Job<span>Portal</span></span>
        </Link>

        {/* Desktop nav */}
        <nav className="navbar-links">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="navbar-right">
          {!user ? (
            <>
              <Link to="/auth/login" className="btn btn-outline btn-sm">Login</Link>
              <Link to="/auth/register" className="btn btn-primary btn-sm">Register</Link>
            </>
          ) : (
            <div className="avatar-wrap" ref={dropRef}>
              <button className="avatar-btn" onClick={() => setMenuOpen(o => !o)}>
                <div className="avatar">{getInitials(user.username)}</div>
                <div className="avatar-info">
                  <span className="avatar-name">{user.username}</span>
                  <span className="avatar-role">{user.role}</span>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>

              {menuOpen && (
                <div className="dropdown">
                  <Link to={getDashboardPath()} className="dropdown-item" onClick={() => setMenuOpen(false)}>
                    📊 Dashboard
                  </Link>
                  {user.role === 'CANDIDATE' && (
                    <>
                      <Link to="/candidate/applications" className="dropdown-item" onClick={() => setMenuOpen(false)}>📋 Applications</Link>
                      <Link to="/candidate/resume" className="dropdown-item" onClick={() => setMenuOpen(false)}>🤖 ATS Resume</Link>
                    </>
                  )}
                  <div className="dropdown-divider" />
                  <button className="dropdown-item danger" onClick={handleLogout}>
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile hamburger */}
          <button className="hamburger" onClick={() => setMobileOpen(o => !o)}>
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} className="mobile-link" onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
          {!user ? (
            <>
              <Link to="/auth/login" className="mobile-link" onClick={() => setMobileOpen(false)}>Login</Link>
              <Link to="/auth/register" className="mobile-link" onClick={() => setMobileOpen(false)}>Register</Link>
            </>
          ) : (
            <button className="mobile-link" onClick={handleLogout}>Logout</button>
          )}
        </div>
      )}
    </header>
  );
}
