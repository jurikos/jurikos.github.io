import { FC, Fragment } from 'react';
import { Alert, Spinner, Row, Col, Image, Table } from 'react-bootstrap';
import { useMoviesDetail } from '../../hooks/movies';
import { getMovieImg, formatPrice } from '../../utils';
import PageMeta from '../shared/PageMeta';
import Breadcrumbs from '../shared/Breadcrumbs';
import MoviesHeading from './MoviesHeading';
import MoviesTrailer from './MoviesTrailer';

interface MovieDetailProps {
  type: string;
  id: string;
}

const MovieDetail: FC<MovieDetailProps> = ({ type, id }) => {
  const [movie, error] = useMoviesDetail(id);

  if (error)
    return (
      <Alert variant="danger" className="my-5">
        Something went wrong
      </Alert>
    );

  if (!movie) return <Spinner animation="border" className="my-5" />;

  const {
    original_title,
    poster_path,
    overview,
    release_date,
    runtime,
    genres,
    production_companies,
    budget,
    revenue,
  } = movie;

  return (
    <>
      <PageMeta title={original_title} />
      <Breadcrumbs crumbs={[{ title: 'Movies', url: '/features/movies' }, { title: original_title }]} />
      <MoviesHeading title={original_title} />
      <Row>
        <Col md={4}>
          <Image alt={original_title} src={getMovieImg(poster_path)} fluid rounded />
        </Col>
        <Col md={8}>
          <p className="lead">{overview}</p>
          <Table striped bordered hover responsive>
            <tbody>
              <tr>
                <th>Release</th>
                <td>{release_date}</td>
              </tr>
              <tr>
                <th>Runtime</th>
                <td>{runtime} mins</td>
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
              {budget > 0 && (
                <tr>
                  <th>Budget</th>
                  <td>{formatPrice(budget)}</td>
                </tr>
              )}
              {revenue > 0 && (
                <tr>
                  <th>Revenue</th>
                  <td>{formatPrice(revenue)}</td>
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

export default MovieDetail;
