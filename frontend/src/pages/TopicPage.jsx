import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axiosInstance from '../components/AxiosInstance'
import SuperTopic from '../components/SuperTopic'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
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
  const [topicName, setTopicName] = useState('')
  const [superTopic, setSuperTopic] = useState('')
  const [subTopics, setSubTopics] = useState([])
  const [topThreeEmotions, setTopThreeEmotions] = useState([])
  const [otherEmotions, setOtherEmotions] = useState('')
  const [content, setContent] = useState('posts')
  const [modal, setModal] = useState(false)

  const initialFormData = {
    main_emotion: '',
    tldr: '',
    elaboration: '',
    sources: ''
  }

  const [formData, setFormData] = useState(initialFormData)

  //State-Setting Functions
  const subTopicArray = []
  const getSubTopics = async () => {
    const token = localStorage.getItem('access_token')
    const response = await axiosInstance(token).get('topics/')
    console.log(topicName, response.data)
    response.data.forEach((obj) => {
      if (obj.superTopic === topicName) {
        subTopicArray.push(obj)
      }
    })
    console.log(subTopicArray)
    setSubTopics(subTopicArray)
  }

  const getTopicData = async () => {
    const token = localStorage.getItem('access_token')
    const response = await axiosInstance(token).get(`topics/${topicId}`)
    console.log(response.data)
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

  const getEmotions = () => {
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
    console.log(emotionsArray)
    if (emotionsArray.length > 3) {
      setTopThreeEmotions(
        `${emotionsArray[0]}, ${emotionsArray[1]}, ${emotionsArray[2]}`
      )
      setOtherEmotions(`and ${emotionsArray.length - 3} Others`)
    } else {
      setTopThreeEmotions(emotionsArray.join(', '))
    }
  }

  const toggleContent = (content) => {
    if (content === 'posts') {
      setContent('posts')
    }
    //The below is setup for a future feature
    if (content === 'questions') {
      setContent('questions')
    }
  }

  const toggleModal = () => setModal(!modal)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const obj = {
      user: props.user.data.pk,
      topic: parseInt(topicId),
      main_emotion: formData.main_emotion,
      tldr: formData.tldr,
      elaboration: formData.elaboration,
      sources: formData.sources
    }
    console.log(obj)
    const token = localStorage.getItem('access_token')
    await axiosInstance(token).post('createpost/', obj)
    const response = await axiosInstance(token).get(`posts/`)
    console.log('All posts:', response)
    let workingArray = []
    response.data.forEach((post) => {
      if (post.topic.title === topicName) {
        workingArray.push(post)
      }
    })
    console.log(workingArray)
    setPosts(workingArray)
  }

  useEffect(() => {
    getTopicData()
  }, [topicId])
  useEffect(() => {
    // getEmotions()
    getSubTopics()
  }, [superTopic])
  useEffect(() => {
    getPosts()
  }, [topicName])
  //

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
            justifyContent: 'end'
          }}
        >
          <CardTitle
            tag="h5"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'grey',
              fontSize: '30px'
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
          {/* {topThreeEmotions.length > 0 && (
            <CardText>
              <small className="text-muted">
                {topThreeEmotions} {otherEmotions}
              </small>
            </CardText>
          )} */}
          <br />
          {props.user && (
            <Button
              onClick={toggleModal}
              style={{
                fontFamily: "'Inter', sans-serif",
                color: 'grey',
                backgroundColor: 'transparent',
                border: 'grey solid 4px'
              }}
            >
              ADD POST
            </Button>
          )}
          <br />
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
          <SuperTopic array={subTopics} superTopic={topicName} />
        </div>
      )}
      <br />
      <br />
      {/* Toggling between Posts and Questions */}
      <Nav tabs justified>
        <NavItem></NavItem>
        <NavItem>
          <NavLink onClick={() => toggleContent('posts')} active>
            Posts
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
    </div>
  )
}

export default TopicPage
