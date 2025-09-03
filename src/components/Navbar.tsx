import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PawLogo from './PawLogo.tsx';

const Navbar: React.FC = () => {
  // Funkcja przewijania na górę przy kliknięciu w logo
  const handleLogoClick = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <BootstrapNavbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <LinkContainer to="/">
          <BootstrapNavbar.Brand 
            className="d-flex align-items-center" 
            onClick={handleLogoClick}
            style={{ cursor: 'pointer' }}
          >
            <PawLogo size={45} className="me-2 paw-logo" />
            <span className="fw-bold">Łapka w Łapkę</span>
          </BootstrapNavbar.Brand>
        </LinkContainer>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link>
                <i className="bi bi-house me-1"></i>
                Strona Główna
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/blog">
              <Nav.Link>
                <i className="bi bi-journal-text me-1"></i>
                Blog
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/sklep">
              <Nav.Link>
                <i className="bi bi-shop me-1"></i>
                Sklep
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/kontakt">
              <Nav.Link>
                <i className="bi bi-envelope me-1"></i>
                Kontakt
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
