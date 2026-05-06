import { useNavigate } from 'react-router-dom';
import { formatSalary, timeAgo, skillsToArray, truncate } from '../../utils/helpers';
import './Cards.css';

export default function JobCard({ job, onApply, applied = false, showApply = true }) {
  const navigate = useNavigate();
  const skills = skillsToArray(job.requiredSkills);

  return (
    <div className="job-card card" onClick={() => navigate && null}>
      <div className="job-card-header">
        <div className="company-logo-placeholder">
          {job.companyName ? job.companyName[0] : '🏢'}
        </div>
        <div className="job-meta">
          <h3 className="job-title">{job.title}</h3>
          <p className="job-company">{job.companyName || 'Company'}</p>
        </div>
        {job.isNew && <span className="badge badge-green new-badge">New</span>}
      </div>

      <div className="job-details">
        <span className="job-detail-item">
          <span>📍</span> {job.location || 'Remote'}
        </span>
        <span className="job-detail-item">
          <span>💰</span> {formatSalary(job.salary)}
        </span>
        {job.jobType && (
          <span className="job-detail-item">
            <span>⏱</span> {job.jobType}
          </span>
        )}
      </div>

      {job.description && (
        <p className="job-description">{truncate(job.description, 110)}</p>
      )}

      {skills.length > 0 && (
        <div className="job-skills">
          {skills.slice(0, 4).map(skill => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
          {skills.length > 4 && (
            <span className="skill-tag skill-tag-more">+{skills.length - 4}</span>
          )}
        </div>
      )}

      <div className="job-card-footer">
        <span className="job-posted">{timeAgo(job.createdAt) || 'Recently'}</span>
        {showApply && (
          <button
            className={`btn btn-sm ${applied ? 'btn-outline' : 'btn-primary'}`}
            onClick={(e) => { e.stopPropagation(); onApply && onApply(job.id); }}
            disabled={applied}
          >
            {applied ? '✓ Applied' : 'Apply Now'}
          </button>
        )}
      </div>
    </div>
  );
}
