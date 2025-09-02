import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PawLogo from './PawLogo.tsx';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4}>
            <div className="d-flex align-items-center mb-3">
              <PawLogo size={40} className="me-2 paw-logo" animated={true} />
              <h5 className="mb-0">Łapka w Łapkę</h5>
            </div>
            <p>
              Twoje miejsce dla wszystkich miłośników zwierząt. 
              Odkryj świat pełen miłości do psów i innych pupili!
            </p>
          </Col>
          <Col md={2}>
            <h6>Nawigacja</h6>
            <ul className="list-unstyled">
              <li><a href="/">Strona Główna</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/sklep">Sklep</a></li>
              <li><a href="/kontakt">Kontakt</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h6>Kategorie</h6>
            <ul className="list-unstyled">
              <li><a href="/sklep?kategoria=karma">Karma dla psów</a></li>
              <li><a href="/sklep?kategoria=zabawki">Zabawki</a></li>
              <li><a href="/sklep?kategoria=akcesoria">Akcesoria</a></li>
              <li><a href="/sklep?kategoria=opieka">Pielęgnacja</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h6>Śledź nas</h6>
            <div className="d-flex gap-3">
              <a href="#" aria-label="Facebook">
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="bi bi-instagram fs-4"></i>
              </a>
              <a href="#" aria-label="YouTube">
                <i className="bi bi-youtube fs-4"></i>
              </a>
              <a href="#" aria-label="TikTok">
                <i className="bi bi-tiktok fs-4"></i>
              </a>
            </div>
          </Col>
        </Row>
        <hr className="my-4" />
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              &copy; 2025 Łapka w Łapkę. Wszystkie prawa zastrzeżone. 
              Stworzone z <i className="bi bi-heart-fill text-danger"></i> dla miłośników zwierząt.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
