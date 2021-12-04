import { FC, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Socials from './shared/Socials';
import config from '../config';

const Header: FC = () => {
  const { brand, nav } = config;
  const { pathname } = useLocation();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand to="/" as={Link}>
          {brand}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav>
            {nav.map(({ title, url, children }) => (
              <Fragment key={title}>
                {!children ? (
                  <Nav.Link to={url} as={Link} active={pathname === url}>
                    {title}
                  </Nav.Link>
                ) : (
                  <NavDropdown title={title} id="nav-dropdown" active={pathname.includes(url)}>
                    {children.map(({ title, url }) => (
                      <NavDropdown.Item key={title} to={url} as={Link} active={pathname === url}>
                        {title}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                )}
              </Fragment>
            ))}
          </Nav>
          <Socials variant="headerSm" color="white" />
        </Navbar.Collapse>
        <Socials variant="headerLg" color="white" />
      </Container>
    </Navbar>
  );
};

export default Header;
