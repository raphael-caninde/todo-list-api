import { api } from "./axiosService";

 export const requestLogin = async ({email, password}) => {
  const login = await api.post("/user/login", { email, password });

  return login;
};

export const userRegister = async (data) => {
  const register = await api.post("/user/create", data);

  return register;
};
