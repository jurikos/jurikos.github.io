import MoviesRouteDictionary from '../features/movies/routes';
import { MoviesTitle } from '../features/movies/enums';

const nav = [
  {
    title: 'Experience',
    url: '/experience',
  },
  {
    title: 'Projects',
    url: '/projects',
  },
  {
    title: 'Features',
    url: '/features',
    children: [
      { title: 'Covid 19', url: '/features/covid-19' },
      { title: 'Crypto', url: '/features/crypto' },
      { title: MoviesTitle.Base, url: MoviesRouteDictionary.Index },
    ],
  },
  {
    title: 'Contact',
    url: '/contact',
  },
];

export default nav;
