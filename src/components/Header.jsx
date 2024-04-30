import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../stylesheets/header.css'



const Header = () => {
  return (
    <div>

      <Navbar expand="lg" className="bg-body-tertiary">
          <Navbar.Brand href="#">MovieHub</Navbar.Brand>
      </Navbar>
    </div>
  )
}

export default Header