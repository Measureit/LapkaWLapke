import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState<'success' | 'danger'>('success');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Walidacja formularza
    if (!formData.name || !formData.email || !formData.message) {
      setAlertMessage('Proszę wypełnić wszystkie wymagane pola.');
      setAlertVariant('danger');
      setShowAlert(true);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setAlertMessage('Proszę podać prawidłowy adres email.');
      setAlertVariant('danger');
      setShowAlert(true);
      return;
    }

    // Symulacja wysłania formularza
    setAlertMessage('Dziękujemy za wiadomość! Odpowiemy najszybciej jak to możliwe.');
    setAlertVariant('success');
    setShowAlert(true);
    
    // Reset formularza
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });

    // Ukryj alert po 5 sekundach
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  return (
    <div className="fade-in">
      {/* Header Section */}
      <section className="contact-header py-5 bg-light">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h1 className="text-primary mb-3">
                <i className="bi bi-envelope-heart me-3"></i>
                Skontaktuj się z nami
              </h1>
              <p className="lead text-muted">
                Masz pytania o swoje zwierzę? Potrzebujesz porady? 
                Jesteśmy tutaj, aby Ci pomóc!
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section className="py-5">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
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

              <Card className="border-0 shadow-sm">
                <Card.Body className="p-5">
                  <h3 className="text-primary mb-4 text-center">Napisz do nas</h3>
                  
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label>
                            Imię i nazwisko <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Wprowadź swoje imię i nazwisko"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label>
                            Adres email <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="twoj@email.com"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label>Telefon</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+48 123 456 789"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label>Temat</Form.Label>
                          <Form.Select
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                          >
                            <option value="">Wybierz temat</option>
                            <option value="pytanie-produkt">Pytanie o produkt</option>
                            <option value="porada-behawioralna">Porada behawioralna</option>
                            <option value="porada-zdrowie">Porada zdrowotna</option>
                            <option value="zamowienie">Pytanie o zamówienie</option>
                            <option value="reklamacja">Reklamacja</option>
                            <option value="wspolpraca">Współpraca</option>
                            <option value="inne">Inne</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label>
                        Wiadomość <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Opisz swoje pytanie lub problem..."
                        required
                      />
                    </Form.Group>

                    <div className="d-grid">
                      <Button type="submit" variant="primary" size="lg">
                        <i className="bi bi-send me-2"></i>
                        Wyślij wiadomość
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Info Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
              <h3 className="text-center text-primary mb-5">Inne sposoby kontaktu</h3>
              
              <Row>
                <Col md={4} className="text-center mb-4">
                  <div className="contact-item">
                    <i className="bi bi-telephone-fill text-primary mb-3" style={{ fontSize: '2.5rem' }}></i>
                    <h5>Telefon</h5>
                    <p className="text-muted">
                      <strong>+48 123 456 789</strong><br />
                      Pon-Pt: 8:00-18:00<br />
                      Sob: 9:00-15:00
                    </p>
                  </div>
                </Col>
                
                <Col md={4} className="text-center mb-4">
                  <div className="contact-item">
                    <i className="bi bi-envelope-fill text-primary mb-3" style={{ fontSize: '2.5rem' }}></i>
                    <h5>Email</h5>
                    <p className="text-muted">
                      <strong>kontakt@lapkawlapke.pl</strong><br />
                      Odpowiadamy w ciągu 24h<br />
                      (dni robocze)
                    </p>
                  </div>
                </Col>
                
                <Col md={4} className="text-center mb-4">
                  <div className="contact-item">
                    <i className="bi bi-geo-alt-fill text-primary mb-3" style={{ fontSize: '2.5rem' }}></i>
                    <h5>Adres</h5>
                    <p className="text-muted">
                      <strong>ul. Psía 123</strong><br />
                      00-001 Warszawa<br />
                      Polska
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-5">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
              <h3 className="text-center text-primary mb-5">Często zadawane pytania</h3>
              
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button 
                      className="accordion-button" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#faq1"
                    >
                      Jak długo trwa dostawa zamówienia?
                    </button>
                  </h2>
                  <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Standardowa dostawa trwa 2-3 dni robocze. Dla zamówień powyżej 150 zł dostawa jest darmowa.
                      Oferujemy również dostawę ekspresową w ciągu 24h za dodatkową opłatą.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button 
                      className="accordion-button collapsed" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#faq2"
                    >
                      Czy mogę zwrócić produkt?
                    </button>
                  </h2>
                  <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Tak, masz 30 dni na zwrot produktu bez podania przyczyny. Produkt musi być w oryginalnym opakowaniu
                      i nieużywany. Koszt zwrotu pokrywamy my.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button 
                      className="accordion-button collapsed" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#faq3"
                    >
                      Jak wybrać odpowiednią karmę dla mojego psa?
                    </button>
                  </h2>
                  <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Wybór karmy zależy od wieku, rasy, wielkości i stanu zdrowia psa. Nasi eksperci chętnie pomogą Ci
                      w doborze odpowiedniej karmy. Skontaktuj się z nami telefonicznie lub przez formularz.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button 
                      className="accordion-button collapsed" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#faq4"
                    >
                      Czy oferujecie konsultacje behawioralne?
                    </button>
                  </h2>
                  <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Tak, współpracujemy z certyfikowanymi behawiorystami. Możesz umówić się na konsultację online
                      lub stacjonarną. Pierwsze 15 minut konsultacji jest bezpłatne dla naszych stałych klientów.
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Emergency Contact */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h3 className="mb-3">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Nagła sytuacja?
              </h3>
              <p className="mb-4">
                Jeśli Twój pies potrzebuje natychmiastowej pomocy, skontaktuj się z najbliższą kliniką weterynaryjną
                lub zadzwoń na numer alarmowy dla zwierząt.
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Button variant="light" size="lg">
                  <i className="bi bi-telephone-fill me-2"></i>
                  Kliniki 24h
                </Button>
                <Button variant="outline-light" size="lg">
                  <i className="bi bi-geo-alt-fill me-2"></i>
                  Znajdź najbliższą
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default ContactPage;
