import { Routes, Route, Navigate } from 'react-router-dom';


// Pages
import Home from '../pages/home/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import OTPVerify from '../pages/auth/OTPVerify';
import AdminLogin from '../pages/admin/AdminLogin';
import NotFound from '../pages/errors/NotFound';
import SelectRole from '../pages/auth/SelectRole';

// Candidate
import CandidateDashboard from '../pages/candidate/Dashboard';
import BrowseJobs from '../pages/candidate/BrowseJobs';
import MyApplications from '../pages/candidate/MyApplications';
import MyInterviews from '../pages/candidate/MyInterviews';
import ResumeATS from '../pages/candidate/ResumeATS';

// Recruiter
import RecruiterDashboard from '../pages/recruiter/Dashboard';
import PostJob from '../pages/recruiter/PostJob';
import ManageJobs from '../pages/recruiter/ManageJobs';
import ViewCandidates from '../pages/recruiter/ViewCandidates';
import ScheduleInterview from '../pages/recruiter/ScheduleInterview';

// Admin
import AdminDashboard from '../pages/admin/Dashboard';
import ManageUsers from '../pages/admin/ManageUsers';

import ProtectedRoute from '../components/common/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
       <Route path="/select-role" element={<SelectRole />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/verify-otp" element={<OTPVerify />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Candidate */}
      <Route path="/candidate" element={
        <ProtectedRoute role="CANDIDATE"><CandidateDashboard /></ProtectedRoute>
      } />
      <Route path="/candidate/jobs" element={
        <ProtectedRoute role="CANDIDATE"><BrowseJobs /></ProtectedRoute>
      } />
      <Route path="/candidate/applications" element={
        <ProtectedRoute role="CANDIDATE"><MyApplications /></ProtectedRoute>
      } />
      <Route path="/candidate/interviews" element={
        <ProtectedRoute role="CANDIDATE"><MyInterviews /></ProtectedRoute>
      } />
      <Route path="/candidate/resume" element={
        <ProtectedRoute role="CANDIDATE"><ResumeATS /></ProtectedRoute>
      } />

      {/* Recruiter */}
      <Route path="/recruiter" element={
        <ProtectedRoute role="RECRUITER"><RecruiterDashboard /></ProtectedRoute>
      } />
      <Route path="/recruiter/post-job" element={
        <ProtectedRoute role="RECRUITER"><PostJob /></ProtectedRoute>
      } />
      <Route path="/recruiter/jobs" element={
        <ProtectedRoute role="RECRUITER"><ManageJobs /></ProtectedRoute>
      } />
      <Route path="/recruiter/candidates" element={
        <ProtectedRoute role="RECRUITER"><ViewCandidates /></ProtectedRoute>
      } />
      <Route path="/recruiter/interviews" element={
        <ProtectedRoute role="RECRUITER"><ScheduleInterview /></ProtectedRoute>
      } />

      {/* Admin */}
      <Route path="/admin" element={
        <ProtectedRoute role="ADMIN"><AdminDashboard /></ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute role="ADMIN"><ManageUsers /></ProtectedRoute>
      } />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
