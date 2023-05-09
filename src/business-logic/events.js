import axios from 'axios';
import './axios-default';

const limit = 2;

export const createEvent = async ({ customerId, data }) =>
  await axios.post(`/api/customers/${customerId}/events`, data);

export const getAllEvents = async ({ customerId, page }) =>
  await axios.get(`/api/customers/${customerId}/events`, { params: { page, limit } });

export const deleteEvent = async ({ customerId, id }) =>
  await axios.delete(`/api/customers/${customerId}/events/${id}`);
