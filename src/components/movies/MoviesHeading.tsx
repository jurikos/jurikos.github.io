import { FC } from 'react';
import { Image } from 'react-bootstrap';
import PageHeading from '../shared/PageHeading';

interface MoviesHeadingProps {
  title: string;
}

const MoviesHeading: FC<MoviesHeadingProps> = ({ title }) => (
  <div className="position-relative" style={{ paddingRight: '200px' }}>
    <PageHeading title={title} />
    <Image
      className="position-absolute"
      style={{ top: '-2rem', right: 0, height: '5rem' }}
      loading="lazy"
      alt="themoviedb.org"
      src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
    />
  </div>
);

export default MoviesHeading;
