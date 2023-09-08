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

const PostPageHeading = (props) => {
  const [modal, setModal] = useState(false)
  const toggleModal = () => {
    setModal(!modal)
  }

  //to enable/disable edit and delete buttons
  const checkUser = () => {
    if (props.post && props.user) {
      if (props.user.data.pk === props.post.user.id) {
        return true
      }
    }
    return false
  }

  const emotions = (post) => {
    if (post.third_emotion)
      return `${post.main_emotion}, ${post.second_emotion}, ${post.third_emotion}`
    if (post.second_emotion)
      return `${post.main_emotion}, ${post.second_emotion}`
    return post.main_emotion
  }

  return (
    <div>
      <Link to={`/t/${props.post.topic.id}`}>{props.post.topic.title}</Link>
      <br />
      <br />
      <Container style={{ marginLeft: '0' }}>
        <Row>
          <Col lg={10} md={10} xs={12}>
            <Card
              className="postHeadingCard"
              style={{ backgroundColor: 'darkgrey' }}
            >
              <h4>{props.post.tldr}</h4>
              <br />
              <p>Emotions: {emotions(props.post)}</p>
              {props.post.elaboration && <p>{props.post.elaboration}</p>}
              {props.post.sources && <p>{props.post.sources}</p>}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>
                  {props.post.user.email} | {convertDate(props.post.date)}
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
        <ModalHeader>Are you sure you want to delete this post?</ModalHeader>
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

export default PostPageHeading
