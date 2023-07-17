import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button, Card, CardHeader, CardBody, Collapse } from 'reactstrap'
import * as AiIcons from 'react-icons/ai'

const SuperTopic = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const topic = props.superTopic

  return (
    <Card
      className="my-2"
      inverse
      style={{ width: '90vw', backgroundColor: '#76c18a' }}
    >
      <CardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ textAlign: 'left' }}>{topic}</div>

        <div onClick={toggle}>
          <AiIcons.AiOutlineDown />
        </div>
      </CardHeader>
      <Collapse isOpen={isOpen}>
        <CardBody
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            maxWidth: '90vw',
            paddingLeft: '2.4vw'
          }}
        >
          {props.array.map((topic) => (
            <Link key={topic.pk} to={`/t/${topic.pk}`}>
              <Button
                style={{
                  backgroundColor: '#086320',
                  width: '28vw',
                  margin: '2px'
                }}
              >
                {topic.title}
              </Button>
            </Link>
          ))}
        </CardBody>
      </Collapse>
    </Card>
  )
}

export default SuperTopic
