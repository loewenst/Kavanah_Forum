import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Button, Card, CardHeader, CardBody, Collapse } from 'reactstrap'
import * as AiIcons from 'react-icons/ai'

const SuperTopic = (props) => {
  const topic = props.superTopic

  //Controls for toggling subtopics
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  //Responsive design
  const isSmallScreen = useMediaQuery({ query: '(max-width: 900px)' })
  const checkSizeButtonsWidth = () => {
    if (isSmallScreen) {
      return '36vw'
    } else {
      return '28vw'
    }
  }
  const checkSizeButtonsHeight = () => {
    if (isSmallScreen) {
      return '10vh'
    } else {
      return 'auto'
    }
  }
  const checkSizeTextSize = () => {
    if (isSmallScreen) {
      return '.75em'
    } else {
      return '1em'
    }
  }

  //Style for Loading Skeleton
  const loadingStyle = {
    width: `${checkSizeButtonsWidth()}`,
    height: `${checkSizeButtonsHeight()}`,
    margin: '2px',
    border: 'none',
    minHeight: '35px'
  }

  return (
    <Card
      className="my-2"
      inverse
      style={{ width: '90vw', backgroundColor: '#76c18a' }}
    >
      <CardHeader
        onClick={toggle}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <div style={{ textAlign: 'left' }}>{topic}</div>

        <div>
          <AiIcons.AiOutlineDown />
        </div>
      </CardHeader>
      <Collapse isOpen={isOpen}>
        <CardBody
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '90vw'
          }}
        >
          {props.loading && (
            <div>
              <Button style={loadingStyle} className="skeleton"></Button>
              <Button style={loadingStyle} className="skeleton"></Button>
              <Button style={loadingStyle} className="skeleton"></Button>
            </div>
          )}
          {!props.loading &&
            props.array.map((topic) => (
              <Link key={topic.id} to={`/t/${topic.id}`}>
                <Button
                  style={{
                    backgroundColor: '#086320',
                    width: `${checkSizeButtonsWidth()}`,
                    height: `${checkSizeButtonsHeight()}`,
                    margin: '2px',
                    fontSize: `${checkSizeTextSize()}`
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
