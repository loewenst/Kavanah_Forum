import convertDate from './ConvertDate'
import * as AiIcons from 'react-icons/ai'
import { useState } from 'react'
import { Form, Button, Input } from 'reactstrap'
import axiosInstance from './AxiosInstance'
import ConfirmDeleteModal from './ConfirmDeleteModal'

const Comment = (props) => {
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({ content: props.comment.content })
  const [modal, setModal] = useState(false)
  const toggleModal = () => {
    setModal(!modal)
  }

  const checkUser = () => {
    if (props.comment && props.user) {
      if (props.user.data.pk === props.comment.user.id) {
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
      post: props.postId,
      content: formData.content
    }
    console.log(obj)
    const token = localStorage.getItem('access_token')
    await axiosInstance(token).put(`modifycomment/${props.comment.id}`, obj)
    props.getComments()
    setEditMode(false)
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('access_token')
    await axiosInstance(token).delete(`modifycomment/${props.comment.id}`)
    props.getComments()
  }

  return (
    <div className="comment">
      {!editMode && (
        <div>
          <p style={{ fontSize: '.8em' }}>
            {convertDate(props.comment.date)} || {props.comment.user.email}{' '}
            says:
          </p>
          <p>{props.comment.content}</p>
        </div>
      )}
      {editMode && (
        <div>
          <p style={{ fontSize: '.8em' }}>
            {convertDate(props.comment.date)} || {props.comment.user.email}{' '}
            says:
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
        element="comment"
        handleDelete={handleDelete}
        modal={modal}
        toggleModal={toggleModal}
      />
    </div>
  )
}

export default Comment
