import axios from 'axios';
import './axios-default';

export const authRegister = async (credentials) => await axios.post('/users/register', credentials);

export const authLogin = async (credentials) => await axios.post('/users/login', credentials);

export const authRefresh = async () => await axios.get('/users/current');

export const authLogout = async () => await axios.post('/users/logout');
