import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, Card } from 'react-bootstrap';
import PageHeading from '../components/shared/PageHeading';
import config from '../config';

const Home: FC = () => {
  const navigate = useNavigate();
  const { skillset } = config;

  return (
    <>
      <Row className="my-5">
        <Col lg={6} className="mx-auto text-center">
          <PageHeading title="React Frontend Developer" />
          <p className="lead mb-3">
            Senior Frontend Web &amp; Mobile developer with a strong focus on performance optimisation, clean code and
            passion to UX.
          </p>
          <Button size="lg" variant="primary" className="m-2" onClick={() => navigate('/experience')}>
            Experience
          </Button>
          <Button size="lg" variant="outline-secondary" className="m-2" onClick={() => navigate('/projects')}>
            Projects
          </Button>
        </Col>
      </Row>
      <h2>Skillset</h2>
      <Row>
        {skillset.map(({ title, items }) => (
          <Col key={title} md={6} lg={4} className="mt-4">
            <Card style={{ height: '100%' }}>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text as="div">
                  <ul>
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
