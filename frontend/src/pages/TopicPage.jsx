import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const TopicPage = () => {
  let { topicId } = useParams()
  let emotionsArray = [
    'Gratitude',
    'Gratitude',
    'Gratitude',
    'Humility',
    'Humility',
    'Awe',
    'Awe',
    'Awe',
    'Awe'
  ]
  const [posts, setPosts] = useState([])
  const [topicName, setTopicName] = useState('')
  const [topThreeEmotions, setTopThreeEmotions] = useState([])
  const [otherEmotions, setOtherEmotions] = useState('')

  const getPostsByTopic = async () => {
    const response = await axios.get('http://localhost:8000/api/topics/2')
    console.log(response.data)
    setPosts(response.data.posts)

    //   console.log(response.data.posts)
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

    //need a way to count the instances of an emotion
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
  }, [])
  //
  useEffect(() => {
    getPostsByTopic()
  }, [topicId])
  //

  return (
    <div>
      <div id="topicCard">
        <h1>{topicName}</h1>
        {/* later: {topicName} */}
        <br />
        <h4>
          Associated Emotions: {topThreeEmotions} {otherEmotions}
        </h4>
        <h4>Coming Soon: Text Link powered by Sefaria</h4>
        <h4>{posts.length} Posts</h4>
        <button>Add Post</button>
      </div>
      <div className="card">
        <h5>Emotion: Awe</h5>
        <h5>
          I feel amazed that God created something so complex and integrated{' '}
        </h5>
        <h5>Helpful: | Grounded: | Comments: </h5>
      </div>
    </div>
  )
}

export default TopicPage
