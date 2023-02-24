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
    <main className='flex flex-col items-center gap-2 w-full h-[91.2%] bg-zinc-100'>
      <ModalEditTask
        openModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
      <ModalDeleteTask
        openModalDelete={isOpenModalDelete}
        setIsOpenModalDelete={setIsOpenModalDelete}
      />
      <div className='flex justify-center gap-5 mt-8 w-[35rem]'>
        <input
          className='flex-1 p-2 border text-lg outline-none rounded-sm border-gray-400'
          id="todo-input"
          type="text"
          name="input-text"
          value={ inputText }
          placeholder='Digite uma tarefa...'
          onChange={ ({ target }) => setInputText(target.value) }
          onKeyUp={ handleKeyUp }
        />
        <button
          className='px-6 rounded-lg text-white font-semibold bg-green-500'
          type="button"
          onClick={ () => mutateCreateTask(inputText) }
          >
          Adicionar
        </button>
      </div>
      <span className='py-2 text-red-600'>
        { error }
      </span>
      <div className='flex flex-col w-[40rem] h-[40rem] p-3 overflow-y-scroll'>
        <ul className='flex flex-col items-center w-full h-full'>
          {
            tasks?.data.list.length ?
            tasks.data.list.map((task) => {
            return (
              <div className='flex w-full justify-around items-center break-words p-3 my-2 bg-zinc-300 rounded-md shadow-lg' key={ task.id }>
                <input
                  className='mr-3 h-6 w-6 cursor-pointer'
                  type="checkbox"
                  checked={ task.done }
                  onChange={({ target }) => mutateTaskDone({ taskId: task.id, done: target.checked })}
                />
                <p
                  className={`${task.done ? 'line-through' : 'no-underline'} flex-1 text-xl`}
                >
                  { task.task }
                </p>
                <div className='flex gap-4 ml-3'>
                  <FiEdit
                    className='cursor-pointer bg-blue-500 text-white w-8 h-7 rounded-md'
                    size={25}
                    onClick={() => {
                      setIsOpenModal({ open: true, id: task.id, task: task.task })
                    }}
                  />
                  <FiTrash2
                    className='cursor-pointer bg-red-500 text-white w-8 h-7 rounded-md'
                    size={25}
                    onClick={() => setIsOpenModalDelete({open: true, id: task.id })}
                  />
                </div>
              </div>
            )
          }) :
            <span className='text-xl font-medium'>
              Adicione uma tarefa!
            </span>
          }
        </ul>
      </div>
    </main>
  );
}
