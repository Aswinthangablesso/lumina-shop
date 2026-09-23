const API_BASE_URL = 'http://localhost:5000/api';

export const fetchProductsAPI = async (queryParams = {}) => {
  try {
    const params = new URLSearchParams(queryParams);
    const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
    if (!response.ok) throw new Error('API request failed');
    return await response.json();
  } catch (err) {
    console.warn('API fetch warning, using local dataset fallback:', err.message);
    const { PRODUCTS } = await import('../data/products.js');
    return PRODUCTS;
  }
};

export const fetchSingleProductAPI = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('API request failed');
    return await response.json();
  } catch (err) {
    const { PRODUCTS } = await import('../data/products.js');
    return PRODUCTS.find(p => p.id === id) || null;
  }
};

export const loginAPI = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (!response.ok) return { success: false, error: data.error || 'Login failed' };
    return data;
  } catch (err) {
    return null;
  }
};

export const registerAPI = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    if (!response.ok) return { success: false, error: data.error || 'Registration failed' };
    return data;
  } catch (err) {
    return null;
  }
};

export const createOrderAPI = async (orderData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    return await response.json();
  } catch (err) {
    console.warn('Order API offline, using local order persistence.');
    return { success: true, order: orderData };
  }
};
