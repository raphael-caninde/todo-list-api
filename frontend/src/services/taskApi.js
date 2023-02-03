import { api } from "./axiosService";

export const getTasks = async () => {
  const tasks = await api.get('/task');
  console.log('api task', tasks);
  return tasks;
};

export const createTask = async (data) => {
  const task = await api.post('/task', data);

  return task;
};
