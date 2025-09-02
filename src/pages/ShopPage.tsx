import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';

const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Wszystkie');
  const [sortBy, setSortBy] = useState('Popularne');

  const categories = [
    'Wszystkie', 'Karma', 'Zabawki', 'Akcesoria', 'Pielęgnacja', 'Zdrowie', 'Legowiska'
  ];

  const sortOptions = ['Popularne', 'Cena: od najniższej', 'Cena: od najwyższej', 'Najnowsze'];

  const products = [
    {
      id: 1,
      name: "Karma Premium Adult",
      category: "Karma",
      price: 89.99,
      originalPrice: 109.99,
      image: "https://via.placeholder.com/300x300/8e44ad/ffffff?text=Karma+Premium",
      rating: 4.8,
      reviews: 124,
      badge: "Bestseller",
      description: "Wysokiej jakości karma dla dorosłych psów wszystkich ras"
    },
    {
      id: 2,
      name: "Zabawka Kong Classic",
      category: "Zabawki",
      price: 45.99,
      image: "https://via.placeholder.com/300x300/8e44ad/ffffff?text=Kong+Classic",
      rating: 4.9,
      reviews: 89,
      badge: "Polecane",
      description: "Niezwykle wytrzymała zabawka, idealna do nadziewania smakołykami"
    },
    {
      id: 3,
      name: "Smycz LED z odblaskami",
      category: "Akcesoria",
      price: 29.99,
      originalPrice: 39.99,
      image: "https://via.placeholder.com/300x300/8e44ad/ffffff?text=Smycz+LED",
      rating: 4.6,
      reviews: 67,
      badge: "Promocja",
      description: "Bezpieczne spacery po zmroku dzięki podświetlanej smyczy"
    },
    {
      id: 4,
      name: "Szczotka dla długiej sierści",
      category: "Pielęgnacja",
      price: 39.99,
      image: "https://via.placeholder.com/300x300/8e44ad/ffffff?text=Szczotka",
      rating: 4.7,
      reviews: 156,
      description: "Profesjonalna szczotka do pielęgnacji psów długowłosych"
    },
    {
      id: 5,
      name: "Legowisko ortopedyczne",
      category: "Legowiska",
      price: 159.99,
      originalPrice: 199.99,
      image: "https://via.placeholder.com/300x300/8e44ad/ffffff?text=Legowisko",
      rating: 4.9,
      reviews: 203,
      badge: "Promocja",
      description: "Komfortowe legowisko z pianką memory foam dla starszych psów"
    },
    {
      id: 6,
      name: "Vitaminy dla psów",
      category: "Zdrowie",
      price: 49.99,
      image: "https://via.placeholder.com/300x300/8e44ad/ffffff?text=Vitaminy",
      rating: 4.5,
      reviews: 92,
      description: "Kompleks witamin i minerałów wspierających zdrowie psa"
    },
    {
      id: 7,
      name: "Interaktywna zabawka puzzle",
      category: "Zabawki",
      price: 69.99,
      image: "https://via.placeholder.com/300x300/8e44ad/ffffff?text=Puzzle+Toy",
      rating: 4.8,
      reviews: 134,
      badge: "Nowość",
      description: "Stymulująca umysłowo zabawka dla inteligentnych psów"
    },
    {
      id: 8,
      name: "Karma dla szczeniąt",
      category: "Karma",
      price: 79.99,
      image: "https://via.placeholder.com/300x300/8e44ad/ffffff?text=Karma+Puppy",
      rating: 4.7,
      reviews: 78,
      description: "Specjalnie sformułowana karma dla rosnących szczeniąt"
    },
    {
      id: 9,
      name: "Obroża regulowana",
      category: "Akcesoria",
      price: 24.99,
      image: "https://via.placeholder.com/300x300/8e44ad/ffffff?text=Obroża",
      rating: 4.4,
      reviews: 145,
      description: "Wygodna i bezpieczna obroża z możliwością regulacji"
    }
  ];

  const filteredProducts = selectedCategory === 'Wszystkie' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i 
          key={i} 
          className={`bi bi-star${i <= rating ? '-fill' : ''}`}
          style={{ color: '#ffc107' }}
        ></i>
      );
    }
    return stars;
  };

  return (
    <div className="fade-in">
      {/* Header Section */}
      <section className="shop-header py-5 bg-light">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h1 className="text-primary mb-3">
                <i className="bi bi-shop me-3"></i>
                Sklep Łapka w Łapkę
              </h1>
              <p className="lead text-muted">
                Wszystko czego potrzebuje Twój pies w jednym miejscu. 
                Wysokiej jakości produkty wybrane przez ekspertów.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Filters and Search */}
      <section className="py-4 border-bottom bg-white">
        <Container>
          <Row className="align-items-center mb-3">
            <Col md={8}>
              <Form.Control
                type="search"
                placeholder="Szukaj produktów..."
                className="search-input"
              />
            </Col>
            <Col md={4}>
              <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                {sortOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          
          <Row>
            <Col>
              <div className="d-flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "primary" : "outline-secondary"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="category-btn"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Products Grid */}
      <section className="py-5">
        <Container>
          <Row className="mb-4">
            <Col>
              <p className="text-muted">
                Znaleziono {filteredProducts.length} produktów
                {selectedCategory !== 'Wszystkie' && ` w kategorii "${selectedCategory}"`}
              </p>
            </Col>
          </Row>
          
          <Row>
            {filteredProducts.map((product) => (
              <Col lg={4} md={6} key={product.id} className="mb-4">
                <Card className="h-100 product-card">
                  <div className="position-relative">
                    <Card.Img 
                      variant="top" 
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                    {product.badge && (
                      <Badge 
                        bg={
                          product.badge === 'Bestseller' ? 'success' :
                          product.badge === 'Promocja' ? 'danger' :
                          product.badge === 'Nowość' ? 'info' : 'primary'
                        }
                        className="position-absolute top-0 start-0 m-2"
                      >
                        {product.badge}
                      </Badge>
                    )}
                    <Button 
                      variant="light" 
                      size="sm"
                      className="position-absolute top-0 end-0 m-2 wishlist-btn"
                    >
                      <i className="bi bi-heart"></i>
                    </Button>
                  </div>
                  
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="h6">{product.name}</Card.Title>
                    <Card.Text className="small text-muted flex-grow-1">
                      {product.description}
                    </Card.Text>
                    
                    <div className="mb-3">
                      <div className="d-flex align-items-center mb-1">
                        <div className="me-2">
                          {renderStars(Math.floor(product.rating))}
                        </div>
                        <small className="text-muted">
                          {product.rating} ({product.reviews} opinii)
                        </small>
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <span className="price h5 mb-0">{product.price.toFixed(2)} zł</span>
                          {product.originalPrice && (
                            <small className="text-decoration-line-through text-muted ms-2">
                              {product.originalPrice.toFixed(2)} zł
                            </small>
                          )}
                        </div>
                      </div>
                      
                      <div className="d-grid gap-2">
                        <Button variant="primary">
                          <i className="bi bi-cart-plus me-2"></i>
                          Dodaj do koszyka
                        </Button>
                        <Button variant="outline-primary" size="sm">
                          <i className="bi bi-eye me-2"></i>
                          Szczegóły
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Load More Button */}
          <Row className="mt-5">
            <Col className="text-center">
              <Button variant="outline-primary" size="lg">
                Załaduj więcej produktów
                <i className="bi bi-arrow-down ms-2"></i>
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row>
            <Col md={3} className="text-center mb-4">
              <i className="bi bi-truck text-primary mb-3" style={{ fontSize: '2.5rem' }}></i>
              <h5>Darmowa dostawa</h5>
              <p className="text-muted small">Przy zamówieniach powyżej 150 zł</p>
            </Col>
            <Col md={3} className="text-center mb-4">
              <i className="bi bi-arrow-repeat text-primary mb-3" style={{ fontSize: '2.5rem' }}></i>
              <h5>30 dni na zwrot</h5>
              <p className="text-muted small">Bez pytania o powód</p>
            </Col>
            <Col md={3} className="text-center mb-4">
              <i className="bi bi-shield-check text-primary mb-3" style={{ fontSize: '2.5rem' }}></i>
              <h5>Gwarancja jakości</h5>
              <p className="text-muted small">Tylko sprawdzone produkty</p>
            </Col>
            <Col md={3} className="text-center mb-4">
              <i className="bi bi-headset text-primary mb-3" style={{ fontSize: '2.5rem' }}></i>
              <h5>Pomoc eksperta</h5>
              <p className="text-muted small">Bezpłatne konsultacje</p>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default ShopPage;
