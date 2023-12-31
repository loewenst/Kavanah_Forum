import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Topics from './pages/Topics'
import TestTopics from './pages/TestTopics'
import TopicPage from './pages/TopicPage'
import PostPage from './pages/PostPage'
import QuestionPage from './pages/QuestionPage'
import axios from 'axios'
import axiosInstance from './components/AxiosInstance'

function App() {
  //backend authentication and user setting
  const backendId = `${import.meta.env.VITE_DJANGO_ID}`
  const backendSecret = `${import.meta.env.VITE_DJANGO_SECRET}`

  const [user, setUser] = useState(null)

  const getUserData = async (token) => {
    const axiosBase = axiosInstance(token)
    let response = await axiosBase.get('user_info/')
    setUser(response)
  }

  const djangoLogin = async (token) => {
    await axios
      .post(
        'https://kavanahforum-e2c5663ae901.herokuapp.com/auth/convert-token',
        {
          token: token,
          backend: 'google-oauth2',
          grant_type: 'convert_token',
          client_id: backendId,
          client_secret: backendSecret
        }
      )
      .then((res) => {
        localStorage.setItem('access_token', res.data.access_token)
        localStorage.setItem('refresh_token', res.data.refresh_token)
        console.log('Hit Django!')
        getUserData(res.data.access_token)
      })
  }

  const onSuccess = async (res) => {
    console.log('LOGIN SUCCESSFUL!')
    await djangoLogin(res.accessToken)
  }

  const onLogoutSuccess = () => {
    console.log('LOGOUT SUCCESSFUL!')
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setUser(null)
  }

  useEffect(() => {}, [user])

  return (
    <div>
      <Header
        user={user}
        onSuccess={onSuccess}
        onLogoutSuccess={onLogoutSuccess}
      />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onSuccess={onSuccess}
                onLogoutSuccess={onLogoutSuccess}
                user={user}
              />
            }
          />
          <Route path="about" element={<About />} />
          <Route path="browse" element={<Topics user={user} />} />
          <Route path="test" element={<TestTopics user={user} />} />
          <Route path="t/:topicId" element={<TopicPage user={user} />} />
          <Route path="t/:topicId/:postId" element={<PostPage user={user} />} />
          <Route
            path="t/:topicId/q/:questionId"
            element={<QuestionPage user={user} />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
