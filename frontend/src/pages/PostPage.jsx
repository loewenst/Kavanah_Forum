import { useParams } from 'react-router-dom'
import PostCard from '../components/PostCard'
import { useEffect, useState } from 'react'
import axiosInstance from '../components/AxiosInstance'
import PostEditForm from '../components/PostEditForm'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'

const PostPage = (props) => {
  const { postId } = useParams()
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
      setFormData({
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
    console.log(props)
    console.log(post)
    // if (props.user.id === post.user.id) {
    //   return true
    // }
    return false
  }

  const getPostById = async () => {
    console.log(postId)
    const response = await axiosBase.get(`posts/${postId}`)
    console.log(response)
    setPost(response.data)
  }

  const handleChange = () => {}
  const handleSubmit = () => {}

  useEffect(() => {
    getPostById()
  }, [postId])

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
      {/* {post && checkUser() && ( */}
      <Button style={{ width: '20vw' }} onClick={toggleModal}>
        Edit
      </Button>
      {/* )} */}
      <br />
      <Button style={{ width: '20vw' }}>Delete</Button>
      {post && (
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>
            Edit your Post about {post.topic.title}
          </ModalHeader>
          <ModalBody>
            <PostEditForm user={props.user} handleChange={handleChange} />
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
