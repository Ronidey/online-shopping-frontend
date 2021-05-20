import axios from 'axios';

export const addCartItem = (productId, size) => {
  return axios.post(`/users/my-cart`, { productId, size, qty: 1 });
};

export const deleteCartItem = (productId) => {
  return axios.delete(`/users/my-cart/${productId}`);
};

export const updateCartItem = (productId, update) => {
  return axios.patch(`/users/my-cart/${productId}`, update);
};

export const getProductById = (id) => axios.get(`/products/${id}`);
