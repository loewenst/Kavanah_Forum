import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  Card,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalFooter,
  Button
} from 'reactstrap'
import convertDate from './ConvertDate'
import * as AiIcons from 'react-icons/ai'

const QuestionPageHeading = (props) => {
  const [modal, setModal] = useState(false)
  const toggleModal = () => {
    setModal(!modal)
  }

  //to enable/disable edit and delete buttons
  const checkUser = () => {
    if (props.question && props.user) {
      if (props.user.data.pk === props.question.user.id) {
        return true
      }
    }
    return false
  }

  return (
    <div>
      <Link to={`/t/${props.question.topic.id}`}>
        {props.question.topic.title}
      </Link>
      <br />
      <br />
      <Container style={{ marginLeft: '0' }}>
        <Row>
          <Col lg={10} md={10} xs={12}>
            <Card
              className="postHeadingCard"
              style={{ backgroundColor: 'darkgrey' }}
            >
              <h4>{props.question.question_text}</h4>
              <br />
              {props.question.long_question_text && (
                <p>{props.question.long_question_text}</p>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>
                  {props.question.user.email} |{' '}
                  {convertDate(props.question.date)}
                </p>
                <div>
                  {checkUser() && (
                    <AiIcons.AiOutlineEdit
                      size={25}
                      style={{ marginRight: '10px' }}
                      onClick={props.toggleModal}
                    />
                  )}
                  {checkUser() && (
                    <AiIcons.AiOutlineDelete
                      size={25}
                      style={{ marginRight: '10px' }}
                      onClick={toggleModal}
                    />
                  )}
                </div>
              </div>
            </Card>
          </Col>
          {/* To be added when Helpful anf Grounded functionality is working: */}
          {/* <Col>
            <Card>
              <h5>Helpful:</h5>
              <h5>Grounded:</h5>
            </Card>
          </Col> */}
        </Row>
      </Container>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader>
          Are you sure you want to delete this question?
        </ModalHeader>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={(e) => {
              props.handleDelete(e)
              toggleModal()
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default QuestionPageHeading
