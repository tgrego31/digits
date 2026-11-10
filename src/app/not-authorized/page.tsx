import { Col, Container, Row } from 'react-bootstrap';

const NotAuthorized = () => (
  <main>
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="text-center">
          <h2>Not Authorized</h2>
        </Col>
      </Row>
    </Container>
  </main>
);

export default NotAuthorized;
