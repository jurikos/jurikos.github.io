type MoviesRoutes = 'Index' | 'Detail';

const MoviesRouteDictionary: { [key in MoviesRoutes]: string } = {
  Index: '/features/movies',
  Detail: '/features/movies/:type/:id',
};

export default MoviesRouteDictionary;
