import { useState } from 'react';
import { JOB_TYPES, EXPERIENCE_LEVELS } from '../../utils/constants';
import './Filters.css';

export default function JobFilter({ onFilter }) {
  const [filters, setFilters] = useState({
    jobType: [],
    experience: '',
    minSalary: '',
    maxSalary: '',
  });

  const toggleJobType = (type) => {
    const updated = filters.jobType.includes(type)
      ? filters.jobType.filter(t => t !== type)
      : [...filters.jobType, type];
    const newFilters = { ...filters, jobType: updated };
    setFilters(newFilters);
    onFilter && onFilter(newFilters);
  };

  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter && onFilter(newFilters);
  };

  return (
    <aside className="job-filter">
      <h3 className="filter-title">Filter Jobs</h3>

      <div className="filter-section">
        <h4 className="filter-section-title">Job Type</h4>
        <div className="filter-options">
          {JOB_TYPES.map(type => (
            <label key={type} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.jobType.includes(type)}
                onChange={() => toggleJobType(type)}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4 className="filter-section-title">Experience Level</h4>
        <div className="filter-options">
          {EXPERIENCE_LEVELS.map(level => (
            <label key={level} className="filter-radio">
              <input
                type="radio"
                name="experience"
                checked={filters.experience === level}
                onChange={() => handleChange('experience', level)}
              />
              <span>{level}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4 className="filter-section-title">Salary Range (₹/year)</h4>
        <div className="salary-inputs">
          <input
            type="number"
            className="form-input"
            placeholder="Min"
            value={filters.minSalary}
            onChange={e => handleChange('minSalary', e.target.value)}
          />
          <span className="salary-to">to</span>
          <input
            type="number"
            className="form-input"
            placeholder="Max"
            value={filters.maxSalary}
            onChange={e => handleChange('maxSalary', e.target.value)}
          />
        </div>
      </div>

      <button
        className="btn btn-outline"
        style={{ width: '100%' }}
        onClick={() => {
          const reset = { jobType: [], experience: '', minSalary: '', maxSalary: '' };
          setFilters(reset);
          onFilter && onFilter(reset);
        }}
      >
        Clear Filters
      </button>
    </aside>
  );
}
