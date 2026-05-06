import API from './axios';

export const registerUser = (data) => API.post('/auth/register', data);

export const sendOTP = (email) => API.post('/auth/send-otp', { email });
export const verifyOTP = (data) => API.post('/auth/verify-otp', data );
export const loginUser = (data) => API.post('/auth/login', data);
export const adminLogin = (data) => API.post('/auth/admin/login', data);
