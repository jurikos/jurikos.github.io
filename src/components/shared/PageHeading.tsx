import { FC } from 'react';

interface PageHeadingProps {
  title: string;
}

const PageHeading: FC<PageHeadingProps> = ({ title }) => <h1 className="display-5 fw-bold my-5">{title}</h1>;

export default PageHeading;
