import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axiosInstance from '../components/AxiosInstance'
import axios from 'axios'
import PostEditForm from '../components/PostEditForm'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import Comment from '../components/Comment'
import PostPageHeading from '../components/PostPageHeading'
import CommentForm from '../components/CommentForm'

const PostPage = (props) => {
  const navigate = useNavigate()
  const { postId, topicId } = useParams()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const axiosBase = axiosInstance(localStorage.getItem('access_token'))
  const [modal, setModal] = useState(false)

  const initialFormData = {
    main_emotion: '',
    second_emotion: '',
    third_emotion: '',
    tldr: '',
    elaboration: '',
    sources: ''
  }

  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    if (post) {
      setFormData({
        user: post.user.id,
        topic: post.topic.id,
        main_emotion: post.main_emotion,
        second_emotion: post.second_emotion,
        third_emotion: post.third_emotion,
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
    const response = await axiosBase.get(`posts/${postId}`)
    setPost(response.data)
  }

  const getComments = async () => {
    if (post) {
      const response = await axios.get(
        `https://kavanahforum-e2c5663ae901.herokuapp.com/api/comments/?post=${post.id}`
      )
      setComments(response.data)
    }
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
      topic: formData.topic,
      main_emotion: formData.main_emotion,
      second_emotion: formData.second_emotion,
      third_emotion: formData.third_emotion,
      tldr: formData.tldr,
      elaboration: formData.elaboration,
      sources: formData.sources
    }
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
    getComments()
  }, [post])

  useEffect(() => {
    checkUser()
  }, [props.user])

  //functions for editing

  return (
    <div
      style={{
        marginLeft: '20px',
        marginRight: '20px'
      }}
    >
      {post && (
        <PostPageHeading
          post={post}
          toggleModal={toggleModal}
          handleDelete={handleDelete}
          user={props.user}
        />
      )}

      <br />
      <br />
      <h3>Comments</h3>
      {!props.user && (
        <p style={{ fontSize: '.8em', fontStyle: 'italic' }}>
          Log In To Comment
        </p>
      )}
      <br />
      {props.user && (
        <CommentForm
          user={props.user}
          getComments={getComments}
          postId={postId}
        />
      )}
      <br />
      {comments &&
        comments.map((comment) => (
          <div key={comment.id}>
            <Comment
              comment={comment}
              user={props.user}
              postId={postId}
              getComments={getComments}
            />
          </div>
        ))}
      {comments && comments.length === 0 && (
        <div>
          <p className="blank">No Comments Yet!</p>
          <br />
        </div>
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
