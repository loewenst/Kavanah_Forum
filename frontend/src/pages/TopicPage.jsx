import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../components/AxiosInstance'
import PostForm from '../components/PostForm'

const TopicPage = (props) => {
  let { topicId } = useParams()
  let emotionsArray = []
  const [posts, setPosts] = useState([])
  const [topicName, setTopicName] = useState('')
  const [topThreeEmotions, setTopThreeEmotions] = useState([])
  const [otherEmotions, setOtherEmotions] = useState('')

  const getPostsByTopic = async () => {
    const response = await axiosInstance.get(`topics/${topicId}`)
    console.log(response.data)
    setPosts(response.data.posts)
    setTopicName(response.data.title)
  }
  //
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
  }, [topicId])
  //

  return (
    <div>
      <div
        style={{
          backgroundImage: 'url("https://i.imgur.com/7hJ45j1.jpg")',
          width: '70%',
          height: '40vh',
          boxShadow: '5px 5px 5px lightgrey',
          margin: '0 auto'
        }}
      >
        Boo
      </div>
      {/* 70% card or square with shadow,  */}
      <div id="topicCard">
        <h1>{topicName}</h1>
        <br />
        <h4>
          Associated Emotions: {topThreeEmotions} {otherEmotions}
        </h4>
        <h4>Coming Soon: Text Link powered by Sefaria</h4>
        <h4>{posts.length} Post(s)</h4>
        <button>Add Post</button>
      </div>
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
