interface ApiModel {
  page: number;
  total_pages: number;
  total_results: number;
}

interface MovieTvModel {
  id: number;
  poster_path: string | null;
  overview: string;
  production_companies: { id: number; logo_path?: string; name: string; origin_country: string }[];
  genres: { id: number; name: string }[] | null;
}

export interface MovieModel extends MovieTvModel {
  original_title: string;
  release_date: string;
}

export interface MovieDetailModel extends MovieTvModel, MovieModel {
  budget: number;
  revenue: number;
  runtime: number;
}

export interface TvModel extends MovieTvModel {
  first_air_date: string;
  name: string;
  original_name: string;
  number_of_episodes: number;
}

export interface MovieTrailerModel {
  id: number;
  results: {
    key: string;
    site: 'YouTube';
    type: 'Clip' | 'Teaser' | 'Trailer';
    official: boolean;
    id: string;
  }[];
}

export interface MovieSearchModel extends ApiModel {
  results: MovieModel[];
}

export interface TvSearchModel extends ApiModel {
  results: TvModel[];
}
