import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Topics from './pages/Topics'
import TopicPage from './pages/TopicPage'
import PostPage from './pages/PostPage'
import axios from 'axios'
import { useMediaQuery } from 'react-responsive'

function App() {
  //backend authentication and user setting
  const backendId = `${import.meta.env.VITE_DJANGO_ID}`
  const backendSecret = `${import.meta.env.VITE_DJANGO_SECRET}`

  const [user, setUser] = useState(null)

  const djangoLogin = async (token) => {
    await axios
      .post('http://localhost:8000/auth/convert-token', {
        token: token,
        backend: 'google-oauth2',
        grant_type: 'convert_token',
        client_id: backendId,
        client_secret: backendSecret
      })
      .then((res) => {
        localStorage.setItem('access_token', res.data.access_token)
        localStorage.setItem('refresh_token', res.data.refresh_token)
        console.log('Hit Django!')
      })
  }

  const onSuccess = (res) => {
    console.log('LOGIN SUCCESSFUL!')
    djangoLogin(res.accessToken)
    setUser(res.profileObj)
    console.log(res.profileObj)
  }

  const onLogoutSuccess = () => {
    console.log('LOGOUT SUCCESSFUL!')
    setUser(null)
  }

  const isSmallScreen = useMediaQuery({ query: '(max-width: 1224px)' })

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
              <Home onSuccess={onSuccess} onLogoutSuccess={onLogoutSuccess} />
            }
          />
          <Route path="about" element={<About />} />
          <Route path="browse" element={<Topics />} />
          <Route path="t/:topicId" element={<TopicPage user={user} />} />
          <Route path="t/:topicId/:postId" element={<PostPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
