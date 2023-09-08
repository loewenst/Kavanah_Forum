import { Card, CardBody, Row, Col, CardText } from 'reactstrap'
import convertDate from './ConvertDate'

const LatestQuestionCard = (props) => {
  return (
    <div style={{ marginTop: '2vh' }}>
      <Card style={{ width: '90%', minWidth: '250px' }}>
        <CardBody>
          <Card style={{ borderColor: 'grey', marginBottom: '5px' }}>
            <CardText>{props.question.topic.title}</CardText>
          </Card>

          {props.question.question_text}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              marginTop: '15px'
            }}
          >
            <p style={{ fontSize: '.75em' }}>by {props.question.user.email}</p>
            <p style={{ fontSize: '.75em' }}>
              {convertDate(props.question.date)}
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default LatestQuestionCard
