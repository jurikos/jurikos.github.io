import { FC } from 'react';
import { Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { PageTitle } from '../enums';
import { removeProtocolFromUrl } from '../utils';
import config from '../config';
import PageMeta from '../components/shared/PageMeta';
import Breadcrumbs from '../components/shared/Breadcrumbs';
import PageHeading from '../components/shared/PageHeading';

const Projects: FC = () => {
  const { projects } = config;
  const title = PageTitle.Projects;

  return (
    <>
      <PageMeta title={title} />
      <Breadcrumbs crumbs={[{ title }]} />
      <PageHeading title={title} />
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
