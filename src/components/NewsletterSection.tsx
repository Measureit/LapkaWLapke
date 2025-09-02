import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState<'success' | 'danger'>('success');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setAlertMessage('Proszę podać adres email');
      setAlertVariant('danger');
      setShowAlert(true);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setAlertMessage('Proszę podać prawidłowy adres email');
      setAlertVariant('danger');
      setShowAlert(true);
      return;
    }

    // Symulacja zapisu do newslettera
    setAlertMessage('Dziękujemy! Zostałeś zapisany do naszego newslettera.');
    setAlertVariant('success');
    setShowAlert(true);
    setEmail('');

    // Ukryj alert po 5 sekundach
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  return (
    <section className="newsletter-section py-5">
      <Container>
        <Row>
          <Col lg={8} className="mx-auto text-center">
            <div className="newsletter-content">
              <i className="bi bi-envelope-heart text-white mb-3" style={{ fontSize: '3rem' }}></i>
              <h2 className="text-white mb-3">Dołącz do naszej społeczności!</h2>
              <p className="text-white mb-4">
                Otrzymuj najnowsze artykuły, porady dla właścicieli psów i ekskluzywne oferty 
                prosto do swojej skrzynki mailowej. Zapisz się do naszego newslettera już dziś!
              </p>
              
              {showAlert && (
                <Alert 
                  variant={alertVariant} 
                  className="mb-4"
                  onClose={() => setShowAlert(false)} 
                  dismissible
                >
                  {alertMessage}
                </Alert>
              )}

              <Form onSubmit={handleSubmit} className="newsletter-form">
                <Row className="g-2 justify-content-center">
                  <Col md={7} lg={6}>
                    <Form.Control
                      type="email"
                      placeholder="Twój adres email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      size="lg"
                      className="newsletter-input"
                    />
                  </Col>
                  <Col md={5} lg={4}>
                    <Button 
                      type="submit" 
                      variant="light" 
                      size="lg" 
                      className="w-100 newsletter-btn"
                    >
                      <i className="bi bi-send me-2"></i>
                      Zapisz się
                    </Button>
                  </Col>
                </Row>
              </Form>
              
              <p className="text-white-50 mt-3 small">
                <i className="bi bi-shield-check me-1"></i>
                Nie wysyłamy spamu. Możesz się wypisać w każdej chwili.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NewsletterSection;
