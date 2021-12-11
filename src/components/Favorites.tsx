import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Container } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';
import favoriteCryptoAtom from '../state/atoms/favoriteCryptoAtom';
import { formatPrice } from '../utils';
import Percent from './shared/Percent';
import { useCryptoDetailData } from '../hooks/crypto';

interface FavoriteCryptoDataProps {
  code: string;
}

const FavoriteCryptoData: FC<FavoriteCryptoDataProps> = ({ code }) => {
  const cryptoDetailData = useCryptoDetailData(code);

  if (!cryptoDetailData) return null;

  const { price, changePct24h } = cryptoDetailData;

  return (
    <>
      <span className="mx-2">{formatPrice(price)}</span>
      <Percent amount={changePct24h} />
    </>
  );
};

const Favorites: FC = () => {
  const [favoriteCrypto, setFavoriteCrypto] = useRecoilState(favoriteCryptoAtom);

  if (!favoriteCrypto) return null;

  const { code, image } = favoriteCrypto;

  return (
    <div className="bg-white border-bottom">
      <Container className="py-2">
        <div className="d-flex align-items-center">
          <img
            loading="lazy"
            alt={code}
            src={`https://www.cryptocompare.com/${image}`}
            style={{ width: '1rem' }}
            className="me-2"
          />
          <Link to={`features/crypto/${code}`}>
            <strong>{code}</strong>
          </Link>
          <FavoriteCryptoData code={code} />
          <span
            className="ms-1 d-flex"
            role="button"
            onClick={() => setFavoriteCrypto(null)}
            title="Remove from Favorites"
          >
            <X size={20} color="var(--bs-red)" />
          </span>
        </div>
      </Container>
    </div>
  );
};

export default Favorites;
