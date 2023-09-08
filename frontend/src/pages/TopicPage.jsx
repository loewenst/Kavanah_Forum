import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import axiosInstance from '../components/AxiosInstance'
import SuperTopic from '../components/SuperTopic'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import QuestionCard from '../components/QuestionCard'
import QuestionForm from '../components/QuestionForm'
import classnames from 'classnames'
import {
  Button,
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  CardText,
  Nav,
  NavItem,
  NavLink,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'reactstrap'

const TopicPage = (props) => {
  let { topicId } = useParams()
  let emotionsArray = []

  //State Variables
  const [posts, setPosts] = useState([])
  const [questions, setQuestions] = useState([])
  const [topicName, setTopicName] = useState('')
  const [superTopic, setSuperTopic] = useState('')
  const [subTopics, setSubTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [topThreeEmotions, setTopThreeEmotions] = useState([])
  const [otherEmotions, setOtherEmotions] = useState('')
  const [content, setContent] = useState('posts')
  const [modal, setModal] = useState(false)
  const [questionModal, setQuestionModal] = useState(false)
  const initialFormData = {
    main_emotion: '',
    second_emotion: '',
    third_emotion: '',
    tldr: '',
    elaboration: '',
    sources: ''
  }
  const [formData, setFormData] = useState(initialFormData)
  const initialQuestionFormData = {
    question_text: '',
    long_question_text: ''
  }
  const [questionFormData, setQuestionFormData] = useState(
    initialQuestionFormData
  )

  //State-Setting Functions
  const getSubTopics = async () => {
    const token = localStorage.getItem('access_token')
    const response = await axiosInstance(token).get(
      `subtopics/?supertopic=${topicName}`
    )
    setSubTopics(response.data)
    setLoading(false)
  }

  const getTopicData = async () => {
    const token = localStorage.getItem('access_token')
    const response = await axiosInstance(token).get(`topics/${topicId}`)
    setTopicName(response.data.title)
    setSuperTopic(response.data.superTopic)
  }

  const getPosts = async () => {
    const token = localStorage.getItem('access_token')
    const response = await axiosInstance(token).get(`posts/`)
    let workingArray = []
    response.data.forEach((post) => {
      if (post.topic.title === topicName) {
        workingArray.push(post)
      }
    })
    setPosts(workingArray)
  }

  const getQuestions = async () => {
    const response = await axios.get(
      'https://kavanahforum-e2c5663ae901.herokuapp.com/api/questions/'
    )
    let workingArray = []
    response.data.forEach((question) => {
      if (question.topic.title === topicName) {
        workingArray.push(question)
      }
    })
    setQuestions(workingArray)
  }

  const getEmotions = () => {
    if (posts.length !== 0) {
      posts.forEach((post) => {
        emotionsArray.push(post.main_emotion)
      })
      let emotionCounter = (emotionsArray) => {
        const emotionObj = {}
        for (let i = 0; i < emotionsArray.length; i++) {
          if (emotionObj[emotionsArray[i]]) {
            emotionObj[emotionsArray[i]] = emotionObj[emotionsArray[i]] + 1
          } else {
            emotionObj[emotionsArray[i]] = 1
          }
        }
        let newArray = Object.keys(emotionObj)
        newArray.sort((a, b) => emotionObj[b] - emotionObj[a])
        return newArray
      }
      emotionsArray = emotionCounter(emotionsArray)
      if (emotionsArray.length > 3) {
        setTopThreeEmotions(
          `${emotionsArray[0]}, ${emotionsArray[1]}, ${emotionsArray[2]}`
        )
        setOtherEmotions(`and ${emotionsArray.length - 3} Others`)
      } else {
        setTopThreeEmotions(emotionsArray.join(', '))
      }
    }
  }

  const toggleContent = (content) => {
    if (content === 'posts') {
      setContent('posts')
    }
    if (content === 'questions') {
      setContent('questions')
    }
  }

  const toggleModal = () => setModal(!modal)
  const toggleQuestionModal = () => setQuestionModal(!questionModal)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeQuestion = (e) => {
    setQuestionFormData({
      ...questionFormData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const obj = {
      user: props.user.data.pk,
      topic: parseInt(topicId),
      main_emotion: formData.main_emotion,
      second_emotion: formData.second_emotion,
      third_emotion: formData.third_emotion,
      tldr: formData.tldr,
      elaboration: formData.elaboration,
      sources: formData.sources
    }
    const token = localStorage.getItem('access_token')
    await axiosInstance(token).post('createpost/', obj)
    const response = await axiosInstance(token).get(`posts/`)
    let workingArray = []
    response.data.forEach((post) => {
      if (post.topic.title === topicName) {
        workingArray.push(post)
      }
    })
    setPosts(workingArray)
  }

  const handleSubmitQuestion = async (e) => {
    e.preventDefault()
    const obj = {
      user: props.user.data.pk,
      topic: parseInt(topicId),
      question_text: questionFormData.question_text,
      long_question_text: questionFormData.long_question_text
    }
    const token = localStorage.getItem('access_token')
    await axiosInstance(token).post('createquestion/', obj)
    const response = await axiosInstance(token).get(`questions/`)
    let workingArray = []
    response.data.forEach((question) => {
      if (question.topic.title === topicName) {
        workingArray.push(question)
      }
    })
    setQuestions(workingArray)
  }

  useEffect(() => {
    getTopicData()
  }, [topicId])
  useEffect(() => {
    getSubTopics()
  }, [superTopic])
  useEffect(() => {
    getPosts()
    getQuestions()
  }, [topicName])
  useEffect(() => {
    setTopThreeEmotions([])
    setOtherEmotions('')
    getEmotions()
  }, [posts])

  return (
    <div>
      {/* Banner */}
      <Card
        style={{
          width: '70%',
          height: '40vh',
          boxShadow: '5px 5px 5px lightgrey',
          margin: '0 auto',
          borderRadius: '0'
        }}
      >
        <CardImg
          src="https://i.imgur.com/7hJ45j1.jpg"
          style={{
            height: '40vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'end',
            borderRadius: '0'
          }}
        />
        <CardImgOverlay
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CardTitle
            tag="h4"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'grey'
            }}
          >
            {topicName}
          </CardTitle>
          <CardText
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'grey'
            }}
          >
            Category: {superTopic}
          </CardText>
          {topThreeEmotions.length > 0 && (
            <CardText>
              <small className="text-muted">
                {topThreeEmotions} {otherEmotions}
              </small>
            </CardText>
          )}
          <br />
          <div className="banner-buttons">
            {props.user && (
              <Button
                size="sm"
                onClick={toggleModal}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: 'grey',
                  backgroundColor: 'transparent',
                  border: 'grey solid 4px',
                  margin: '0 12px 10px 12px'
                }}
              >
                ADD POST
              </Button>
            )}
            {props.user && (
              <Button
                size="sm"
                onClick={toggleQuestionModal}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: 'grey',
                  backgroundColor: 'transparent',
                  border: 'grey solid 4px',
                  margin: '0 12px 10px 12px'
                }}
              >
                ADD QUESTION
              </Button>
            )}
          </div>
        </CardImgOverlay>
      </Card>
      <br />
      <br />

      {/* Checking and Displaying Subtopics */}
      {subTopics.length > 0 && (
        <div>
          <p
            style={{
              marginLeft: '6vw',
              marginRight: '6vw',
              fontSize: 'smaller'
            }}
          >
            <span style={{ fontWeight: 'bold' }}>Note:</span> This page is a
            category page. If you're looking to read or post about this
            category, you're in the right place. Otherwise, use the links below
            to get to the specific prayer you're looking for.
          </p>
          <SuperTopic
            array={subTopics}
            superTopic={topicName}
            loading={loading}
          />
        </div>
      )}
      <br />
      <br />

      {/* Toggling between Posts and Questions */}
      <Nav tabs justified>
        <NavItem></NavItem>
        <NavItem>
          <NavLink
            onClick={() => toggleContent('posts')}
            className={classnames({ active: content === 'posts' })}
            style={{ color: 'black' }}
          >
            Posts
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            onClick={() => toggleContent('questions')}
            className={classnames({ active: content === 'questions' })}
            style={{ color: 'black' }}
          >
            Questions
          </NavLink>
        </NavItem>
        <NavItem></NavItem>
      </Nav>
      {content === 'posts' &&
        posts.map((post) => (
          <Link
            key={post.id}
            to={`/t/${topicId}/${post.id}`}
            style={{ textDecoration: 'none' }}
          >
            <PostCard post={post} />
          </Link>
        ))}
      {content === 'posts' && posts.length === 0 && (
        <div>
          <br />
          <p className="blank">No Posts Yet!</p>
          <br />
        </div>
      )}
      {content === 'questions' &&
        questions.map((question) => (
          <Link
            key={question.id}
            to={`/t/${topicId}/q/${question.id}`}
            style={{ textDecoration: 'none' }}
          >
            <QuestionCard question={question} />
          </Link>
        ))}
      {content === 'questions' && questions.length === 0 && (
        <div>
          <br />
          <p className="blank">No Questions Yet!</p>
          <br />
        </div>
      )}
      <br />
      <br />
      {/* Modal Forms for Posts and Questions */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          Create a Post about {topicName}
        </ModalHeader>
        <ModalBody>
          <PostForm user={props.user} handleChange={handleChange} />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={(e) => {
              handleSubmit(e)
              toggleModal()
            }}
          >
            Submit
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={questionModal} toggle={toggleQuestionModal}>
        <ModalHeader toggle={toggleQuestionModal}>
          Ask a Question about {topicName}
        </ModalHeader>
        <ModalBody>
          <QuestionForm user={props.user} handleChange={handleChangeQuestion} />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={(e) => {
              handleSubmitQuestion(e)
              toggleQuestionModal()
            }}
          >
            Submit
          </Button>
          <Button color="secondary" onClick={toggleQuestionModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default TopicPage
