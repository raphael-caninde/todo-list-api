import { api } from "./axiosService";

export const getTasks = async () => {
  const tasks = await api.get('/task');

  return tasks;
};

export const createTask = async (task) => {
  const newTask = await api.post('/task', { task });

  return newTask;
};

export const updateTask = async (taskId, task) => {
  await api.patch(`/task/${taskId}`, { task })
};

export const removeTask = async (taskId) => {
  await api.delete(`/task/${taskId}`);
};
