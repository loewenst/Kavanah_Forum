import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Topics = () => {
  const [topics, setTopics] = useState([])

  const getTopics = async () => {
    const response = await axios.get('http://localhost:8000/api/topics')
    console.log(response.data)
    setTopics(response.data)
  }

  useEffect(() => {
    getTopics()
  }, [])

  return (
    <div>
      {topics.map((topic) => (
        <Link key={topic.pk} to={`/t/${topic.pk}`}>
          <h2>Topic: {topic.title}</h2>
        </Link>
      ))}
    </div>
  )
}

export default Topics
