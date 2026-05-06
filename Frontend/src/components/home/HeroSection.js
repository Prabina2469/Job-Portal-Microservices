import { useNavigate } from 'react-router-dom';
import SearchBar from '../filters/SearchBar';
import './Home.css';

export default function HeroSection() {
  const navigate = useNavigate();

  const handleSearch = ({ query, location }) => {
    navigate(`/candidate/jobs?q=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`);
  };

  return (
    <section className="hero">
      <div className="hero-bg-pattern" />
      <div className="hero-content container">

        <div className="hero-badge">
          <span className="hero-badge-dot" />
          <span>10,000+ Jobs Added This Week</span>
        </div>

        <h1 className="hero-heading">
          Find Your <span className="hero-highlight">Dream Job</span><br />
          or Hire Top Talent
        </h1>

        <p className="hero-sub">
          India's fastest growing job platform. Connect with 50,000+ companies
          and 2M+ candidates across all industries.
        </p>

        <div className="hero-search">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="hero-tags">
          <span className="hero-tag-label">Popular:</span>
          {['React Developer', 'Data Analyst', 'UI/UX Designer', 'Java Backend', 'DevOps'].map(t => (
            <button
              key={t}
              className="hero-tag"
              onClick={() => handleSearch({ query: t, location: '' })}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Role selection cards
        <div className="hero-role-cards">
          <div className="hero-role-card candidate-card">
            <div className="role-icon">👤</div>
            <h3>I'm a Candidate</h3>
            <p>Looking for jobs</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/auth/register?role=CANDIDATE')}
            >
              Get Started
            </button>
          </div>

          <div className="hero-role-card recruiter-card">
            <div className="role-icon">🏢</div>
            <h3>I'm a Recruiter</h3>
            <p>Hiring talent</p>
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/auth/register?role=RECRUITER')}
            >
              Post Jobs
            </button>
          </div>
        </div> */}

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-number">2M+</span>
            <span className="stat-label">Candidates</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="stat-number">50K+</span>
            <span className="stat-label">Companies</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="stat-number">120K+</span>
            <span className="stat-label">Jobs Posted</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="stat-number">98%</span>
            <span className="stat-label">Satisfaction Rate</span>
          </div>
        </div>

        <button
          className="admin-login-link"
          onClick={() => navigate('/admin/login')}
        >
          Admin Login
        </button>

      </div>
    </section>
  );
}