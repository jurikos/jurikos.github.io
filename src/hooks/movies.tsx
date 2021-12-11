import useSWR from 'swr';
import {
  MovieModel,
  MovieSearchModel,
  MovieDetailModel,
  MovieTrailerModel,
  TvModel,
  TvSearchModel,
} from '../models/movies';
import { fetcher } from '../utils';
import config from '../config';

// TODO: change when swr properly types error response
type Error = any;

const {
  features: {
    movies: { endpoint, apiKey },
  },
} = config;

export const useMoviesList = (query: string): [MovieModel[] | undefined, Error] => {
  const { data, error } = useSWR<MovieSearchModel>(
    query ? `${endpoint}/search/movie?query=${query}&api_key=${apiKey}` : null,
    fetcher,
  );

  return [data?.results, error];
};

export const useMoviesDetail = (id: string): [MovieDetailModel | undefined, Error] => {
  const { data, error } = useSWR<MovieDetailModel>(id ? `${endpoint}/movie/${id}?api_key=${apiKey}` : null, fetcher);

  return [data, error];
};

export const useMoviesTrailer = (type: string, id: string): [string | undefined, Error] => {
  const { data, error } = useSWR<MovieTrailerModel>(
    id ? `${endpoint}/${type}/${id}/videos?api_key=${apiKey}` : null,
    fetcher,
  );

  const trailer = data?.results?.find(({ site, type, official }) =>
    official ? site === 'YouTube' && type === 'Trailer' && official : site === 'YouTube' && type === 'Trailer',
  );

  if (!trailer) return [undefined, error];

  const { key } = trailer;

  return [key, error];
};

export const useShowsList = (query: string): [TvModel[] | undefined, Error] => {
  const { data, error } = useSWR<TvSearchModel>(
    query ? `${endpoint}/search/tv?query=${query}&api_key=${apiKey}` : null,
    fetcher,
  );

  return [data?.results, error];
};

export const useShowsDetail = (id: string): [TvModel | undefined, Error] => {
  const { data, error } = useSWR<TvModel>(id ? `${endpoint}/tv/${id}?api_key=${apiKey}` : null, fetcher);

  return [data, error];
};
