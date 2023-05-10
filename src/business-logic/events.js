import axios from 'axios';
import './axios-default';

const limit = 3;

export const createEvent = async ({ customerId, data }) =>
  await axios.post(`/api/customers/${customerId}/events`, data);

export const getAllEvents = async ({ customerId, page, sortBy }) =>
  await axios.get(`/api/customers/${customerId}/events`, { params: { page, limit, sortBy } });

export const deleteEvent = async ({ customerId, id }) =>
  await axios.delete(`/api/customers/${customerId}/events/${id}`);
