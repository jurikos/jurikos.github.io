import { FC } from 'react';
import { Helmet } from 'react-helmet';
import config from '../../config';

interface PageMetaProps {
  title?: string;
  description?: string;
}

const PageMeta: FC<PageMetaProps> = ({ title, description }) => (
  <Helmet>
    {title && (
      <title>
        {title} | {config.brand}
      </title>
    )}
    {description && <meta name="description" content={description} />}
  </Helmet>
);

export default PageMeta;
