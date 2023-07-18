import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../components/AxiosInstance'
import SuperTopic from '../components/SuperTopic'
import PostForm from '../components/PostForm'
import {
  Button,
  Card,
  CardImg,
  Collapse,
  CardImgOverlay,
  CardTitle,
  CardText
} from 'reactstrap'

const TopicPage = (props) => {
  let { topicId } = useParams()
  let emotionsArray = []
  const [subTopics, setSubTopics] = useState([])
  const [posts, setPosts] = useState([])
  const [topicName, setTopicName] = useState('')
  const [superTopic, setSuperTopic] = useState('')
  const [topThreeEmotions, setTopThreeEmotions] = useState([])
  const [otherEmotions, setOtherEmotions] = useState('')

  const getPostsByTopic = async () => {
    const token = localStorage.getItem('access_token')
    const response = await axiosInstance(token).get(`topics/${topicId}`)
    console.log(response.data)
    setPosts(response.data.posts)
    setTopicName(response.data.title)
    setSuperTopic(response.data.superTopic)
  }

  const getSubTopics = async () => {
    const token = localStorage.getItem('access_token')
    const response = await axiosInstance(token).get('topics/')
    console.log(response)
    let workingArray = []
    response.data.forEach((obj) => {
      if (obj.superTopic === topicName) {
        workingArray.push(obj)
      }
    })
    setSubTopics(workingArray)
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
  useEffect(() => {
    getEmotions()
  }, [topicId])
  //
  useEffect(() => {
    getPostsByTopic()
    getSubTopics()
  }, [topicId])
  //

  return (
    <div>
      <Card
        style={{
          width: '70%',
          height: '40vh',
          boxShadow: '5px 5px 5px lightgrey',
          margin: '0 auto'
        }}
      >
        <CardImg
          src="https://i.imgur.com/7hJ45j1.jpg"
          style={{
            height: '40vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'end'
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
          {topThreeEmotions.length > 0 && (
            <CardText>
              <small className="text-muted">
                {topThreeEmotions} {otherEmotions}
              </small>
            </CardText>
          )}
          <br />
          <Button
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'grey',
              backgroundColor: 'transparent',
              border: 'grey solid 4px'
            }}
          >
            ADD POST
          </Button>
          <br />
        </CardImgOverlay>
      </Card>
      <br />
      <br />
      {subTopics.length > 0 && (
        <div>
          <p style={{ marginLeft: '15vw', marginRight: '15vw' }}>
            This page is a category page. If you're looking to read or post
            about this category, you're in the right place. Otherwise, use the
            links below to get to the specific prayer you're looking for.
          </p>
          <SuperTopic array={subTopics} superTopic={topicName} />
        </div>
      )}
      <div className="card">
        <h5>Emotion: Awe</h5>
        <h5>
          I feel amazed that God created something so complex and integrated{' '}
        </h5>
        <h5>Helpful: | Grounded: | Comments: </h5>
      </div>
      <PostForm user={props.user} />
    </div>
  )
}

export default TopicPage
