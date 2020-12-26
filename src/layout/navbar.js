/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-expressions */
import React, { useContext, useState } from 'react';
import {
  Navbar, NavbarToggler, Collapse, Nav, NavItem, NavLink,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import firebase from '../firebase/Firebase';

const NavbarLayout = () => {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => setIsOpen(!isOpen);

  const loadProfile = () => {
    history.replace('/profile');
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('logout successfully');
      })
      .catch((error) => {
        console.error(`logout failed ${error}`);
      });
  };

  return (
    <Navbar className="bg-dark navbar-dark sticky-top" expand="md">
      <NavbarToggler onClick={toggleNav} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem style={{ display: currentUser ? 'block' : 'none' }}>
            <NavLink
              style={{ display: currentUser ? 'block' : 'none', cursor: 'pointer' }}
              onClick={loadProfile}
            >
              Profile
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ display: currentUser ? 'block' : 'none', cursor: 'pointer' }}
              onClick={() => logout()}
            >
              Logout
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavbarLayout;
