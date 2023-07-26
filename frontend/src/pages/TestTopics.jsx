import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button, Card, CardHeader, CardBody, Collapse } from 'reactstrap'
import axios from 'axios'
import * as AiIcons from 'react-icons/ai'
import SuperTopic from '../components/SuperTopic'
import axiosInstance from '../components/AxiosInstance'

const TestTopics = (props) => {
  //setting the topics from the backend
  const [topics, setTopics] = useState([])
  const axiosBase = axiosInstance(localStorage.getItem('access_token'))

  const getTopics = async () => {
    const response = await axiosBase.get('topics/')
    console.log(response.data)
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