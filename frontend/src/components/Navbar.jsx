import { Nav, NavItem, NavLink } from 'reactstrap'

const Navbar = () => {
  return (
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
  )
}

export default Navbar
