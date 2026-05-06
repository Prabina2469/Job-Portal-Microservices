import { getInitials } from '../../utils/helpers';
import './Cards.css';

export default function CandidateCard({ candidate, onAccept, onReject }) {
  const statusMap = {
    APPLIED: { label: 'Applied', cls: 'badge-blue' },
    ACCEPTED: { label: 'Accepted', cls: 'badge-green' },
    REJECTED: { label: 'Rejected', cls: 'badge-red' },
    INTERVIEW_SCHEDULED: { label: 'Interview', cls: 'badge-purple' },
  };
  const status = statusMap[candidate.status] || statusMap.APPLIED;

  return (
    <div className="candidate-card card">
      <div className="candidate-header">
        <div className="candidate-avatar">{getInitials(candidate.username)}</div>
        <div className="candidate-info">
          <h4 className="candidate-name">{candidate.username}</h4>
          <span className={`badge ${status.cls}`}>{status.label}</span>
        </div>
        <div className="candidate-id">App #{candidate.id}</div>
      </div>

      {candidate.skills && (
        <p className="candidate-skills">
          <strong>Skills:</strong> {candidate.skills}
        </p>
      )}

      {candidate.status !== 'ACCEPTED' && candidate.status !== 'REJECTED' && (
        <div className="candidate-actions">
          <button
            className="btn btn-sm btn-primary"
            style={{ background: '#059669' }}
            onClick={() => onAccept && onAccept(candidate.id)}
          >
            ✓ Accept
          </button>
          <button
            className="btn btn-sm"
            style={{ background: '#dc2626', color: '#fff' }}
            onClick={() => onReject && onReject(candidate.id)}
          >
            ✗ Reject
          </button>
        </div>
      )}
    </div>
  );
}
