import { FC, Fragment } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

interface BreadcrumbsProps {
  crumbs: { title: string; url?: string }[];
  className?: string;
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ crumbs, className = 'my-3' }) => (
  <Breadcrumb className={className}>
    <LinkContainer to="/">
      <Breadcrumb.Item>Home</Breadcrumb.Item>
    </LinkContainer>
    {crumbs.map(({ title, url }) => (
      <Fragment key={title}>
        {url ? (
          <LinkContainer to={url}>
            <Breadcrumb.Item>{title}</Breadcrumb.Item>
          </LinkContainer>
        ) : (
          <Breadcrumb.Item active>{title}</Breadcrumb.Item>
        )}
      </Fragment>
    ))}
  </Breadcrumb>
);

export default Breadcrumbs;
