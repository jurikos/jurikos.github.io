import { FC } from 'react';
import { Row, Col, Button, Card, Badge } from 'react-bootstrap';
import PageHeading from '../components/shared/PageHeading';
import config from '../config';
import { removeProtocolFromUrl } from '../utils';

const Projects: FC = () => {
  const { projects } = config;

  return (
    <>
      <PageHeading title="Projects" />
      <Row>
        {projects.map(({ title, description, url, stack }) => (
          <Col key={title} md={6} lg={4} className="mb-4">
            <Card style={{ height: '100%' }}>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                {url && (
                  <Button variant="primary" href={url} target="_blank">
                    {removeProtocolFromUrl(url)}
                  </Button>
                )}
                {stack && (
                  <div className="mt-3">
                    {stack.map((item) => (
                      <Badge key={item} bg="secondary" className="mt-2 me-2">
                        {item}
                      </Badge>
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Projects;
