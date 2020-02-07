import React from "react"
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "gatsby"

const Header = ({ siteTitle }) => (
  <Navbar bg="light" expand="sm">
    <Navbar.Brand href="">{ siteTitle }</Navbar.Brand>
    <Link to="/app/implementations" className="nav-item">Implementations</Link>
  </Navbar>
);

export default Header
