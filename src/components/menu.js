import Container from 'react-bootstrap/Container';
import { Stack, Nav, Navbar } from "react-bootstrap";
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
        <Navbar.Brand href="/dashboard">Projeto de Bloco</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Stack direction="horizontal">
              <Nav.Link href="/class/new">Nova Classe</Nav.Link>
              <Nav.Link href="/class/list">Minhas Classes</Nav.Link>
              <Nav.Link href="/profile">Perfil</Nav.Link>
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