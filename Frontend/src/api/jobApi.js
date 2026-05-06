import API from './axios';

export const getJobs = (params) => API.get('/jobs', { params });
export const getJobById = (id) => API.get(`/jobs/${id}`);
export const createJob = (data) => API.post('/jobs', data);
export const updateJob = (id, data) => API.put(`/jobs/${id}`, data);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);

export const applyForJob = (jobId) => API.post('/applications', { jobId });
export const getMyApplications = () => API.get('/applications/my');
export const getApplicationsByJob = (jobId) => API.get(`/applications/job/${jobId}`);
export const updateApplicationStatus = (id, status) =>
  API.put(`/applications/${id}/status?status=${status}`);

export const analyzeResume = (data) => API.post('/resume/analyze', data);

export const getMyInterviews = () => API.get('/interviews/my');
export const scheduleInterview = (data) => API.post('/interviews', data);
export const getAllInterviews = () => API.get('/interviews');
