import BaseRouteDictionary from '../routes';
import { PageTitle } from '../enums';

import Covid19RouteDictionary from '../features/covid19/routes';
import { Covid19Title } from '../features/covid19/enums';

import CryptoRouteDictionary from '../features/crypto/routes';
import { CryptoTitle } from '../features/crypto/enums';

import MoviesRouteDictionary from '../features/movies/routes';
import { MoviesTitle } from '../features/movies/enums';

const nav = [
  {
    title: PageTitle.Experience,
    url: BaseRouteDictionary.Experience,
  },
  {
    title: PageTitle.Projects,
    url: BaseRouteDictionary.Projects,
  },
  {
    title: PageTitle.Features,
    url: '',
    children: [
      { title: Covid19Title.Base, url: Covid19RouteDictionary.Index },
      { title: CryptoTitle.Base, url: CryptoRouteDictionary.Index },
      { title: MoviesTitle.Base, url: MoviesRouteDictionary.Index },
    ],
  },
  {
    title: PageTitle.Contact,
    url: BaseRouteDictionary.Contact,
  },
];

export default nav;
