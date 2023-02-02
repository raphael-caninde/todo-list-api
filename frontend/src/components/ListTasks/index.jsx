import React, { useState, useContext, useEffect } from 'react';
import { getTasks } from '../../services/taskApi';
import AppContext from '../../context/AppContext';

export function ListTasks() {
  const { user: { id } } = useContext(AppContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      const task = await getTasks();

      setTasks(task);
    })()
  });

  return (
    <div>
      {}
    </div>
  );
};
