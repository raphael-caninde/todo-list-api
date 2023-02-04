import React, { useState } from 'react';
import { getTasks, createTask } from '../../services/taskApi';
import { useQuery, useMutation, useQueryClient} from 'react-query'

export function TodoList() {
  const queryClient = useQueryClient()
  const [text, setText] = useState('');
  const { data: tasks } = useQuery(
    "tasks",
    () => getTasks(),
  );

  const { mutate: handleCreateTask } = useMutation(async () => {
    try {
      await createTask(text);
    } catch (error) {
      console.log(error);
    } finally {
      queryClient.invalidateQueries("tasks");
    }
  })

  return (
    <div>
      <div>
        <input
          id="todo-input"
          type="text"
          name="todo-input"
          value={ text }
          onChange={ ({ target }) => setText(target.value) }
        />
        <button
          type="button"
          onClick={handleCreateTask}
        >
          ADICIONAR
        </button>
      </div>
      <div>
        <ul>
          { tasks?.data?.list?.length ?
            tasks.data.list.map((task) => {
            return (
              <li key={task.id}>
                {task.task}
              </li>
            )
          }) :
            <span>Adicione uma tarefa!</span>
          }
        </ul>
    </div>
    </div>
  );
}
