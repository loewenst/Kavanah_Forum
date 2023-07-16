import React, { useState } from 'react'
import { useEffect } from 'react'
import {
  Collapse,
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

const Header = (props) => {
  const [collapsed, setCollapsed] = useState(true)

  const toggleNavbar = () => setCollapsed(!collapsed)

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

  return (
    <div>
      <Navbar color="faded" light>
        <NavbarToggler onClick={toggleNavbar} className="me-auto" />
        <NavbarBrand href="/" className="me-auto">
          reactstrap
        </NavbarBrand>
        {props.user ? (
          <LogoutButton onLogoutSuccess={props.onLogoutSuccess} />
        ) : (
          <LoginButton onSuccess={props.onSuccess} />
        )}
      </Navbar>
      <Collapse isOpen={!collapsed}>
        <Nav
          vertical
          style={{
            position: 'fixed',
            background: 'white',
            border: 'black solid .5px'
          }}
        >
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Another Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="#">
              Disabled Link
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </div>
  )
}

export default Header
