import axios from 'axios';

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('frigopom_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('frigopom_token');
      localStorage.removeItem('frigopom_user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  },
);

export const authService = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  profile: () => api.get('/auth/profile'),
  createUser: (data: any) => api.post('/auth/users', data),
};

export const clientsService = {
  getAll: () => api.get('/clients'),
  getOne: (id: number) => api.get(`/clients/${id}`),
  create: (data: any) => api.post('/clients', data),
  update: (id: number, data: any) => api.put(`/clients/${id}`, data),
  remove: (id: number) => api.delete(`/clients/${id}`),
};

export const unitesService = {
  getAll: () => api.get('/unites'),
  getOne: (id: number) => api.get(`/unites/${id}`),
  create: (data: any) => api.post('/unites', data),
  update: (id: number, data: any) => api.put(`/unites/${id}`, data),
  remove: (id: number) => api.delete(`/unites/${id}`),
};

export const chambresService = {
  getByUnite: (uniteId: number) => api.get(`/chambres/unite/${uniteId}`),
  getDashboard: (uniteId: number) => api.get(`/chambres/unite/${uniteId}/dashboard`),
  getOne: (id: number) => api.get(`/chambres/${id}`),
  create: (data: any) => api.post('/chambres', data),
  update: (id: number, data: any) => api.put(`/chambres/${id}`, data),
  updateConfig: (id: number, data: any) => api.put(`/chambres/${id}/config`, data),
  remove: (id: number) => api.delete(`/chambres/${id}`),
};

export const mesuresService = {
  create: (data: any) => api.post('/mesures', data),
  getByChambre: (id: number, limit?: number) =>
    api.get(`/mesures/chambre/${id}`, { params: { limit } }),
  getLast: (id: number) => api.get(`/mesures/chambre/${id}/last`),
  getStats: (id: number, heures?: number) =>
    api.get(`/mesures/chambre/${id}/stats`, { params: { heures } }),
  getByPeriode: (id: number, debut: string, fin: string) =>
    api.get(`/mesures/chambre/${id}/periode`, { params: { debut, fin } }),
};

export const alarmesService = {
  getActives: (chambreId?: number) =>
    api.get('/alarmes/actives', { params: { chambre_id: chambreId } }),
  getByUnite: (uniteId: number) => api.get(`/alarmes/unite/${uniteId}`),
  create: (data: any) => api.post('/alarmes', data),
  acquitter: (id: number) => api.put(`/alarmes/${id}/acquitter`),
};

export const stocksService = {
  getByChambre: (id: number) => api.get(`/stocks/chambre/${id}`),
  getByUnite: (id: number) => api.get(`/stocks/unite/${id}`),
  create: (data: any) => api.post('/stocks', data),
  update: (id: number, data: any) => api.put(`/stocks/${id}`, data),
  remove: (id: number) => api.delete(`/stocks/${id}`),
};

export default api;
