import useSWR from 'swr';
import { MoviesType } from '../enums';
import { MovieModel, MovieSearchModel, MovieDetailModel, MovieTrailerModel, TvModel, TvSearchModel } from '../models';
import { fetcher } from '../../../utils';
import config from '../config';

// TODO: change when swr properly types error response
type Error = any;

const { endpoint, apiKey } = config;

export const useMoviesList = (query: string): [MovieModel[] | undefined, Error] => {
  const { data, error } = useSWR<MovieSearchModel>(
    query ? `${endpoint}/search/${MoviesType.Movie}?query=${query}&api_key=${apiKey}` : null,
    fetcher,
  );

  return [data?.results, error];
};

export const useMoviesDetail = (id: string): [MovieDetailModel | undefined, Error] => {
  const { data, error } = useSWR<MovieDetailModel>(
    id ? `${endpoint}/${MoviesType.Movie}/${id}?api_key=${apiKey}` : null,
    fetcher,
  );

  return [data, error];
};

export const useMoviesTrailer = (type: MoviesType, id: string): [string | undefined, Error] => {
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

export const useTvList = (query: string): [TvModel[] | undefined, Error] => {
  const { data, error } = useSWR<TvSearchModel>(
    query ? `${endpoint}/search/${MoviesType.Tv}?query=${query}&api_key=${apiKey}` : null,
    fetcher,
  );

  return [data?.results, error];
};

export const useTvDetail = (id: string): [TvModel | undefined, Error] => {
  const { data, error } = useSWR<TvModel>(id ? `${endpoint}/${MoviesType.Tv}/${id}?api_key=${apiKey}` : null, fetcher);

  return [data, error];
};
