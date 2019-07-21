import React from 'react';
import { Navbar, NavbarBrand } from 'react-bootstrap';
import logo from '../assets/siteware-logo.svg';
import { Link } from 'react-router-dom';

class AppNavbar extends React.Component {

  render() {
    return (
        <Navbar fixed="top" bg="light">
          <NavbarBrand>
            <Link to="/">
              <img src={logo} height="33" width="120" />
            </Link>
          </NavbarBrand>
          <Link className="nav-link" to="/"> Produtos </Link>
          <Link className="nav-link" to="/create"> Cadastrar Produto </Link>
          <Link className="nav-link" to="/cart"> Carrinho </Link>
        </Navbar>
    )
  }
}

export default AppNavbar;