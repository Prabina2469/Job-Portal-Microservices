import { useNavigate } from 'react-router-dom';
import { JOB_CATEGORIES, TOP_COMPANIES } from '../../utils/constants';
import './Home.css';

export function Categories() {
  const navigate = useNavigate();
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Browse by Category</h2>
          <p className="section-sub">Explore thousands of jobs across all industries</p>
        </div>
        <div className="categories-grid">
          {JOB_CATEGORIES.map(cat => (
            <button
              key={cat.label}
              className="category-card"
              onClick={() => navigate(`/candidate/jobs?category=${encodeURIComponent(cat.label)}`)}
            >
              <span className="category-icon">{cat.icon}</span>
              <span className="category-label">{cat.label}</span>
              <span className="category-count">{cat.count} jobs</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TopCompanies() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Top Companies Hiring</h2>
          <p className="section-sub">Join the world's leading organizations</p>
        </div>
        <div className="companies-grid">
          {TOP_COMPANIES.map(co => (
            <div key={co.name} className="company-card card">
              <div className="company-logo">{co.logo}</div>
              <div className="company-name">{co.name}</div>
              <div className="company-jobs">{co.jobs} open roles</div>
              <button className="btn btn-outline btn-sm">View Jobs</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    { num: '01', icon: '👤', title: 'Create Account', desc: 'Sign up as a candidate or recruiter in under 2 minutes.' },
    { num: '02', icon: '🔍', title: 'Search & Apply', desc: 'Browse thousands of jobs and apply with one click.' },
    { num: '03', icon: '🤖', title: 'ATS Resume Check', desc: 'Optimize your resume using our AI-powered ATS analyzer.' },
    { num: '04', icon: '🎯', title: 'Get Hired', desc: 'Land your dream job with interview scheduling built in.' },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-sub">Get started in minutes with our simple process</p>
        </div>
        <div className="steps-grid">
          {steps.map((step, i) => (
            <div key={step.num} className="step-card">
              <div className="step-num">{step.num}</div>
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
              {i < steps.length - 1 && <div className="step-arrow">→</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
