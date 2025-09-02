import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import NewsletterSection from '../components/NewsletterSection.tsx';
import PawLogo from '../components/PawLogo.tsx';

const HomePage: React.FC = () => {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row>
            <Col lg={10} xl={8} className="mx-auto">
              <div className="mb-4 pt-3">
                <PawLogo size={100} className="mb-3 paw-logo" animated={true} />
              </div>
              <h1>
                Łapka w Łapkę
              </h1>
              <p className="lead">
                Twoje miejsce dla wszystkich miłośników zwierząt. 
                Odkryj porady, produkty i społeczność pasjonatów psów!
              </p>
              <LinkContainer to="/blog">
                <Button variant="light" size="lg" className="me-3">
                  <i className="bi bi-journal-text me-2"></i>
                  Czytaj Blog
                </Button>
              </LinkContainer>
              <LinkContainer to="/sklep">
                <Button variant="outline-light" size="lg">
                  <i className="bi bi-shop me-2"></i>
                  Odwiedź Sklep
                </Button>
              </LinkContainer>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="text-primary mb-3">Dlaczego Łapka w Łapkę?</h2>
              <p className="lead text-muted">
                Jesteśmy społecznością ludzi, którzy kochają zwierzęta tak samo jak Ty
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="mb-3">
                    <i className="bi bi-journal-heart text-primary" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <Card.Title className="text-primary">Blog o Psach</Card.Title>
                  <Card.Text>
                    Czytaj najnowsze artykuły o opiece nad psami, treningu, 
                    zdrowiu i fascynujących historiach z psiego świata.
                  </Card.Text>
                  <LinkContainer to="/blog">
                    <Button variant="outline-primary">
                      Czytaj więcej <i className="bi bi-arrow-right ms-1"></i>
                    </Button>
                  </LinkContainer>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="mb-3">
                    <i className="bi bi-shop text-primary" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <Card.Title className="text-primary">Sklep dla Pupili</Card.Title>
                  <Card.Text>
                    Znajdź wszystko czego potrzebuje Twój pies - od karmy premium, 
                    przez zabawki, po akcesoria i produkty pielęgnacyjne.
                  </Card.Text>
                  <LinkContainer to="/sklep">
                    <Button variant="outline-primary">
                      Zobacz ofertę <i className="bi bi-arrow-right ms-1"></i>
                    </Button>
                  </LinkContainer>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="mb-3">
                    <i className="bi bi-people-fill text-primary" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <Card.Title className="text-primary">Społeczność</Card.Title>
                  <Card.Text>
                    Dołącz do społeczności miłośników zwierząt. Dziel się doświadczeniami, 
                    zadawaj pytania i poznawaj innych właścicieli psów.
                  </Card.Text>
                  <LinkContainer to="/kontakt">
                    <Button variant="outline-primary">
                      Dołącz do nas <i className="bi bi-arrow-right ms-1"></i>
                    </Button>
                  </LinkContainer>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="mb-5">
            <Col>
              <h2 className="text-center text-primary mb-3">Najnowsze wpisy z bloga</h2>
              <p className="text-center text-muted">
                Poznaj najnowsze porady i ciekawostki ze świata psów
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100">
                <Card.Img 
                  variant="top" 
                  src="https://via.placeholder.com/300x200/bb8fce/ffffff?text=Pies+w+parku"
                  alt="Pies bawiący się w parku"
                />
                <Card.Body>
                  <div className="blog-meta">
                    <i className="bi bi-calendar3 me-1"></i>
                    15 stycznia 2025
                  </div>
                  <Card.Title>Jak trenować szczeniaka - pierwszy krok</Card.Title>
                  <Card.Text>
                    Poznaj podstawowe zasady treningu szczeniąt i dowiedz się, 
                    jak zbudować silną więź ze swoim nowym przyjacielem.
                  </Card.Text>
                  <Button variant="primary" size="sm">
                    Czytaj więcej
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100">
                <Card.Img 
                  variant="top" 
                  src="https://via.placeholder.com/300x200/bb8fce/ffffff?text=Zdrowa+karma"
                  alt="Miska z zdrową karmą dla psa"
                />
                <Card.Body>
                  <div className="blog-meta">
                    <i className="bi bi-calendar3 me-1"></i>
                    12 stycznia 2025
                  </div>
                  <Card.Title>Zdrowe odżywianie psa - kompletny przewodnik</Card.Title>
                  <Card.Text>
                    Wszystko co musisz wiedzieć o prawidłowym karmieniu swojego psa, 
                    aby zapewnić mu długie i zdrowe życie.
                  </Card.Text>
                  <Button variant="primary" size="sm">
                    Czytaj więcej
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100">
                <Card.Img 
                  variant="top" 
                  src="https://via.placeholder.com/300x200/bb8fce/ffffff?text=Pielęgnacja+psa"
                  alt="Pielęgnacja i szczotkowanie psa"
                />
                <Card.Body>
                  <div className="blog-meta">
                    <i className="bi bi-calendar3 me-1"></i>
                    8 stycznia 2025
                  </div>
                  <Card.Title>Pielęgnacja sierści - sekrety profesjonalistów</Card.Title>
                  <Card.Text>
                    Dowiedz się, jak prawidłowo pielęgnować sierść swojego psa 
                    i jakie produkty wybrać dla różnych typów psiej sierści.
                  </Card.Text>
                  <Button variant="primary" size="sm">
                    Czytaj więcej
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <LinkContainer to="/blog">
                <Button variant="outline-primary" size="lg">
                  Zobacz wszystkie wpisy <i className="bi bi-arrow-right ms-1"></i>
                </Button>
              </LinkContainer>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Popular Products */}
      <section className="py-5">
        <Container>
          <Row className="mb-5">
            <Col>
              <h2 className="text-center text-primary mb-3">Popularne produkty</h2>
              <p className="text-center text-muted">
                Najchętniej wybierane przez naszą społeczność produkty dla psów
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="mb-4">
              <Card className="product-card h-100">
                <Card.Img 
                  variant="top" 
                  src="https://via.placeholder.com/250x200/8e44ad/ffffff?text=Karma+Premium"
                  alt="Karma premium dla psów"
                  className="product-image"
                />
                <Card.Body>
                  <Card.Title className="h6">Karma Premium Adult</Card.Title>
                  <Card.Text className="small text-muted">
                    Wysokiej jakości karma dla dorosłych psów wszystkich ras
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="price">89,99 zł</span>
                    <Button variant="primary" size="sm">
                      <i className="bi bi-cart-plus"></i>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card className="product-card h-100">
                <Card.Img 
                  variant="top" 
                  src="https://via.placeholder.com/250x200/8e44ad/ffffff?text=Zabawka+Kong"
                  alt="Zabawka Kong dla psa"
                  className="product-image"
                />
                <Card.Body>
                  <Card.Title className="h6">Zabawka Kong Classic</Card.Title>
                  <Card.Text className="small text-muted">
                    Niezwykle wytrzymała zabawka, idealna do nadziewania smakołykami
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="price">45,99 zł</span>
                    <Button variant="primary" size="sm">
                      <i className="bi bi-cart-plus"></i>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card className="product-card h-100">
                <Card.Img 
                  variant="top" 
                  src="https://via.placeholder.com/250x200/8e44ad/ffffff?text=Smycz+LED"
                  alt="Smycz LED dla psa"
                  className="product-image"
                />
                <Card.Body>
                  <Card.Title className="h6">Smycz LED z odblaskami</Card.Title>
                  <Card.Text className="small text-muted">
                    Bezpieczne spacery po zmroku dzięki podświetlanej smyczy
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="price">29,99 zł</span>
                    <Button variant="primary" size="sm">
                      <i className="bi bi-cart-plus"></i>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card className="product-card h-100">
                <Card.Img 
                  variant="top" 
                  src="https://via.placeholder.com/250x200/8e44ad/ffffff?text=Szczotka"
                  alt="Szczotka do sierści psa"
                  className="product-image"
                />
                <Card.Body>
                  <Card.Title className="h6">Szczotka dla długiej sierści</Card.Title>
                  <Card.Text className="small text-muted">
                    Profesjonalna szczotka do pielęgnacji psów długowłosych
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="price">39,99 zł</span>
                    <Button variant="primary" size="sm">
                      <i className="bi bi-cart-plus"></i>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <LinkContainer to="/sklep">
                <Button variant="outline-primary" size="lg">
                  Zobacz cały sklep <i className="bi bi-arrow-right ms-1"></i>
                </Button>
              </LinkContainer>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
