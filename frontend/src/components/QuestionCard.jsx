import { Card, CardBody, Row, Col, CardText } from 'reactstrap'

const QuestionCard = (props) => {
  return (
    <div style={{ marginTop: '2vh' }}>
      <Card style={{ backgroundColor: 'darkgreen', width: '90vw' }}>
        <CardBody>
          <Card style={{ borderColor: '#09230f' }}>
            <CardBody style={{ backgroundColor: '#09230f' }}>
              <CardText style={{ fontSize: '3.5vw', color: 'white' }}>
                {props.question.question_text}
              </CardText>
            </CardBody>
          </Card>
          <Row style={{ marginTop: '10px' }}>
            <Col style={{ fontSize: '3vw' }}>
              <p style={{ marginBottom: '0', marginTop: '.5rem' }}>
                by {props.question.user.email}
              </p>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  )
}

export default QuestionCard
