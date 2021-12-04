import { FC } from 'react';
import classNames from 'classnames';

interface PageHeadingProps {
  amount: number;
  toFixed?: number;
}

const Percent: FC<PageHeadingProps> = ({ amount, toFixed = 2 }) => {
  const pctClassName = classNames({
    'text-danger': amount < 0,
    'text-success': amount > 0,
  });

  return <span className={pctClassName}>{amount.toFixed(toFixed)}%</span>;
};

export default Percent;
