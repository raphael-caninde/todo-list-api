import { useState } from 'react';
import ReactModal from 'react-modal';
import { AiOutlineCloseSquare } from "react-icons/ai";
import { useMutation, useQueryClient } from 'react-query';
import { updateTask } from '../../services/taskApi';
import { toast } from 'react-toastify';

export function ModalEditTask({ openModal: { open, id, task }, setIsOpenModal }) {
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState('');


  const queryClient = useQueryClient();

  function notifyEdit() {
    toast.success("Tarefa editada com sucesso!", {
      icon: true,
      theme: "dark",
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1000,
    });
  }

  async function handleEditTask({ id, inputText }) {
    const editTask = await updateTask(id, inputText);

    return editTask;
  }

  const { mutate: editTask} = useMutation(handleEditTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
      setIsOpenModal(oldState => ({...oldState, task: inputText}))
      setInputText('');
      setError('');
      notifyEdit();
    },
    onError: (error) => {
      if (error.message) {
        setError(error.response.data.message);
      }
    }
  });

  function handleKeyUp(e) {
    if (e.keyCode === 13) {
      editTask({id, inputText});
    }
  }

  function handleCloseModal() {
    setIsOpenModal({ open: false, id: null, task: '' })
  }

  return (
    <ReactModal
      className='flex w-80 p-3 bg-neutral-700 rounded-lg absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3'
      isOpen={ open }
      onRequestClose={ handleCloseModal }
      ariaHideApp={ false }
    >
      <AiOutlineCloseSquare
        className="absolute top-2 right-2 text-white bg-red-500 w-7 h-7 rounded-sm cursor-pointer"
        onClick={handleCloseModal}
      />
      <div className="flex flex-col items-center w-full mt-5">
        <div className='text-lg text-white mb-4'>
          <h3>{ task }</h3>
        </div>
        <input
          className='w-full outline-none text-lg p-1 rounded-md'
          type="text"
          value={ inputText }
          name='textInput'
          onChange={({ target }) => setInputText(target.value)}
          onKeyUp={handleKeyUp}
        />
        <span className='text-red-600 font-medium'>
          {error}
        </span>
        <div className='flex gap-4 text-white mt-4'>
          <button
            className='px-5 py-1 cursor-pointer rounded-lg bg-red-500'
            type='button'
            onClick={() => handleCloseModal()}
          >
            Cancelar
          </button>
          <button
            className='px-5 py-1 cursor-pointer rounded-lg bg-blue-500'
            type='button'
            onClick={() => editTask({ id, inputText })}
          >
            Salvar
          </button>
        </div>
      </div>
    </ReactModal>
  )
}
