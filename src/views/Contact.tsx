import { FC, useState, Suspense, lazy } from 'react';
import { Button, Spinner, Row, Col, Card } from 'react-bootstrap';
import { PageTitle } from '../enums';
import PageMeta from '../components/shared/PageMeta';
import Breadcrumbs from '../components/shared/Breadcrumbs';
import PageHeading from '../components/shared/PageHeading';
import Socials from '../components/shared/Socials';
const ContactDetails = lazy(() => import('../components/ContactDetails'));

const Contact: FC = () => {
  const [contact, setContact] = useState(false);
  const title = PageTitle.Contact;
  const contactInfo = `${title} Information`;
  const content = contact ? (
    <ContactDetails />
  ) : (
    <Button className="mt-2 mb-4" size="lg" onClick={() => setContact(true)}>
      Show {contactInfo}
    </Button>
  );

  return (
    <>
      <PageMeta title={title} />
      <Breadcrumbs crumbs={[{ title }]} />
      <PageHeading title={title} />
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>{contactInfo}</Card.Header>
            <Card.Body>
              <Suspense fallback={<Spinner animation="border" />}>{content}</Suspense>
              <Socials variant="content" color="var(--bs-blue)" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Contact;
