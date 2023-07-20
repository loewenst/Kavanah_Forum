import { Card, CardBody, Row, Col, CardText } from 'reactstrap'

const PostCard = (props) => {
  return (
    <div style={{ marginTop: '2vh' }}>
      <Card style={{ backgroundColor: 'darkgreen', width: '90vw' }}>
        <CardBody>
          <Card style={{ borderColor: '#09230f' }}>
            <CardBody style={{ backgroundColor: '#09230f' }}>
              <CardText style={{ fontSize: '3.5vw', color: 'white' }}>
                {props.post.tldr}
              </CardText>
            </CardBody>
          </Card>
          <Row style={{ marginTop: '10px' }}>
            <Col>
              <Card
                style={{ borderColor: '#09230f', backgroundColor: '#09230f' }}
              >
                <CardText
                  style={{
                    fontSize: '3.5vw',
                    color: 'white',
                    paddingTop: '5px',
                    paddingBottom: '5px'
                  }}
                >
                  {' '}
                  <span style={{ fontSize: '2.5vw' }}>Primary Emotion:</span>
                  <br />
                  {props.post.main_emotion}
                </CardText>
              </Card>
            </Col>
            <Col style={{ fontSize: '3vw' }}>
              <p style={{ marginBottom: '0', marginTop: '.5rem' }}>
                by {props.post.user.email}
              </p>
              <p style={{ marginBottom: '0' }}>
                <span>Helpful:</span> | <span>Grounded:</span>{' '}
              </p>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  )
}

export default PostCard

{
  /* <div className="card">
<h5>Emotion: Awe</h5>
<h5>
  I feel amazed that God created something so complex and integrated{' '}
</h5>
<h5>Helpful: | Grounded: | Comments: </h5>
</div> */
}
