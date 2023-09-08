import { Button, Card, CardGroup } from 'reactstrap'
import { Link } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'
import { useState, useEffect } from 'react'
import LatestPostCard from '../components/LatestPostCard'
import LatestQuestionCard from '../components/LatestQuestionCard'
import LatestSkeletonCard from '../components/LatestSkeletonCard'

const Home = (props) => {
  //state setting variables
  const [latestPosts, setLatestPosts] = useState([])
  const [latestQuestions, setLatestQuestions] = useState([])
  const [loading, setLoading] = useState(true)

  //needed for login button
  const clientId = `${import.meta.env.VITE_GOOGLE_ID}`
  const onFailure = (res) => {
    console.log('LOGIN FAILED! res: ', res)
  }

  //call for post and question subsets
  const getLatestPosts = async () => {
    const response = await axios.get(
      'https://kavanahforum-e2c5663ae901.herokuapp.com/api/latestposts/'
    )
    let workingArray = []
    response.data.forEach((post) => {
      workingArray.push(post)
    })
    setLatestPosts(workingArray)
    setLoading(false)
  }

  const getLatestQuestions = async () => {
    const response = await axios.get(
      'https://kavanahforum-e2c5663ae901.herokuapp.com/api/latestquestions/'
    )
    let workingArray = []
    response.data.forEach((question) => {
      workingArray.push(question)
    })
    setLatestQuestions(workingArray)
  }

  useEffect(() => {
    getLatestPosts()
    getLatestQuestions()
  }, [])

  return (
    <div>
      <div
        style={{
          height: '50vw',
          maxHeight: '75vh',
          backgroundImage: 'url("https://i.imgur.com/tSWprKA.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '2%'
          }}
        >
          <img
            src="/SVG-Kavanah-Logo.svg"
            alt=""
            style={{ height: '30vw', marginLeft: '10vw' }}
          />
          <div style={{ display: 'inline-block' }}>
            <Button
              style={{
                marginTop: '-5vh',
                marginRight: '12px',
                marginLeft: '12px'
              }}
            >
              <Link
                to={'/browse'}
                style={{ textDecoration: 'none', color: 'white' }}
              >
                Start Browsing
              </Link>
            </Button>
            {!props.user && (
              <GoogleLogin
                clientId={clientId}
                render={(renderProps) => (
                  <Button
                    style={{
                      marginTop: '-5vh',
                      marginRight: '12px',
                      marginLeft: '12px'
                    }}
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    Sign In or Sign Up
                  </Button>
                )}
                onSuccess={props.onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
              />
            )}
          </div>
        </div>
      </div>
      <Card
        style={{
          width: '80vw',
          minHeight: '40px',
          height: '10vh',
          marginTop: '-5vh',
          justifyContent: 'center'
        }}
      >
        Welcome to Kavanah, the crowd-sourced path to understanding and
        connecting to tefillah!
      </Card>
      <br />
      <br />
      <CardGroup style={{ width: '80vw', margin: '0 auto' }}>
        <Card style={{ padding: '10px', border: 'none' }}>
          <h5>Latest Posts</h5>
          {loading && (
            <div>
              <LatestSkeletonCard />
              <LatestSkeletonCard />
              <LatestSkeletonCard />
            </div>
          )}
          <div>
            {!loading &&
              latestPosts.length > 0 &&
              latestPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/t/${post.topic.id}/${post.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <LatestPostCard post={post} />
                </Link>
              ))}
          </div>
        </Card>
        <Card style={{ padding: '10px', border: 'none' }}>
          <h5>Latest Questions</h5>
          {loading && (
            <div>
              <LatestSkeletonCard />
              <LatestSkeletonCard />
              <LatestSkeletonCard />
            </div>
          )}
          <div>
            {!loading &&
              latestQuestions.length > 0 &&
              latestQuestions.map((question) => (
                <Link
                  key={question.id}
                  to={`/t/${question.topic.id}/${question.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <LatestQuestionCard question={question} />
                </Link>
              ))}
          </div>
        </Card>
      </CardGroup>
      <br />
      <br />
      {/* Latest Questions | Latest Posts */}
    </div>
  )
}

export default Home
