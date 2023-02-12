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
  const upTask = await api.patch(`/task/${taskId}`, { task })

  return upTask;
};

export const taskDone = async (taskId, done) => {
  const isDone = await api.patch(`/task/done/${taskId}`, { done });

  return isDone
}

export const removeTask = async (taskId) => {
  const deleteTask = await api.delete(`/task/${taskId}`);

  return deleteTask;
};
