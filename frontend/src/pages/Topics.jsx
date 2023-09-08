import { useEffect, useState } from 'react'
import axios from 'axios'
import SuperTopic from '../components/SuperTopic'

const Topics = (props) => {
  //setting the topics from the backend
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)

  const getTopics = async () => {
    const response = await axios.get(
      'https://kavanahforum-e2c5663ae901.herokuapp.com/api/topics/'
    )
    setTopics(response.data)
    setLoading(false)
  }

  useEffect(() => {
    getTopics()
  }, [])

  const getSuperTopicArray = (topic) => {
    let workingArray = []
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].superTopic === topic) {
        workingArray.push(topics[i])
      }
    }
    return workingArray
  }

  const shacharitArray = getSuperTopicArray('Shacharit')
  const minchahArray = getSuperTopicArray('Minchah')
  const maarivArray = getSuperTopicArray('Maariv')

  return (
    <div>
      <br />
      <h2 style={{ textAlign: 'center' }}>All Categories</h2>
      <br />
      <br />
      <SuperTopic
        superTopic={'Shacharit'}
        array={shacharitArray}
        loading={loading}
      />
      <SuperTopic
        superTopic={'Minchah'}
        array={minchahArray}
        loading={loading}
      />
      <SuperTopic superTopic={'Maariv'} array={maarivArray} loading={loading} />
    </div>
  )
}

export default Topics
