import { useParams, useNavigate } from 'react-router-dom'
import PostCard from '../components/PostCard'
import { useEffect, useState } from 'react'
import axiosInstance from '../components/AxiosInstance'
import PostEditForm from '../components/PostEditForm'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'

const PostPage = (props) => {
  const navigate = useNavigate()
  const { postId, topicId } = useParams()
  const [post, setPost] = useState(null)
  const axiosBase = axiosInstance(localStorage.getItem('access_token'))
  const [modal, setModal] = useState(false)

  const initialFormData = {
    main_emotion: '',
    tldr: '',
    elaboration: '',
    sources: ''
  }

  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    if (post) {
      console.log(post)
      setFormData({
        user: post.user.id,
        topic: post.topic.id,
        main_emotion: post.main_emotion,
        tldr: post.tldr,
        elaboration: post.elaboration,
        sources: post.sources
      })
    }
  }, [post])

  const toggleModal = () => {
    setModal(!modal)
  }

  const checkUser = () => {
    if (post && props.user) {
      if (props.user.data.pk === post.user.id) {
        return true
      }
    }
    return false
  }

  const getPostById = async () => {
    console.log(postId)
    const response = await axiosBase.get(`posts/${postId}`)
    console.log(response)
    setPost(response.data)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const obj = {
      user: formData.user,
      topic: formData,
      main_emotion: formData.main_emotion,
      tldr: formData.tldr,
      elaboration: formData.elaboration,
      sources: formData.sources
    }
    console.log(obj)
    const token = localStorage.getItem('access_token')
    await axiosInstance(token).put(`modifypost/${postId}`, obj)
    await getPostById()
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('access_token')
    await axiosInstance(token).delete(`modifypost/${postId}`)
    navigate(`/t/${topicId}`)
  }

  useEffect(() => {
    getPostById()
  }, [postId])

  useEffect(() => {
    checkUser()
  }, [props.user])

  //functions for editing

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {post && <PostCard post={post} />}
      <br />
      {checkUser() && (
        <Button style={{ width: '20vw' }} onClick={toggleModal}>
          Edit
        </Button>
      )}
      <br />
      {checkUser() && (
        <Button onClick={handleDelete} style={{ width: '20vw' }}>
          Delete
        </Button>
      )}
      {post && (
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>
            Edit your Post about {post.topic.title}
          </ModalHeader>
          <ModalBody>
            <PostEditForm
              user={props.user}
              initialFormData={formData}
              handleChange={handleChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={(e) => {
                handleSubmit(e)
                toggleModal()
              }}
            >
              Update
            </Button>
            <Button color="secondary" onClick={toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  )
}

export default PostPage
