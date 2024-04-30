import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../stylesheets/header.css'



const Header = () => {
  return (
    <div>

      <Navbar expand="lg" className='head-nav'>
          <Navbar.Brand href="#" style={{color:"white",fontSize:"28px"}}>MovieHub</Navbar.Brand>
      </Navbar>
    </div>
  )
}

export default Header