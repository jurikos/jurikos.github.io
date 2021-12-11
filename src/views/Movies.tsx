import { FC } from 'react';
import { useParams } from 'react-router-dom';
import MoviesSearch from '../components/movies/MoviesSearch';
import MoviesDetail from '../components/movies/MoviesDetail';

const Movies: FC = () => {
  const { id, type } = useParams();

  return !type || !id ? <MoviesSearch /> : <MoviesDetail type={type} id={id} />;
};

export default Movies;
