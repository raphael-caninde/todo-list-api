import Modal from "react-modal";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { removeTask } from "../../services/taskApi";

export function ModalDeleteTask({openModalDelete: {open, id}, setIsOpenModalDelete}) {
  const queryClient = useQueryClient();

  function notifyDeleted() {
    toast.error("Tarefa deletada com sucesso!", {
      icon: true,
      theme: "dark",
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1000,
    });
  }

  async function handleDeleteTask(id) {
    await removeTask(id);
  }

  function closeModal() {
    setIsOpenModalDelete({open: false, id: null});
  }

  const { mutate: deleteTask } = useMutation(handleDeleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      setIsOpenModalDelete({open: false, id: null});
      notifyDeleted();
    },
    onError: (error) => {
      console.log(error.message)
    }
  }
);

  return (
    <Modal
      className='flex w-80 p-3 bg-neutral-700 rounded-lg absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3'
      isOpen={ open }
      onRequestClose={ closeModal }
      ariaHideApp={ false }
    >
      <div className="flex flex-col w-full relative">
        <AiOutlineCloseSquare
          className="absolute top-0 right-0 text-white bg-red-500 w-7 h-7 rounded-sm cursor-pointer"
          size={23}
          onClick={() => closeModal()}
        />
        <div className="w-full text-lg text-center mt-9 text-white">
          <span>Deseja realmente excluir a tarefa?</span>
        </div>
        <div className="flex justify-center w-full gap-4 my-4">
          <button
            className="px-5 py-1 cursor-pointer rounded-lg bg-red-500 text-white"
            type="button"
            onClick={() => closeModal()}
          >
            Não
          </button>
          <button
            className="px-5 py-1 cursor-pointer rounded-lg bg-blue-500 text-white"
            type="submit"
            onClick={() => deleteTask(id)}
          >
            Sim
          </button>
        </div>
      </div>
    </Modal>
  )
}
