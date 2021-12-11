import { FC } from 'react';
import { Alert } from 'react-bootstrap';
import { useMoviesTrailer } from '../../hooks/movies';

interface MoviesTrailerPRops {
  id: string;
  type: string;
}

const MoviesTrailer: FC<MoviesTrailerPRops> = ({ type, id }) => {
  const [key, error] = useMoviesTrailer(type, id);

  if (error)
    return (
      <Alert variant="danger" className="my-5">
        Something went wrong
      </Alert>
    );

  if (!key) return null;

  return (
    <iframe
      className="mt-3"
      width="100%"
      height="400"
      src={`https://www.youtube.com/embed/${key}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen={true}
    />
  );
};

export default MoviesTrailer;
