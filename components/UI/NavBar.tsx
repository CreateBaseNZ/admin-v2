import React from 'react';
import Link from 'next/link';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

const NavBar = (props: any) => {
  return (
    <>
      <Navbar sticky="top" bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Dashboard" id="basic-nav-dropdown">
                <NavDropdown.Item className="p-0">
                  <Link href="/dashboard">
                    <div className="w-100 px-3 py-2">Overview</div>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item className="p-0">
                  <Link href="/dashboard/engagement">
                    <div className="w-100 px-3 py-2">Engagement</div>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {props.children}
    </>
  );
};

export default NavBar;
