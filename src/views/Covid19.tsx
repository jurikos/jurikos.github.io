import { FC } from 'react';
import { useParams } from 'react-router-dom';
import CovidList from '../components/covid19/CovidList';
import CovidDetail from '../components/covid19/CovidDetail';

const Covid19: FC = () => {
  const { country } = useParams();

  return !country ? <CovidList /> : <CovidDetail country={country} />;
};

export default Covid19;
