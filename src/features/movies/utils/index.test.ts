import { getMovieImg } from './';

test('tmdb image to equal https://image.tmdb.org/t/p/w500/image.jpg', () =>
  expect(getMovieImg('/image.jpg')).toBe('https://image.tmdb.org/t/p/w500/image.jpg'));
