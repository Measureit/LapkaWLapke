import React from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { type BlogPost } from '../hooks/useBlogPosts';

interface BlogPostDetailProps {
  post: BlogPost;
  onBack: () => void;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post, onBack }) => {
  return (
    <div className="fade-in">
      {/* Back Button */}
      <Container className="py-3">
        <Button 
          variant="outline-secondary" 
          onClick={onBack}
          className="mb-3"
        >
          <i className="bi bi-arrow-left me-2"></i>
          Powrót do bloga
        </Button>
      </Container>

      {/* Post Header */}
      <Container>
        <Row>
          <Col lg={8} className="mx-auto">
            <article className="blog-post-detail">
              <header className="mb-4">
                <div className="mb-3">
                  <Badge bg="primary" className="me-2">{post.category}</Badge>
                  {post.tags.map(tag => (
                    <Badge key={tag} bg="outline-secondary" className="me-1">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                
                <h1 className="text-primary mb-3">{post.title}</h1>
                
                <div className="post-meta d-flex flex-wrap gap-3 text-muted mb-4">
                  <span>
                    <i className="bi bi-person me-1"></i>
                    {post.author}
                  </span>
                  <span>
                    <i className="bi bi-calendar3 me-1"></i>
                    {post.date}
                  </span>
                  <span>
                    <i className="bi bi-clock me-1"></i>
                    {post.readTime}
                  </span>
                </div>

                {post.excerpt && (
                  <p className="lead text-muted border-start border-primary border-3 ps-3 mb-4">
                    {post.excerpt}
                  </p>
                )}
              </header>

              {/* Featured Image */}
              {post.image && (
                <div className="mb-4">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="img-fluid rounded shadow-sm"
                    style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
                  />
                </div>
              )}

              {/* Post Content */}
              <div className="blog-content">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({children}) => <h2 className="text-primary mt-4 mb-3">{children}</h2>,
                    h2: ({children}) => <h3 className="text-primary mt-4 mb-3">{children}</h3>,
                    h3: ({children}) => <h4 className="text-secondary mt-3 mb-2">{children}</h4>,
                    h4: ({children}) => <h5 className="text-secondary mt-3 mb-2">{children}</h5>,
                    p: ({children}) => <p className="mb-3 lh-lg">{children}</p>,
                    ul: ({children}) => <ul className="mb-3">{children}</ul>,
                    ol: ({children}) => <ol className="mb-3">{children}</ol>,
                    li: ({children}) => <li className="mb-1">{children}</li>,
                    blockquote: ({children}) => (
                      <blockquote className="border-start border-primary border-3 ps-3 my-4 text-muted fst-italic">
                        {children}
                      </blockquote>
                    ),
                    table: ({children}) => (
                      <div className="table-responsive mb-4">
                        <table className="table table-striped table-hover">
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({children}) => <thead className="table-primary">{children}</thead>,
                    code: ({children, ...props}) => {
                      const isInline = 'inline' in props;
                      if (isInline) {
                        return <code className="bg-light px-1 rounded">{children}</code>;
                      }
                      return (
                        <pre className="bg-light p-3 rounded mb-3 overflow-auto">
                          <code>{children}</code>
                        </pre>
                      );
                    },
                    a: ({children, href}) => (
                      <a 
                        href={href} 
                        className="text-primary text-decoration-none"
                        target={href?.startsWith('http') ? '_blank' : undefined}
                        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {children}
                      </a>
                    )
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* Post Footer */}
              <footer className="mt-5 pt-4 border-top">
                <Row>
                  <Col md={6}>
                    <div className="author-info">
                      <h6 className="text-primary mb-2">Autor artykułu</h6>
                      <div className="d-flex align-items-center">
                        <div className="author-avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                             style={{ width: '50px', height: '50px', fontSize: '1.2rem' }}>
                          {post.author.charAt(0)}
                        </div>
                        <div>
                          <strong>{post.author}</strong>
                          <br />
                          <small className="text-muted">Ekspert ds. psów</small>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="text-md-end mt-3 mt-md-0">
                    <div className="share-buttons">
                      <h6 className="text-primary mb-2">Udostępnij artykuł</h6>
                      <div className="d-flex gap-2 justify-content-md-end">
                        <Button variant="outline-primary" size="sm">
                          <i className="bi bi-facebook"></i>
                        </Button>
                        <Button variant="outline-info" size="sm">
                          <i className="bi bi-twitter"></i>
                        </Button>
                        <Button variant="outline-success" size="sm">
                          <i className="bi bi-whatsapp"></i>
                        </Button>
                        <Button variant="outline-secondary" size="sm">
                          <i className="bi bi-link-45deg"></i>
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </footer>
            </article>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BlogPostDetail;
