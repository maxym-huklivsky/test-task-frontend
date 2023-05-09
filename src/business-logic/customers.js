import axios from 'axios';
import './axios-default';

const limit = 5;

export const createCustomer = async (data) => await axios.post('/api/customers', data);

export const getAllCustomers = async (page) =>
  await axios.get('/api/customers', { params: { page, limit } });

export const updateCustomer = async ({ id, data }) => await axios.put(`/api/customers/${id}`, data);

export const deleteCustomer = async (id) => await axios.delete(`/api/customers/${id}`);
