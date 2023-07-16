import { GoogleLogout } from 'react-google-login'

const clientId = `${import.meta.env.VITE_GOOGLE_ID}`

const Logout = (props) => {
  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText={'Logout'}
        onLogoutSuccess={props.onLogoutSuccess}
      />
    </div>
  )
}

export default Logout
