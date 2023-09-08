import { Card, CardBody, CardText } from 'reactstrap'

const LatestSkeletonCard = (props) => {
  return (
    <div style={{ marginTop: '2vh' }}>
      <Card style={{ width: '90%', minWidth: '250px' }}>
        <CardBody>
          <Card
            style={{
              borderColor: 'grey',
              marginBottom: '5px',
              height: '25px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div className="skeleton-homepage skeleton-heading"></div>
          </Card>
          <div className="skeleton-text-group" style={{ marginTop: '10px' }}>
            <div className="skeleton-homepage skeleton-text"></div>
            <div className="skeleton-homepage skeleton-text"></div>
            <div className="skeleton-homepage skeleton-text"></div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              marginTop: '20px',
              marginBottom: '15px'
            }}
          >
            <div className="skeleton-homepage skeleton-text-small"></div>
            <div className="skeleton-homepage skeleton-text-small"></div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default LatestSkeletonCard
