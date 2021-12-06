import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

interface FavoriteCryptoAtom {
  code: string;
  image: string;
}

const favoriteCryptoAtom = atom<FavoriteCryptoAtom | null>({
  key: 'favoriteCrypto',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export default favoriteCryptoAtom;
