import API from './axios';

export const getAllUsers = () => API.get('/admin/users');
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);
export const getStats = () => API.get('/admin/stats');
export const toggleUserBlock = (id) => API.put(`/admin/users/${id}/toggle-block`);
