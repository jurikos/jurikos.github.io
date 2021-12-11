import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Spinner, Tabs, Tab, Row, Col } from 'react-bootstrap';
import MoviesRouteDictionary from '../routes';
import { MoviesType } from '../enums';
import { useMoviesList, useTvList } from '../hooks';
import MoviesCard from './MoviesCard';

interface MoviesListProps {
  query: string;
}

const MoviesList: FC<MoviesListProps> = ({ query }) => {
  const navigate = useNavigate();
  const [moviesList, moviesListError] = useMoviesList(query);
  const [showsList, showsListError] = useTvList(query);
  const movieRoute = `${MoviesRouteDictionary.Index}/${MoviesType.Movie}`;
  const tvRoute = `${MoviesRouteDictionary.Index}/${MoviesType.Tv}`;

  if (moviesListError | showsListError)
    return (
      <Alert variant="danger" className="my-5">
        Something went wrong
      </Alert>
    );

  if (!moviesList || !showsList) return <Spinner animation="border" className="my-5" />;

  return (
    <Tabs defaultActiveKey="movies" id="uncontrolled-tab-example">
      <Tab eventKey="movies" title={`Movies (${moviesList.length})`}>
        <Row>
          {moviesList.map(({ id, poster_path, original_title, release_date }) => (
            <Col key={id} md={6} lg={3} className="mt-4" onClick={() => navigate(`${movieRoute}/${id}`)} role="button">
              <MoviesCard image={poster_path} date={release_date} title={original_title} />
            </Col>
          ))}
        </Row>
      </Tab>
      <Tab eventKey="Tvs" title={`TV Shows (${showsList.length})`}>
        <Row>
          {showsList.map(({ id, poster_path, original_name, name, first_air_date }) => (
            <Col key={id} md={6} lg={3} className="mt-4" onClick={() => navigate(`${tvRoute}/${id}`)} role="button">
              <MoviesCard
                image={poster_path}
                date={first_air_date}
                title={`${name} ${name !== original_name ? `(${original_name})` : ''}`}
              />
            </Col>
          ))}
        </Row>
      </Tab>
    </Tabs>
  );
};

export default MoviesList;
