import convertDate from './ConvertDate'
import * as AiIcons from 'react-icons/ai'
import { useState } from 'react'
import { Form, Button, Input } from 'reactstrap'
import axiosInstance from './AxiosInstance'
import ConfirmDeleteModal from './ConfirmDeleteModal'

const Reply = (props) => {
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({ content: props.reply.content })
  const [modal, setModal] = useState(false)
  const toggleModal = () => {
    setModal(!modal)
  }

  const checkUser = () => {
    if (props.reply && props.user) {
      if (props.user.data.pk === props.reply.user.id) {
        return true
      }
    }
    return false
  }

  const handleChange = (e) => {
    setFormData({
      content: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const obj = {
      user: props.user.data.pk,
      question: props.questionId,
      content: formData.content
    }
    const token = localStorage.getItem('access_token')
    await axiosInstance(token).put(`modifyreply/${props.reply.id}`, obj)
    props.getReplies()
    setEditMode(false)
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('access_token')
    await axiosInstance(token).delete(`modifyreply/${props.reply.id}`)
    props.getReplies()
  }

  return (
    <div className="comment">
      {!editMode && (
        <div>
          <p style={{ fontSize: '.8em' }}>
            {convertDate(props.reply.date)} || {props.reply.user.email} says:
          </p>
          <p>{props.reply.content}</p>
        </div>
      )}
      {editMode && (
        <div>
          <p style={{ fontSize: '.8em' }}>
            {convertDate(props.reply.date)} || {props.reply.user.email} says:
          </p>
          <Form>
            <Input
              id="content"
              name="content"
              value={formData.content}
              type="text"
              onChange={(e) => handleChange(e)}
            />
            <br />
            <Button
              size="sm"
              style={{ marginRight: '10px' }}
              onClick={() => setEditMode(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={(e) => {
                handleSubmit(e)
              }}
            >
              Submit
            </Button>
            <br />
          </Form>
        </div>
      )}
      {checkUser() && (
        <div className="editButtons">
          <AiIcons.AiOutlineEdit onClick={() => setEditMode(true)} />
          <AiIcons.AiOutlineDelete onClick={toggleModal} />
        </div>
      )}
      <ConfirmDeleteModal
        element="reply"
        handleDelete={handleDelete}
        modal={modal}
        toggleModal={toggleModal}
      />
    </div>
  )
}

export default Reply
