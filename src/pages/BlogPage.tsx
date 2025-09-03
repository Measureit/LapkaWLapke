import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form, Spinner, Alert, InputGroup, Pagination } from 'react-bootstrap';
import { usePaginatedBlogPosts, type BlogPost } from '../hooks/useBlogSystem';
import BlogPostDetail from '../components/BlogPostDetail';

const BlogPage: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const postsPerPage = 6;

  const { posts, totalPosts, totalPages, hasNextPage, hasPrevPage, loading, error, allPosts } = 
    usePaginatedBlogPosts(currentPage, postsPerPage, searchTerm);

  // Przewijanie na górę przy załadowaniu strony
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Przewijanie na górę przy zmianie strony
  useEffect(() => {
    if (currentPage > 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setCurrentPage(1); // Reset do pierwszej strony przy wyszukiwaniu
  };

  const clearSearch = () => {
    setSearchInput('');
    setSearchTerm('');
    setCurrentPage(1);
  };

  // Funkcja powrotu z przewijaniem na górę
  const handleBackToBlog = () => {
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

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  // Generowanie elementów paginacji
  const generatePaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Pierwsza strona
    if (startPage > 1) {
      items.push(
        <Pagination.Item key={1} onClick={() => setCurrentPage(1)}>
          1
        </Pagination.Item>
      );
      if (startPage > 2) {
        items.push(<Pagination.Ellipsis key="ellipsis1" />);
      }
    }

    // Strony środkowe
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
          {i}
        </Pagination.Item>
      );
    }

    // Ostatnia strona
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<Pagination.Ellipsis key="ellipsis2" />);
      }
      items.push(
        <Pagination.Item key={totalPages} onClick={() => setCurrentPage(totalPages)}>
          {totalPages}
        </Pagination.Item>
      );
    }

    return items;
  };

  // Wyciągnij unikalne kategorie z wszystkich postów
  const categories = React.useMemo(() => {
    if (!allPosts || allPosts.length === 0) return ['Wszystkie'];
    const uniqueCategories = ['Wszystkie', ...new Set(allPosts.map(post => post.category))];
    return uniqueCategories;
  }, [allPosts]);

  // Jeśli wybrany jest konkretny post, pokaż jego szczegóły
  if (selectedPost) {
    return (
      <BlogPostDetail 
        post={selectedPost} 
        onBack={handleBackToBlog} 
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
            <Col md={8}>
              <Form onSubmit={handleSearch}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Szukaj artykułów, tagi, kategorie..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="search-input"
                  />
                  <Button variant="primary" type="submit">
                    🔍 Szukaj
                  </Button>
                  {searchTerm && (
                    <Button variant="outline-secondary" onClick={clearSearch}>
                      Wyczyść
                    </Button>
                  )}
                </InputGroup>
              </Form>
              
              {searchTerm && (
                <div className="mt-2">
                  <small className="text-muted">
                    Wyniki dla: <strong>"{searchTerm}"</strong> - 
                    znaleziono <strong>{totalPosts}</strong> artykuł{totalPosts === 1 ? '' : totalPosts < 5 ? 'y' : 'ów'}
                  </small>
                </div>
              )}
            </Col>
            <Col md={4}>
              <div className="d-flex flex-wrap gap-2 mt-3 mt-md-0">
                {categories.map((category) => (
                  <Badge 
                    key={category}
                    bg="outline-secondary"
                    className="category-badge"
                    role="button"
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
            {posts.length === 0 ? (
              <Row>
                <Col className="text-center">
                  <i className="bi bi-search display-1 text-muted"></i>
                  <h3 className="text-muted mt-3">Nie znaleziono artykułów</h3>
                  <p className="text-muted">
                    {searchTerm 
                      ? `Nie znaleziono artykułów dla frazy "${searchTerm}". Spróbuj innego wyszukiwania.`
                      : 'Obecnie nie ma dostępnych artykułów.'
                    }
                  </p>
                </Col>
              </Row>
            ) : (
              <>
                <Row>
                  {posts.map((post) => (
                    <Col lg={4} md={6} key={post.id} className="mb-4">
                      <Card className="h-100 blog-card">
                        <Card.Img 
                          variant="top" 
                          src={post.image}
                          alt={post.title}
                          className="blog-image"
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                        <Card.Body className="d-flex flex-column">
                          <div className="mb-2">
                            <Badge bg="primary" className="me-2">{post.category}</Badge>
                            <small className="text-muted">
                              <i className="bi bi-calendar3 me-1"></i>
                              {formatDate(post.date)}
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

                {/* Paginacja */}
                {totalPages > 1 && (
                  <Row className="mt-5">
                    <Col>
                      <div className="d-flex justify-content-center">
                        <Pagination>
                          <Pagination.Prev 
                            disabled={!hasPrevPage}
                            onClick={() => setCurrentPage(currentPage - 1)}
                          />
                          {generatePaginationItems()}
                          <Pagination.Next 
                            disabled={!hasNextPage}
                            onClick={() => setCurrentPage(currentPage + 1)}
                          />
                        </Pagination>
                      </div>
                      
                      <div className="text-center mt-2">
                        <small className="text-muted">
                          Strona {currentPage} z {totalPages} • 
                          Wyświetlanie {((currentPage - 1) * postsPerPage) + 1}-{Math.min(currentPage * postsPerPage, totalPosts)} z {totalPosts} artykułów
                        </small>
                      </div>
                    </Col>
                  </Row>
                )}
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

      <style>{`
        .blog-card {
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        .blog-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
        }
        .pagination .page-link {
          color: #8e44ad;
          border-color: #8e44ad;
        }
        .pagination .page-item.active .page-link {
          background-color: #8e44ad;
          border-color: #8e44ad;
        }
        .pagination .page-link:hover {
          color: #6c2d8b;
          background-color: #f8f4fc;
          border-color: #8e44ad;
        }
        .blog-image {
          height: 200px;
          object-fit: cover;
        }
        .search-input:focus {
          border-color: #8e44ad;
          box-shadow: 0 0 0 0.2rem rgba(142, 68, 173, 0.25);
        }
      `}</style>
    </div>
  );
};

export default BlogPage;
