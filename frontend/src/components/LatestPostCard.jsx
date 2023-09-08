import { Card, CardBody, Row, Col, CardText } from 'reactstrap'
import convertDate from './ConvertDate'

//date formating
const LatestPostCard = (props) => {
  return (
    <div style={{ marginTop: '2vh' }}>
      <Card style={{ width: '90%', minWidth: '250px' }}>
        <CardBody>
          <Card style={{ borderColor: 'grey', marginBottom: '5px' }}>
            <CardText>{props.post.topic.title}</CardText>
          </Card>

          {props.post.tldr}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              marginTop: '15px'
            }}
          >
            <p style={{ fontSize: '.75em' }}>by {props.post.user.email}</p>
            <p style={{ fontSize: '.75em' }}>{convertDate(props.post.date)}</p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default LatestPostCard
