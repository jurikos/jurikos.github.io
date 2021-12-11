import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

interface MoviesAtom {
  search: string;
}

const moviesAtom = atom<MoviesAtom | null>({
  key: 'movies',
  default: { search: '' },
  effects_UNSTABLE: [persistAtom],
});

export default moviesAtom;
