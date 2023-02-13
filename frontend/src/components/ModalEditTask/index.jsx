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
      isOpen={ open }
      onRequestClose={ handleCloseModal }
      ariaHideApp={ false }
    >
      <AiOutlineCloseSquare
        onClick={handleCloseModal}
      />

      <div className="">
        <div>
          <h3>{ task }</h3>
        </div>
        <input
          type="text"
          value={ inputText }
          name='textInput'
          onChange={({ target }) => setInputText(target.value)}
          onKeyUp={handleKeyUp}
        />
        <span>{error}</span>
        <button
          type='button'
          onClick={() => editTask({ id, inputText })}
        >
          ADICIONAR
        </button>
        <button
          type='button'
          onClick={() => handleCloseModal()}
        >
          CANCELAR
        </button>
      </div>
    </ReactModal>
  )
}
