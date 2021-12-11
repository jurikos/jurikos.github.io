import { FC } from 'react';
import MovieDetail from './MovieDetail';
import TvDetail from './TvDetail';

interface MoviesDetailProps {
  type: string;
  id: string;
}

const MoviesDetail: FC<MoviesDetailProps> = ({ type, id }) =>
  type === 'movie' ? <MovieDetail type={type} id={id} /> : <TvDetail type={type} id={id} />;

export default MoviesDetail;
