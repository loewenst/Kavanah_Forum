import { useState, useEffect } from 'react'

const TopicPage = () => {
  // let { topicId } = useParams()
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
  // const [posts, setPosts] = useState([])
  // const [topicName, setTopicName] = useState([])
  const [topThreeEmotions, setTopThreeEmotions] = useState([])
  const [otherEmotions, setOtherEmotions] = useState('')

  // const getPostsByTopic = async () => {
  //   const response = await axios.get(
  //     ?BACKEND CALL?
  //   )
  //   setPosts(response.data.posts) IT MIGHT NOT BE CALLED THIS
  //   console.log(response.data.posts)
  //   setTopicName(response.data.name)
  //   console.log(topicName)
  // }
  //
  const getEmotions = () => {
    // posts.forEach((post) => {
    //   emotionsArray.push(post.primaryEmotion)
    // })
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
  // useEffect(() => {
  //   getPostsByTopic()
  // }, [topicId])
  //

  return (
    <div>
      <div id="topicCard">
        <h1>Asher Yatzar</h1>
        {/* later: {topicName} */}
        <br />
        <h4>
          Associated Emotions: {topThreeEmotions} {otherEmotions}
        </h4>
        <h4>Coming Soon: Text Link powered by Sefaria</h4>
        <h4>X Posts</h4>
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
