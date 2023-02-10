import ReactModal from "react-modal";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { removeTask } from "../services/taskApi";

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
    <ReactModal
      isOpen={ open }
      onRequestClose={ closeModal }
      ariaHideApp={ false }
    >
      <div>
        <AiOutlineCloseSquare
          onClick={() => closeModal()}
        />
        <div>
          <span>Deseja realmente excluir a tarefa?</span>
        </div>
        <div>
          <button
            type="submit"
            onClick={() => deleteTask(id)}
          >
            Sim
          </button>
          <button
            type="button"
            onClick={() => closeModal()}
          >
            Não
          </button>
        </div>
      </div>
    </ReactModal>
  )
}
