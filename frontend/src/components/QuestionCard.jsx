import { Card, CardBody, Row, Col, CardText } from 'reactstrap'
import convertDate from './ConvertDate'
import { useMediaQuery } from 'react-responsive'

const QuestionCard = (props) => {
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
                    {props.question.user.email}
                    <br />
                    {convertDate(props.question.date)}
                  </CardText>
                </Card>
              </Col>
            )}
            <Col>
              <Card style={{ borderColor: '#09230f', height: '' }}>
                <CardBody style={{ backgroundColor: '#09230f' }}>
                  <CardText style={{ color: 'white', fontSize: '1.1em' }}>
                    {props.question.question_text}
                  </CardText>
                </CardBody>
              </Card>
              {isSmallScreen && (
                <div className="small-screen-postcard-bottom">
                  <p>{props.question.user.email}</p>
                  <p>||</p>
                  <p>{convertDate(props.question.date)}</p>
                </div>
              )}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  )
}

export default QuestionCard
