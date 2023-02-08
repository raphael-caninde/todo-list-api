import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { getTasks, createTask, removeTask } from '../../services/taskApi';
import { useQuery, useMutation, useQueryClient} from 'react-query'
import { FiTrash2 } from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css'

export function TodoList() {
  const [inputText, setInputText] = useState('');

  const queryClient = useQueryClient();

  const { data: tasks } = useQuery("tasks",
    () => getTasks(),
  );

  function notifyAdded() {
    toast.success("task add!", {
      icon: true,
      theme: "dark",
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1000,
    });
  }
  function notifyDeleted() {
    toast.error("task deleted!", {
      icon: true,
      theme: "dark",
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1000,
    });
  }

  const { mutate: handleCreateTask } = useMutation(async () => {
    try {
      await createTask(inputText);
    } catch (error) {
      console.log(error);
    } finally {
      queryClient.invalidateQueries("tasks");
      setInputText('');
      notifyAdded()
    }
  })

  async function handleDeleteTask (id) {
    await removeTask(id);
  }

  const { mutate: deleteTask } = useMutation(handleDeleteTask, {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
        notifyDeleted();
      },
      onError: (error) => {
        console.log(error.message)
      }
    }
  );

  return (
    <div>
      <div>
        <input
          id="todo-input"
          type="text"
          name="input-text"
          value={ inputText }
          onChange={ ({ target }) => setInputText(target.value) }
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
          {
            tasks?.data.list.length ?
            tasks.data.list.map((task) => {
            return (
              <div key={task.id}>
                <li>
                  {task.task}
                </li>
                <FiTrash2 onClick={() => deleteTask(task.id)} />
              </div>
            )
          }) :
            <span>Adicione uma tarefa!</span>
          }
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
}
