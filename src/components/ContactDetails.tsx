import { FC } from 'react';
import { decode } from 'html-entities';
import config from '../config';

const ContactDetails: FC = () => {
  const {
    contact: { email: encodedEmail, phone: encodedPhone },
  } = config;
  const email = decode(encodedEmail);
  const phone = decode(encodedPhone);

  return (
    <>
      <p>
        <a href={`mailto:${email}`}>{email}</a>
      </p>
      <p>
        <a href={`tel:${phone.replace(/ /g, '')}`}>{phone}</a>
      </p>
    </>
  );
};

export default ContactDetails;
