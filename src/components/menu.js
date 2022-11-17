import Container from 'react-bootstrap/Container';
import { Stack, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useEffect, useState } from 'react';

export default function Menu() {
  const [logout, setLogout] = useState(false)

  const handleLogout = () => {
    setLogout(true)
  }

  useEffect(() => {
    localStorage.setItem("userId", null)
    localStorage.setItem("profileType", null)
  }, [logout])

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Projeto de Bloco</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Stack direction="horizontal">
              <Nav.Link href="#home">Nova Classe</Nav.Link>
              <Nav.Link href="#link">Minhas Classes</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Stack>
            {
              window.location.pathname !== '/' && window.location.pathname !== '/register' &&
              <Nav.Link href="/" className="btn btn-primary text-white" onClick={handleLogout.bind(this)}>Sair</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}