import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email, password) => 
    api.post('/auth/login', { email, password }).then(res => res.data),
  
  register: (userData) => 
    api.post('/auth/register', userData).then(res => res.data),
  
  getProfile: () => 
    api.get('/auth/profile').then(res => res.data),
  
  verifyToken: async () => {
    const response = await api.get('/auth/profile');
    return response.data.user;
  }
};

export const marketInsightsAPI = {
  getDomains: () => 
    api.get('/market-insights/domains').then(res => res.data),
  
  getInsights: (domain) => 
    api.get(`/market-insights/${domain}`).then(res => res.data)
};

export const resumeAPI = {
  saveResume: (resumeData) => 
    api.post('/resume', { resumeData }).then(res => res.data),
  
  getResume: () => 
    api.get('/resume').then(res => res.data)
};

export const interviewAPI = {
  getQuestions: (domain, difficulty, category) => {
    const params = new URLSearchParams();
    if (domain) params.append('domain', domain);
    if (difficulty) params.append('difficulty', difficulty);
    if (category) params.append('category', category);
    
    return api.get(`/interview/questions?${params}`).then(res => res.data);
  },
  
  getCategories: () => 
    api.get('/interview/categories').then(res => res.data),
  
  getDomains: () => 
    api.get('/interview/domains').then(res => res.data),
  
  addQuestion: (questionData) => 
    api.post('/interview/questions', questionData).then(res => res.data)
};

export default api;