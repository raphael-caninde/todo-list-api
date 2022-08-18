import React, { useState, useContext, useEffect } from 'react';
import { getTasks } from '../../services/taskApi';
import AppContext from '../../context/AppContext';

function ListItem() {
  const { user: { id } } = useContext(AppContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      const task = await getTasks(id);

      setTasks(task);
    })()
  });

  console.log(tasks)

  return (
    <div>
    </div>
  );
};

export default ListItem;
