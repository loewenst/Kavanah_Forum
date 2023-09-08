import { useEffect, useState } from 'react'
import SuperTopic from '../components/SuperTopic'
import axiosInstance from '../components/AxiosInstance'

const TestTopics = (props) => {
  //setting the topics from the backend
  const [topics, setTopics] = useState([])
  const axiosBase = axiosInstance(localStorage.getItem('access_token'))

  const getTopics = async () => {
    const response = await axiosBase.get('topics/')
    setTopics(response.data)
  }

  useEffect(() => {
    if (props.user) {
      getTopics()
    } else {
      setTopics([])
    }
  }, [props.user])

  const getSuperTopicArray = (topic) => {
    let workingArray = []
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].superTopic === topic) {
        workingArray.push(topics[i])
      }
    }
    return workingArray
  }

  const patriotismArray = getSuperTopicArray('Patriotism')
  const sightsArray = getSuperTopicArray('Sights to See')

  return (
    <div>
      <br />
      <h2 style={{ textAlign: 'center' }}>All Categories</h2>
      <br />
      <br />
      <SuperTopic superTopic={'Patriotism'} array={patriotismArray} />
      <SuperTopic superTopic={'Sights to See'} array={sightsArray} />
    </div>
  )
}

export default TestTopics
