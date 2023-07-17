import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button, Card, CardHeader, CardBody, Collapse } from 'reactstrap'
import axios from 'axios'
import * as AiIcons from 'react-icons/ai'

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

  //controlling the toggling of supertopics
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <br />
      <h2 style={{ textAlign: 'center' }}>All Categories</h2>
      <br />
      <br />
      <Card
        className="my-2"
        inverse
        style={{ width: '90vw', backgroundColor: '#76c18a' }}
      >
        <CardHeader
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <div style={{ textAlign: 'left' }}>Shacharit</div>

          <div onClick={toggle}>
            <AiIcons.AiOutlineDown />
          </div>
        </CardHeader>
        <Collapse isOpen={isOpen}>
          <CardBody style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {topics.map((topic) => (
              <Link key={topic.pk} to={`/t/${topic.pk}`}>
                <Button style={{ backgroundColor: '#086320', width: '30vw' }}>
                  {topic.title}
                </Button>
              </Link>
            ))}
          </CardBody>
        </Collapse>
      </Card>
    </div>
  )
}

export default Topics
