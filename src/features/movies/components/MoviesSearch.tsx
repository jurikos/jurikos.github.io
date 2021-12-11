import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { MoviesTitle } from '../enums';
import moviesAtom from '../state/moviesAtom';
import PageMeta from '../../../components/shared/PageMeta';
import Breadcrumbs from '../../../components/shared/Breadcrumbs';
import MoviesHeading from './MoviesHeading';
import MoviesList from './MoviesList';

const MoviesSearch: FC = () => {
  const [movies, setMovies] = useRecoilState(moviesAtom);
  const moviesSearch = movies?.search;
  const title = MoviesTitle.Base;

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
