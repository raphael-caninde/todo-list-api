import React, { useState } from 'react';
import { toast } from "react-toastify";
import { getTasks, createTask, taskDone } from '../../services/taskApi';
import { useQuery, useMutation, useQueryClient} from 'react-query'
import { FiTrash2, FiEdit } from 'react-icons/fi';
import { ModalEditTask } from '../ModalEditTask';
import { ModalDeleteTask } from '../ModalDeleteTask';

export function TodoList() {
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState('');
  const [isOpenModal, setIsOpenModal] = useState({
    open: false,
    id: null,
    task: '',
  });
  const [isOpenModalDelete, setIsOpenModalDelete] = useState({open: false, id: null})

  const queryClient = useQueryClient();

  const { data: tasks } = useQuery("tasks",
    () => getTasks(),
  );

  function notifyAdded() {
    toast.success("Tarefa adicionada com sucesso!", {
      icon: true,
      theme: "dark",
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1000,
    });
  }

  function handleKeyUp(e) {
    if (e.keyCode === 13) {
      mutateCreateTask(inputText);
    }
  }

  async function handleCreateTask(inputText) {
    const newTask =  await createTask(inputText)

    return newTask;
  }

  async function handleTaskDone({ taskId, done }) {
    const isDone = await taskDone(taskId, done);

    return isDone;
  }

  const { mutate: mutateCreateTask } = useMutation( handleCreateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      setInputText('');
      setError('');
      notifyAdded();
    },
    onError: (error) => {
      if (error.message) {
        setError(error.response.data.message);
      }
    }
  })

  const { mutate: mutateTaskDone } = useMutation(handleTaskDone, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    }
  })

  return (
    <div>
      <ModalEditTask
        openModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
      <ModalDeleteTask
        openModalDelete={isOpenModalDelete}
        setIsOpenModalDelete={setIsOpenModalDelete}
      />
      <div>
        <input
          id="todo-input"
          type="text"
          name="input-text"
          value={ inputText }
          onChange={ ({ target }) => setInputText(target.value) }
          onKeyUp={ handleKeyUp }
        />
        <span>{ error }</span>
        <button
          type="button"
          onClick={ () => mutateCreateTask(inputText) }
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
              <div key={ task.id }>
                <input
                  type="checkbox"
                  checked={ task.done }
                  onChange={({ target }) => mutateTaskDone({ taskId: task.id, done: target.checked })}
                />
                <li
                  className={`${task.done ? 'line-through' : 'no-underline'}`}
                >
                  { task.task }
                </li>
                <FiEdit
                  onClick={() => {
                    setIsOpenModal({ open: true, id: task.id, task: task.task })
                  }}
                />
                <FiTrash2
                  onClick={() => setIsOpenModalDelete({open: true, id: task.id })}
                />
              </div>
            )
          }) :
            <span>Adicione uma tarefa!</span>
          }
        </ul>
      </div>
    </div>
  );
}
