import React from "react"
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from "gatsby"
import { useIdentityContext } from "react-netlify-identity-widget"

const Header = ({ siteTitle }) => {
  const { isLoggedIn } = useIdentityContext();

  return (
    <Navbar bg="light">
      <Navbar.Brand href="/">{ siteTitle }</Navbar.Brand>
      { !isLoggedIn &&
        <Nav.Link>
          <Link to="/app/login" className="nav-item">Login</Link>
        </Nav.Link>
      }
      { isLoggedIn &&
        <Nav.Link>
          <Link to="/app/dashboard" className="nav-item">dashboard</Link>
        </Nav.Link>
      }
    </Navbar>
  );
};

export default Header
