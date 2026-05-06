import { useNavigate, useLocation } from 'react-router-dom';

export default function SelectRole() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const query = params.get('q');
  const jobLocation = params.get('location');

  const handleCandidate = () => {
    navigate(
      `/auth/register?role=CANDIDATE&q=${query}&location=${jobLocation}`
    );
  };

  const handleRecruiter = () => {
    navigate(
      `/auth/register?role=RECRUITER&q=${query}&location=${jobLocation}`
    );
  };

  return (
    <div className="select-role-page">
      <h1>Choose Your Role</h1>

      <div className="role-buttons">

        <button onClick={handleCandidate}>
          I'm a Candidate
        </button>

        <button onClick={handleRecruiter}>
          I'm a Recruiter
        </button>

      </div>
    </div>
  );
}