import { Button } from 'reactstrap'

//div centered, fixed vw, set as flex display, space between, row
//first item is logo
//second item is a flex column with two buttons
//Logo in the middle of the image
//Browse button
//Sign in/ Sign up button

const Home = (props) => {
  return (
    <div
      style={{
        height: '50vw',
        maxHeight: '85vh',
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
          paddingTop: '10%'
        }}
      >
        <img
          src="/SVG-Kavanah-Logo.svg"
          alt=""
          style={{ height: '30vw', marginLeft: '10vw' }}
        />
        {/* <Button style={{ marginTop: '-100px' }}>Browse Kavanot</Button>
        <br />
        <Button>Sign In or Sign Up</Button> */}
      </div>
    </div>
  )
}

export default Home
