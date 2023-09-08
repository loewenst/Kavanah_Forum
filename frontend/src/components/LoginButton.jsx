import { GoogleLogin } from 'react-google-login'

const clientId = `${import.meta.env.VITE_GOOGLE_ID}`

const Login = (props) => {
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
