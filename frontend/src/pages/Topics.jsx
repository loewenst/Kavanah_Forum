import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button, Card, CardHeader, CardBody, Collapse } from 'reactstrap'
import axios from 'axios'
import * as AiIcons from 'react-icons/ai'
import SuperTopic from '../components/SuperTopic'

const Topics = () => {
  //setting the topics from the backend
  const [topics, setTopics] = useState([])
  const getTopics = async () => {
    const response = await axios.get('http://localhost:8000/api/topics')
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
