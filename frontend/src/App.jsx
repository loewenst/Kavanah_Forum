import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Topics from './pages/Topics'
import TopicPage from './pages/TopicPage'
import PostPage from './pages/PostPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="browse" element={<Topics />} />
          <Route path="t/:topicId" element={<TopicPage />} />
          <Route path="t/:topicId/:postId" element={<PostPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
