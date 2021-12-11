import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { MoviesType } from '../enums';
import MoviesSearch from '../components/MoviesSearch';
import MoviesDetail from '../components/MoviesDetail';

const Movies: FC = () => {
  const { id, type } = useParams();

  return !type || !id ? <MoviesSearch /> : <MoviesDetail type={type as MoviesType} id={id} />;
};

export default Movies;
