import { GoogleLogin } from 'react-google-login'
import axios from 'axios'

const clientId = `${import.meta.env.VITE_GOOGLE_ID}`
// const backendId = `${import.meta.env.VITE_DJANGO_ID}`
// const backendSecret = `${import.meta.env.VITE_DJANGO_SECRET}`

const Login = (props) => {
  // const djangoLogin = async (token) => {
  //   await axios
  //     .post('http://localhost:8000/auth/convert-token', {
  //       token: token,
  //       backend: 'google-oauth2',
  //       grant_type: 'convert_token',
  //       client_id: backendId,
  //       client_secret: backendSecret
  //     })
  //     .then((res) => {
  //       localStorage.setItem('access_token', res.data.access_token)
  //       localStorage.setItem('refresh_token', res.data.refresh_token)
  //       console.log('Hit Django!')
  //     })
  // }

  // const onSuccess = (res) => {
  //   console.log('LOGIN SUCCESSFUL! User: ', res.profileObj)
  //   console.log(res)
  //   djangoLogin(res.accessToken)
  // }

  const onFailure = (res) => {
    console.log('LOGIN FAILED! res: ', res)
  }

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={props.onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  )
}

export default Login
