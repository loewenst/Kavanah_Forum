import React, { useState } from 'react'
import { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import { gapi } from 'gapi-script'
import * as AiIcons from 'react-icons/ai'

const Header = (props) => {
  // setting side navbar state
  const [collapsed, setCollapsed] = useState('-100%')
  const toggleNavbar = () => {
    collapsed === '-100%' ? setCollapsed('0') : setCollapsed('-100%')
  }

  //authentication
  const clientId = `${import.meta.env.VITE_GOOGLE_ID}`
  useEffect(() => {
    const start = () => {
      gapi.client.init({
        client_id: clientId,
        scope: ''
      })
    }
    gapi.load('client:auth2', start)
  })

  //responsive design
  const isSmallScreen = useMediaQuery({ query: '(max-width: 550px)' })
  const checkSizeTopBar = () => {
    if (isSmallScreen) {
      return 'none'
    } else {
      return 'block'
    }
  }
  const checkSizeSideBar = () => {
    if (isSmallScreen) {
      return 'flex'
    } else {
      return 'none'
    }
  }

  return (
    <div>
      <div
        style={{
          background: 'rgb(54, 53, 53)',
          width: '175px',
          height: '100vh',
          display: 'flex',
          paddingLeft: '20px',
          paddingTop: '20px',
          position: 'fixed',
          top: '0',
          left: `${collapsed}`,
          transition: '.4s',
          zIndex: '10'
        }}
      >
        <Nav vertical style={{ paddingBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'right' }}>
            <AiIcons.AiOutlineLeft
              onClick={toggleNavbar}
              style={{ color: 'white' }}
            />
          </div>
          <NavItem>
            <NavLink href={'/'} style={{ color: 'white' }}>
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href={'/browse'} style={{ color: 'white' }}>
              Browse
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href={'/about'} style={{ color: 'white' }}>
              About
            </NavLink>
          </NavItem>
          <div>
            {props.user ? (
              <LogoutButton onLogoutSuccess={props.onLogoutSuccess} />
            ) : (
              <LoginButton onSuccess={props.onSuccess} />
            )}
          </div>
        </Nav>
      </div>
      <Navbar
        color="faded"
        light
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <NavbarBrand href="/">
            <img src="/Book.svg" alt="" style={{ height: '60px' }} />
          </NavbarBrand>

          <NavLink
            href={'/browse'}
            style={{
              paddingRight: '10px',
              paddingLeft: '10px',
              display: `${checkSizeTopBar()}`
            }}
          >
            Browse
          </NavLink>

          <NavLink
            href={'/about'}
            style={{ paddingLeft: '10px', display: `${checkSizeTopBar()}` }}
          >
            About
          </NavLink>
        </div>

        <div style={{ display: `${checkSizeTopBar()}` }}>
          {props.user ? (
            <LogoutButton onLogoutSuccess={props.onLogoutSuccess} />
          ) : (
            <LoginButton onSuccess={props.onSuccess} />
          )}
        </div>
        <NavbarToggler
          onClick={toggleNavbar}
          id="toggler"
          style={{ display: `${checkSizeSideBar()}` }}
        />
      </Navbar>
    </div>
  )
}

export default Header
