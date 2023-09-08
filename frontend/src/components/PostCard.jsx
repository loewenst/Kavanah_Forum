import { Card, CardBody, Row, Col, CardText } from 'reactstrap'
import convertDate from './ConvertDate'
import { useMediaQuery } from 'react-responsive'

const PostCard = (props) => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 800px)' })

  return (
    <div style={{ marginTop: '2vh' }}>
      <Card style={{ backgroundColor: 'darkgreen', width: '90vw' }}>
        <CardBody>
          <Row>
            {!isSmallScreen && (
              <Col sm={3} lg={3}>
                <Card
                  style={{
                    borderColor: '#09230f',
                    backgroundColor: '#09230f',
                    height: '100%'
                  }}
                >
                  <CardText
                    style={{
                      color: 'white',
                      paddingTop: '5px',
                      paddingBottom: '5px',
                      fontSize: '.85em'
                    }}
                  >
                    {' '}
                    <span>Primary Emotion:</span> {props.post.main_emotion}
                    <br />
                    {props.post.user.email}
                    <br />
                    {convertDate(props.post.date)}
                  </CardText>
                </Card>
              </Col>
            )}
            <Col>
              <Card style={{ borderColor: '#09230f', height: '' }}>
                <CardBody style={{ backgroundColor: '#09230f' }}>
                  <CardText style={{ color: 'white', fontSize: '1.1em' }}>
                    {props.post.tldr}
                  </CardText>
                </CardBody>
              </Card>
              {isSmallScreen && (
                <div className="small-screen-postcard-bottom">
                  <p>Primary Emotion: {props.post.main_emotion}</p>
                  <p>||</p>
                  <p>{props.post.user.email}</p>
                  <p>||</p>
                  <p>{convertDate(props.post.date)}</p>
                </div>
              )}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  )
}

export default PostCard
