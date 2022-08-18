import axios from 'axios';

export const api = axios.create({
  baseURL: "http://localhost:3001",
});

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export const getTaks = async () => {
  const tasks = await axios.get('/list', { headers });

  return tasks;
};

export const createTask = async (data) => {
  const task = await axios.post('/create-task', data, { headers });

  return task;
};
