import axios from 'axios';

export const api = axios.create({
  baseURL: "http://localhost:3001",
});

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

 export const requestLogin = async ({email, password}) => {
  const login = await api.post("/user/login", { email, password }, { headers });

  return login;
};

export const userRegister = async (data) => {
  const register = await api.post("/user/create", data, { headers });

  return register;
};
