import { FC, Fragment } from 'react';
import { Alert, Spinner, Row, Col, Image, Table } from 'react-bootstrap';
import { useShowsDetail } from '../../hooks/movies';
import { getMovieImg } from '../../utils';
import PageMeta from '../shared/PageMeta';
import Breadcrumbs from '../shared/Breadcrumbs';
import MoviesHeading from './MoviesHeading';
import MoviesTrailer from './MoviesTrailer';

interface TvDetailProps {
  type: string;
  id: string;
}

const TvDetail: FC<TvDetailProps> = ({ type, id }) => {
  const [tv, error] = useShowsDetail(id);

  if (error)
    return (
      <Alert variant="danger" className="my-5">
        Something went wrong
      </Alert>
    );

  if (!tv) return <Spinner animation="border" className="my-5" />;

  const {
    original_name,
    name,
    poster_path,
    overview,
    first_air_date,
    number_of_episodes,
    genres,
    production_companies,
  } = tv;

  const title = `${name} ${name !== original_name ? `(${original_name})` : ''}`;

  return (
    <>
      <PageMeta title={title} />
      <Breadcrumbs crumbs={[{ title: 'Movies', url: '/features/movies' }, { title }]} />
      <MoviesHeading title={title} />
      <Row>
        <Col md={4}>
          <Image alt={title} src={getMovieImg(poster_path)} fluid rounded />
        </Col>
        <Col md={8}>
          <p className="lead">{overview}</p>
          <Table striped bordered hover responsive>
            <tbody>
              <tr>
                <th>First air</th>
                <td>{first_air_date}</td>
              </tr>
              <tr>
                <th>Episodes</th>
                <td>{number_of_episodes}</td>
              </tr>
              {!!genres?.length && (
                <tr>
                  <th>Genres</th>
                  <td>
                    {genres.map(({ id, name }, i) => (
                      <Fragment key={id}>{`${name}${i !== genres.length - 1 ? ', ' : ''}`}</Fragment>
                    ))}
                  </td>
                </tr>
              )}
              {!!production_companies?.length && (
                <tr>
                  <th>Production</th>
                  <td>
                    {production_companies.map(({ id, name }, i) => (
                      <Fragment key={id}>{`${name}${i !== production_companies.length - 1 ? ', ' : ''}`}</Fragment>
                    ))}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <MoviesTrailer type={type} id={id} />
        </Col>
      </Row>
    </>
  );
};

export default TvDetail;
