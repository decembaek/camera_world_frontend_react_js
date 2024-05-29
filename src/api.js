import Cookie from 'js-cookie';
import axios from 'axios';

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000/api/v1'
      : '',
  withCredentials: true,
});

export const getMe = () => {};

export const emailLogin = async () => {
  const response = await instance.post('/user/log-in/', {
    headers: {
      'X-CSRFToken': Cookie.get('csrftoken') || '',
    },
  });
  return response.data;
};
