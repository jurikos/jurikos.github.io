import { FC } from 'react';
import { Accordion, Badge, Button } from 'react-bootstrap';
import PageHeading from '../components/shared/PageHeading';
import config from '../config';
import { removeProtocolFromUrl } from '../utils';

const Experience: FC = () => {
  const { experience } = config;

  return (
    <>
      <PageHeading title="Experience" />
      <Accordion defaultActiveKey="0">
        {experience.map(({ company, website, role, date, description, projects }, i) => (
          <Accordion.Item eventKey={`${i}`} key={date}>
            <Accordion.Header>{role}</Accordion.Header>
            <Accordion.Body>
              <Badge bg="secondary">{date}</Badge>
              <h2 className="display-8 mt-2">{company}</h2>
              {website && (
                <Button href={website} size="sm" variant="outline-primary" target="_blank">
                  {removeProtocolFromUrl(website)}
                </Button>
              )}
              {description && <p className="mt-4 mb-0">{description}</p>}
              {projects?.length && (
                <>
                  <h3 className="fs-4 text-secondary mt-4">Projects</h3>
                  <ul>
                    {projects.map((project) => (
                      <li key={project}>{project}</li>
                    ))}
                  </ul>
                </>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
};

export default Experience;
