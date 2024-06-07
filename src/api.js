import Cookie from 'js-cookie';
import axios from 'axios';

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000/api/v1'
      : '',
  withCredentials: true,
});

export const getMe = async () => {
  const response = await instance.get(`user/me`, {
    headers: {
      'X-CSRFToken': Cookie.get('csrftoken') || '',
    },
  });
  return response.data;
};

export const logOut = async () => {
  const response = await instance.post('user/log-out', null, {
    headers: {
      'X-CSRFToken': Cookie.get('csrftoken') || '',
    },
  });
  return response.data;
};

export const emailLogin = async ({ email, password }) => {
  const response = await instance.post(
    '/user/log-in',
    { email, password },
    {
      headers: {
        'X-CSRFToken': Cookie.get('csrftoken') || '',
      },
    }
  );
  return response.data;
};
