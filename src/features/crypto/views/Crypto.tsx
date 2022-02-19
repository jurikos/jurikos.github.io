import { FC } from 'react';
import { useParams } from 'react-router-dom';
import CryptoList from '../components/CryptoList';
import CryptoDetail from '../components/CryptoDetail';

const Crypto: FC = () => {
  const { code } = useParams();

  return !code ? <CryptoList /> : <CryptoDetail code={code} />;
};

export default Crypto;
