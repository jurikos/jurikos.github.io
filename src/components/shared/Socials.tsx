import { FC } from 'react';
import { Github, Linkedin } from 'react-bootstrap-icons';
import classNames from 'classnames';
import { decode } from 'html-entities';
import config from '../../config';

interface SocialsProps {
  variant?: 'headerSm' | 'headerLg' | 'content';
  color: string;
}

const Socials: FC<SocialsProps> = ({ variant, color }) => {
  const {
    socials: { github, linkedin },
  } = config;
  const rootClassName = classNames({
    'd-lg-none my-2': variant === 'headerSm',
    'ml-auto d-none d-lg-block': variant === 'headerLg',
  });
  const linkClassName = classNames({
    'me-4': variant === 'headerSm' || variant === 'content',
    'ms-4': variant === 'headerLg',
  });

  return (
    <div className={rootClassName}>
      <a className={linkClassName} href={decode(github)} target="_blank" rel="noreferrer">
        <Github color={color} size={24} />
      </a>
      <a className={linkClassName} href={decode(linkedin)} target="_blank" rel="noreferrer">
        <Linkedin color={color} size={24} />
      </a>
    </div>
  );
};

export default Socials;
