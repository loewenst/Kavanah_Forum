import { useEffect, useState } from 'react'
import axios from 'axios'
import SuperTopic from '../components/SuperTopic'

const Topics = (props) => {
  //setting the topics from the backend
  const [topics, setTopics] = useState([])

  const getTopics = async () => {
    const response = await axios.get(
      'https://kavanahforum-e2c5663ae901.herokuapp.com/api/topics/'
    )
    console.log(response.data)
    setTopics(response.data)
  }

  useEffect(() => {
    getTopics()
  }, [])

  const getSuperTopicArray = (topic) => {
    console.log(topics)
    console.log(topic)
    let workingArray = []
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].superTopic === topic) {
        workingArray.push(topics[i])
      }
    }
    console.log(workingArray)
    return workingArray
  }

  const shacharitArray = getSuperTopicArray('Shacharit')
  const minchahArray = getSuperTopicArray('Minchah')
  const maarivArray = getSuperTopicArray('Maariv')
  console.log(shacharitArray)

  return (
    <div>
      <br />
      <h2 style={{ textAlign: 'center' }}>All Categories</h2>
      <br />
      <br />
      <SuperTopic superTopic={'Shacharit'} array={shacharitArray} />
      <SuperTopic superTopic={'Minchah'} array={minchahArray} />
      <SuperTopic superTopic={'Maariv'} array={maarivArray} />
    </div>
  )
}

export default Topics
