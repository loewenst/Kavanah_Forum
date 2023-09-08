import { Form, Button, Input } from 'reactstrap'
import { useState } from 'react'
import axiosInstance from './AxiosInstance'
import { useRef } from 'react'

const CommentForm = (props) => {
  const [formBlank, setFormBlank] = useState(true)
  const contentRef = useRef(null)
  const initialFormData = {
    content: ''
  }
  const [formData, setFormData] = useState(initialFormData)
  // useState for initial form data
  //handleChange and handleSubmit
  //Cancel and Submit buttons hidden until comment has a length

  const handleChange = (e) => {
    setFormData({
      content: e.target.value
    })
    if (e.target.value === '') {
      setFormBlank(true)
    } else {
      setFormBlank(false)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const obj = {
      user: props.user.data.pk,
      post: props.postId,
      content: formData.content
    }
    const token = localStorage.getItem('access_token')
    await axiosInstance(token).post('postcomment/', obj)
    props.getComments()
    contentRef.current.value = ''
    setFormBlank(true)
  }

  return (
    <Form>
      <Input
        id="content"
        name="content"
        placeholder="Add a comment..."
        type="text"
        onChange={(e) => handleChange(e)}
        innerRef={contentRef}
      />
      <br />
      {!formBlank && (
        <Button
          size="sm"
          style={{ marginRight: '10px' }}
          onClick={() => {
            contentRef.current.value = ''
            setFormBlank(true)
          }}
        >
          Cancel
        </Button>
      )}
      {!formBlank && (
        <Button
          size="sm"
          onClick={(e) => {
            handleSubmit(e)
          }}
        >
          Submit
        </Button>
      )}
      <br />
    </Form>
  )
}

export default CommentForm
