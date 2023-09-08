import { Modal, ModalHeader, ModalFooter, Button } from 'reactstrap'

const ConfirmDeleteModal = (props) => {
  return (
    <Modal isOpen={props.modal} toggle={props.toggleModal}>
      <ModalHeader>
        Are you sure you want to delete this {props.element}?
      </ModalHeader>
      <ModalFooter>
        <Button color="secondary" onClick={props.toggleModal}>
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={(e) => {
            props.handleDelete(e)
            props.toggleModal()
          }}
        >
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ConfirmDeleteModal
