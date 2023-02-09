import { useState } from 'react';
import ReactModal from 'react-modal';
import { AiOutlineCloseSquare } from "react-icons/ai";
import { useMutation, useQueryClient } from 'react-query';
import { updateTask } from '../../services/taskApi';
import { toast } from 'react-toastify';

export function ModalEditTask({ openModal: { open, id }, setIsOpenModal }) {
  const [inputText, setInputText] = useState('');

  const queryClient = useQueryClient();

  function notifyEdit() {
    toast.success("successfully edited task!", {
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
      queryClient.invalidateQueries('tasks')
      setInputText('')
      notifyEdit();
    },
    onError: (error) => {
      console.log(error.message)
    }
  });

  function handleCloseModal() {
    setIsOpenModal({ open: false, id: null })
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
        <input
          type="text"
          value={ inputText }
          name='textInput'
          onChange={({ target }) => setInputText(target.value)}
        />
        <button
          type='button'
          onClick={() => editTask({ id, inputText })}
        >
          Adicionar
        </button>
      </div>
    </ReactModal>
  )
}
