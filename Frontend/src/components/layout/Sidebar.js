import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getInitials } from '../../utils/helpers';
import './Sidebar.css';

const candidateNav = [
  { label: 'Dashboard', to: '/candidate', icon: '📊' },
  { label: 'Browse Jobs', to: '/candidate/jobs', icon: '💼' },
  { label: 'Applications', to: '/candidate/applications', icon: '📋' },
  { label: 'My Interviews', to: '/candidate/interviews', icon: '📅' },
  { label: 'ATS Resume', to: '/candidate/resume', icon: '🤖' },
];

const recruiterNav = [
  { label: 'Dashboard', to: '/recruiter', icon: '📊' },
  { label: 'Post a Job', to: '/recruiter/post-job', icon: '📝' },
  { label: 'Manage Jobs', to: '/recruiter/jobs', icon: '💼' },
  { label: 'View Candidates', to: '/recruiter/candidates', icon: '👥' },
  { label: 'Interviews', to: '/recruiter/interviews', icon: '📅' },
];

const adminNav = [
  { label: 'Dashboard', to: '/admin', icon: '📊' },
  { label: 'Manage Users', to: '/admin/users', icon: '👥' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const nav = user?.role === 'CANDIDATE' ? candidateNav
    : user?.role === 'RECRUITER' ? recruiterNav
    : adminNav;

  const roleColor = user?.role === 'RECRUITER' ? 'purple'
    : user?.role === 'ADMIN' ? 'red' : 'blue';

  return (
    <aside className={`sidebar sidebar-${roleColor}`}>
      {/* Profile */}
      <div className="sidebar-profile">
        <div className={`sidebar-avatar sidebar-avatar-${roleColor}`}>
          {getInitials(user?.username)}
        </div>
        <div className="sidebar-user-info">
          <span className="sidebar-username">{user?.username}</span>
          <span className={`badge badge-${roleColor === 'blue' ? 'blue' : roleColor === 'purple' ? 'purple' : 'red'}`}>
            {user?.role}
          </span>
        </div>
      </div>

      {/* Nav links */}
      <nav className="sidebar-nav">
        {nav.map(item => (
          <Link
            key={item.to}
            to={item.to}
            className={`sidebar-link ${location.pathname === item.to ? 'active' : ''}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="sidebar-bottom">
        <button className="sidebar-logout" onClick={logout}>
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
