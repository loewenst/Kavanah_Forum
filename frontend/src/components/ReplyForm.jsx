import { Form, Button, Input } from 'reactstrap'
import { useState } from 'react'
import axiosInstance from './AxiosInstance'
import { useRef } from 'react'

const ReplyForm = (props) => {
  const [formBlank, setFormBlank] = useState(true)
  const contentRef = useRef(null)
  const initialFormData = {
    content: ''
  }
  const [formData, setFormData] = useState(initialFormData)

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
      question: props.questionId,
      content: formData.content
    }
    const token = localStorage.getItem('access_token')
    await axiosInstance(token).post('postreply/', obj)
    props.getReplies()
    contentRef.current.value = ''
    setFormBlank(true)
  }

  return (
    <Form>
      <Input
        id="content"
        name="content"
        placeholder="Add a reply..."
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

export default ReplyForm
