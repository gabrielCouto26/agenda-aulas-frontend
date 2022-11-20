import Container from 'react-bootstrap/Container';
import { Stack, Nav, Navbar } from "react-bootstrap";
import { useEffect, useState } from 'react';

export default function Menu() {
  const [userId, setUserId] = useState("")

  useEffect(() => {
    setUserId(localStorage.getItem("userId"))
  }, [userId])

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
              <Nav.Link href={`/profile/${userId}`}>Perfil</Nav.Link>
            </Stack>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}