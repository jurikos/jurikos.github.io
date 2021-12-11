import { FC } from 'react';
import { Card, Badge } from 'react-bootstrap';
import { getMovieImg } from '../../utils';

interface MoviesCardProps {
  image: string | null;
  date: string;
  title: string;
}

const MoviesCard: FC<MoviesCardProps> = ({ image, date, title }) => (
  <Card style={{ height: '100%' }}>
    <Card.Img variant="top" src={getMovieImg(image)} />
    <Card.Body>
      <Card.Text>
        <Badge bg="secondary">{date}</Badge>
      </Card.Text>
      <Card.Title>{title}</Card.Title>
    </Card.Body>
  </Card>
);

export default MoviesCard;
