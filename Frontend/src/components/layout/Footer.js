import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-icon">JP</span>
            <span className="logo-text">Job<span>Portal</span></span>
          </div>
          <p className="footer-tagline">India's #1 job search platform connecting talent with opportunity.</p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>For Candidates</h4>
            <Link to="/candidate/jobs">Browse Jobs</Link>
            <Link to="/candidate/resume">ATS Resume</Link>
            <Link to="/auth/register?role=CANDIDATE">Register</Link>
          </div>
          <div className="footer-col">
            <h4>For Recruiters</h4>
            <Link to="/recruiter/post-job">Post a Job</Link>
            <Link to="/recruiter/candidates">View Candidates</Link>
            <Link to="/auth/register?role=RECRUITER">Register</Link>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/admin/login">Admin Login</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} JobPortal. All rights reserved.</span>
      </div>
    </footer>
  );
}
