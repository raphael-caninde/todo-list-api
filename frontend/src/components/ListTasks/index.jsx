import React, { useState, useEffect } from 'react';
import { getTasks } from '../../services/taskApi';

export function ListTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      const allTasks = await getTasks();

      setTasks(allTasks);
    })()
  }, []);

  console.log('lista de tarefas: ', tasks)

  return (
    <div>
     {/*  {tasks === undefined ?
        <span>Adicione uma tarefa</span> :
        tasks.map(task => {
            return (
              <div>
                <div>
                  {task}
                </div>
              </div>
            )
          }
        )
      } */}
    </div>
  );
};
