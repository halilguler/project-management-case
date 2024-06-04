import Modal from "react-bootstrap/Modal";
import PMButton from "../PMButton/PMButton";

type Props = {
  size?: "sm" | "lg" | "xl";
  show: boolean;
  handleClose: () => void;
  handleClick: () => void;
  modalTitle: string;
  children: React.ReactNode;
  backdrop?: "static" | true;
};

const PMModal = (props: Props) => {
  const {
    size,
    show,
    backdrop,
    handleClose,
    handleClick,
    modalTitle,
    children,
  } = props;

  return (
    <Modal
      size={size || "lg"}
      show={show}
      onHide={handleClose}
      backdrop={backdrop || true}
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <PMButton variant="secondary" onClick={handleClose} text="Close" />
        <PMButton variant="primary" text="Save" onClick={handleClick} />
      </Modal.Footer>
    </Modal>
  );
};

export default PMModal;
