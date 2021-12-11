import { FC } from 'react';
import { MoviesType } from '../enums';
import MovieDetail from './MovieDetail';
import TvDetail from './TvDetail';

interface MoviesDetailProps {
  type: MoviesType;
  id: string;
}

const MoviesDetail: FC<MoviesDetailProps> = ({ type, id }) =>
  type === MoviesType.Movie ? (
    <MovieDetail type={MoviesType.Movie} id={id} />
  ) : (
    <TvDetail type={MoviesType.Tv} id={id} />
  );

export default MoviesDetail;
