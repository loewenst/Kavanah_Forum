import { useState } from 'react'
import { Card, CardHeader, CardBody, Collapse } from 'reactstrap'
import * as AiIcons from 'react-icons/ai'

const SuperTopicPlaceholder = (props) => {
  const topic = props.superTopic

  //Controls for toggling subtopics
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Card
      className="my-2"
      inverse
      style={{ width: '90vw', backgroundColor: 'lightgrey' }}
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
          Coming Soon!
        </CardBody>
      </Collapse>
    </Card>
  )
}

export default SuperTopicPlaceholder
