import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import NewsletterSection from '../components/NewsletterSection.tsx';
import PawLogo from '../components/PawLogo.tsx';
import { useHomePagePosts, type BlogPost } from '../hooks/useBlogSystem.ts';
import BlogPostDetail from '../components/BlogPostDetail.tsx';

const HomePage: React.FC = () => {
  const { posts, loading, error } = useHomePagePosts();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  console.log('🏠 HomePage render - posts:', posts.length, 'loading:', loading, 'error:', error);

  // Funkcja powrotu z przewijaniem na górę
  const handleBackToHome = () => {
    setSelectedPost(null);
    // Przewiń na górę po powrocie
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  // Jeśli wybrany jest konkretny post, pokaż jego szczegóły
  if (selectedPost) {
    return (
      <BlogPostDetail 
        post={selectedPost} 
        onBack={handleBackToHome} 
      />
    );
  }
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
                    <i className="bi bi-journal-bookmark-fill text-primary" style={{ fontSize: '3rem' }}></i>
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
          
          {loading && (
            <Row>
              <Col className="text-center">
                <p className="text-muted">Ładowanie postów...</p>
              </Col>
            </Row>
          )}
          
          {error && (
            <Row>
              <Col className="text-center">
                <p className="text-warning">{error}</p>
              </Col>
            </Row>
          )}
          
          {!loading && !error && posts.length === 0 && (
            <Row>
              <Col className="text-center">
                <p className="text-muted">Brak dostępnych postów</p>
              </Col>
            </Row>
          )}
          
          <Row>
            {posts.map((post) => (
              <Col md={4} key={post.id} className="mb-4">
                <Card className="h-100">
                  <Card.Img 
                    variant="top" 
                    src={post.image}
                    alt={post.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/300x200/bb8fce/ffffff?text=Artykuł';
                    }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <div className="blog-meta">
                      <i className="bi bi-calendar3 me-1"></i>
                      {new Date(post.date).toLocaleDateString('pl-PL', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text className="flex-grow-1">
                      {post.excerpt}
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <small className="text-muted">
                        <i className="bi bi-clock me-1"></i>
                        {post.readTime}
                      </small>
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => setSelectedPost(post)}
                      >
                        Czytaj więcej
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
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
