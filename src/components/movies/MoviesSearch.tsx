import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import moviesAtom from '../../state/atoms/moviesAtom';
import PageMeta from '../shared/PageMeta';
import Breadcrumbs from '../shared/Breadcrumbs';
import MoviesHeading from './MoviesHeading';
import MoviesList from './MoviesList';

const MoviesSearch: FC = () => {
  const [movies, setMovies] = useRecoilState(moviesAtom);
  const moviesSearch = movies?.search;
  const title = 'Movies';

  return (
    <>
      <PageMeta title={title} />
      <Breadcrumbs crumbs={[{ title }]} />
      <MoviesHeading title={title} />
      <Form.Control
        size="lg"
        type="search"
        placeholder="Search movies..."
        value={moviesSearch}
        className="mb-4"
        onChange={(e) => setMovies({ search: e.target.value })}
      />
      {moviesSearch && moviesSearch.length >= 3 && <MoviesList query={moviesSearch} />}
    </>
  );
};

export default MoviesSearch;
