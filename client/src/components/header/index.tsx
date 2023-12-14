import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/auth.context";
import { UserFetch } from "../../api/user.fetch";

export const Header = () => {
  const authContext = useContext(AuthContext);
  const logout = async () => {
    await UserFetch.logout();
    authContext?.set(null);
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <Link to={"/"}>Forum</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {authContext?.data && (
              <NavDropdown
                title={authContext.data.username}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">
                  <Link to={"/"} onClick={logout}>
                    Logout
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Delete account
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  <Link to={"/notifications"}>Notifications</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to={"/post/create"}>Create post</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            )}
          </Nav>
          <Nav className="me-right">
            {authContext?.data ? (
              <Nav.Link></Nav.Link>
            ) : (
              <>
                <Nav.Link>
                  <Link to={"/auth/login"}>Login</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to={"/auth/register"}>Register</Link>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
