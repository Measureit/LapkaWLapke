import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import NewsletterSection from '../components/NewsletterSection.tsx';
import PawLogo from '../components/PawLogo.tsx';
import type { BlogPost } from '../hooks/useBlogPosts.ts';

const HomePage: React.FC = () => {
  const [setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
    const importPosts = async () => {
      const postFiles = import.meta.glob('../posts/*.md', { eager: true, as: 'raw' });
      const loadedPosts = Object.entries(postFiles).map(([, content]) => {

        const [metaRaw, ...body] = content.split('---').filter(Boolean);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const meta: any = {};
        metaRaw.split('\n').forEach(line => {
          const [key, value] = line.split(':').map(s => s.trim());
          if (key) meta[key] = value;
        });
        return {
          ...meta,
          content: body.join('---')
        };
      });
      setPosts(loadedPosts);
    };
    importPosts();
  }, []);

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
