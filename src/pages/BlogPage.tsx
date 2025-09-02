import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { useBlogPosts, type BlogPost } from '../hooks/useBlogPosts';
import BlogPostDetail from '../components/BlogPostDetail';

const BlogPage: React.FC = () => {
  const { posts, loading, error } = useBlogPosts();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Wszystkie');

  // Wyciągnij unikalne kategorie z postów
  const categories = useMemo(() => {
    const uniqueCategories = ['Wszystkie', ...new Set(posts.map(post => post.category))];
    return uniqueCategories;
  }, [posts]);

  // Filtrowanie postów
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'Wszystkie' || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchTerm, selectedCategory]);

  // Jeśli wybrany jest konkretny post, pokaż jego szczegóły
  if (selectedPost) {
    return (
      <BlogPostDetail 
        post={selectedPost} 
        onBack={() => setSelectedPost(null)} 
      />
    );
  }

  return (
    <div className="fade-in">
      {/* Header Section */}
      <section className="blog-header py-5 bg-light">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h1 className="text-primary mb-3">
                <i className="bi bi-journal-heart me-3"></i>
                Blog Łapka w Łapkę
              </h1>
              <p className="lead text-muted">
                Odkryj świat psów razem z nami. Praktyczne porady, ciekawostki i wszystko, 
                co musisz wiedzieć o opiece nad swoim czworonożnym przyjacielem.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Search and Filter Section */}
      <section className="py-4 border-bottom">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <Form.Control
                type="search"
                placeholder="Szukaj artykułów..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <div className="d-flex flex-wrap gap-2 mt-3 mt-md-0">
                {categories.map((category) => (
                  <Badge 
                    key={category}
                    bg={category === selectedCategory ? "primary" : "outline-secondary"}
                    className="category-badge"
                    role="button"
                    onClick={() => setSelectedCategory(category)}
                    style={{ cursor: 'pointer' }}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="py-5">
          <Container>
            <Row>
              <Col className="text-center">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3 text-muted">Ładowanie artykułów...</p>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* Error State */}
      {error && (
        <section className="py-5">
          <Container>
            <Row>
              <Col>
                <Alert variant="warning" className="text-center">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </Alert>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* Blog Posts Section */}
      {!loading && !error && (
        <section className="py-5">
          <Container>
            {filteredPosts.length === 0 ? (
              <Row>
                <Col className="text-center">
                  <i className="bi bi-search display-1 text-muted"></i>
                  <h3 className="text-muted mt-3">Nie znaleziono artykułów</h3>
                  <p className="text-muted">Spróbuj zmienić kryteria wyszukiwania</p>
                </Col>
              </Row>
            ) : (
              <>
                <Row>
                  {filteredPosts.map((post) => (
                    <Col lg={4} md={6} key={post.id} className="mb-4">
                      <Card className="h-100 blog-card">
                        <Card.Img 
                          variant="top" 
                          src={post.image}
                          alt={post.title}
                          className="blog-image"
                        />
                        <Card.Body className="d-flex flex-column">
                          <div className="mb-2">
                            <Badge bg="primary" className="me-2">{post.category}</Badge>
                            <small className="text-muted">
                              <i className="bi bi-calendar3 me-1"></i>
                              {post.date}
                            </small>
                          </div>
                          <Card.Title className="h5">{post.title}</Card.Title>
                          <Card.Text className="flex-grow-1">{post.excerpt}</Card.Text>
                          
                          {/* Tags */}
                          {post.tags.length > 0 && (
                            <div className="mb-3">
                              {post.tags.slice(0, 3).map(tag => (
                                <Badge key={tag} bg="outline-secondary" className="me-1 mb-1" style={{ fontSize: '0.7rem' }}>
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          )}

                          <div className="mt-auto">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <small className="text-muted">
                                <i className="bi bi-person me-1"></i>
                                {post.author}
                              </small>
                              <small className="text-muted">
                                <i className="bi bi-clock me-1"></i>
                                {post.readTime}
                              </small>
                            </div>
                            <Button 
                              variant="outline-primary" 
                              size="sm" 
                              className="w-100"
                              onClick={() => setSelectedPost(post)}
                            >
                              Czytaj artykuł <i className="bi bi-arrow-right ms-1"></i>
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>

                {/* Results Info */}
                <Row className="mt-4">
                  <Col className="text-center">
                    <p className="text-muted">
                      Znaleziono {filteredPosts.length} artykuł{filteredPosts.length === 1 ? '' : filteredPosts.length < 5 ? 'y' : 'ów'}
                      {searchTerm && ` dla "${searchTerm}"`}
                      {selectedCategory !== 'Wszystkie' && ` w kategorii "${selectedCategory}"`}
                    </p>
                  </Col>
                </Row>
              </>
            )}
          </Container>
        </section>
      )}

      {/* Newsletter Signup */}
      <section className="newsletter-cta py-5 bg-primary">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h3 className="text-white mb-3">
                <i className="bi bi-envelope-heart me-2"></i>
                Nie przegap najnowszych artykułów!
              </h3>
              <p className="text-white mb-4">
                Zapisz się do naszego newslettera i otrzymuj najnowsze porady dla właścicieli psów 
                prosto do swojej skrzynki mailowej.
              </p>
              <Row className="justify-content-center">
                <Col md={6}>
                  <div className="d-flex gap-2">
                    <Form.Control
                      type="email"
                      placeholder="Twój adres email"
                      className="newsletter-input"
                    />
                    <Button variant="light">
                      <i className="bi bi-send"></i>
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default BlogPage;
