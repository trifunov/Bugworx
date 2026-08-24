const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5250';

let tokenProvider = null;

export const setTokenProvider = (provider) => {
  tokenProvider = provider;
};

const getHeaders = () => {
  const headers = { 'Content-Type': 'application/json' };
  if (tokenProvider) {
    const token = tokenProvider();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const text = await response.text();
    let message;
    try {
      const json = JSON.parse(text);
      message = json.title || json.message || text;
    } catch {
      message = text || `HTTP ${response.status}`;
    }
    throw new Error(message);
  }

  const text = await response.text();
  if (!text) return null;
  return JSON.parse(text);
};

export const api = {
  get: async (path) => {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  post: async (path, body) => {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  },

  put: async (path, body) => {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  },

  delete: async (path) => {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
};

export default api;
