import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'

import axiosInstance from '../components/AxiosInstance'
import axios from 'axios'

import QuestionPageHeading from '../components/QuestionPageHeading'
import QuestionEditForm from '../components/QuestionEditForm'
import Reply from '../components/Reply'
import ReplyForm from '../components/ReplyForm'

const QuestionPage = (props) => {
  const navigate = useNavigate()
  const { questionId, topicId } = useParams()
  const [question, setQuestion] = useState(null)
  const [replies, setReplies] = useState([])
  const axiosBase = axiosInstance(localStorage.getItem('access_token'))
  const [modal, setModal] = useState(false)

  const initialFormData = {
    question_text: '',
    long_question_text: ''
  }

  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    if (question) {
      setFormData({
        user: question.user.id,
        topic: question.topic.id,
        question_text: question.question_text,
        long_question_text: question.long_question_text
      })
    }
  }, [question])

  const toggleModal = () => {
    setModal(!modal)
  }

  const checkUser = () => {
    if (question && props.user) {
      if (props.user.data.pk === question.user.id) {
        return true
      }
    }
    return false
  }

  const getQuestionById = async () => {
    const response = await axiosBase.get(`questions/${questionId}`)
    setQuestion(response.data)
  }

  const getReplies = async () => {
    if (question) {
      const response = await axios.get(
        `https://kavanahforum-e2c5663ae901.herokuapp.com/api/replies/?question=${question.id}`
      )
      setReplies(response.data)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const obj = {
      user: formData.user,
      topic: formData.topic,
      question_text: formData.question_text,
      long_question_text: formData.long_question_text
    }
    const token = localStorage.getItem('access_token')
    await axiosInstance(token).put(`modifyquestion/${questionId}`, obj)
    await getQuestionById()
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('access_token')
    await axiosInstance(token).delete(`modifyquestion/${questionId}`)
    navigate(`/t/${topicId}`)
  }

  useEffect(() => {
    getQuestionById()
  }, [questionId])

  useEffect(() => {
    getReplies()
  }, [question])

  useEffect(() => {
    checkUser()
  }, [props.user])

  return (
    <div
      style={{
        marginLeft: '20px',
        marginRight: '20px'
      }}
    >
      {question && (
        <QuestionPageHeading
          question={question}
          toggleModal={toggleModal}
          handleDelete={handleDelete}
          user={props.user}
        />
      )}

      <br />
      <br />
      <h3>Replies</h3>
      {!props.user && (
        <p style={{ fontSize: '.8em', fontStyle: 'italic' }}>Log In To Reply</p>
      )}
      <br />
      {props.user && (
        <ReplyForm
          user={props.user}
          getReplies={getReplies}
          questionId={questionId}
        />
      )}
      <br />
      {replies &&
        replies.map((reply) => (
          <div key={reply.id}>
            <Reply
              reply={reply}
              user={props.user}
              questionId={questionId}
              getReplies={getReplies}
            />
          </div>
        ))}
      {replies && replies.length === 0 && (
        <div>
          <p className="blank">No Replies Yet!</p>
          <br />
        </div>
      )}

      {question && (
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>
            Edit your Question about {question.topic.title}
          </ModalHeader>
          <ModalBody>
            <QuestionEditForm
              user={props.user}
              initialFormData={formData}
              handleChange={handleChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={(e) => {
                handleSubmit(e)
                toggleModal()
              }}
            >
              Update
            </Button>
            <Button color="secondary" onClick={toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  )
}

export default QuestionPage
