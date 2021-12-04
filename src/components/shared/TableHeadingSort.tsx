import { FC } from 'react';
import { ArrowUpShort, ArrowDownShort } from 'react-bootstrap-icons';

interface TableHeadingSortProps {
  title: string;
  onAsc: () => void;
  onDesc: () => void;
  iconSize?: number;
}

const TableHeadingSort: FC<TableHeadingSortProps> = ({ title, onAsc, onDesc, iconSize = 16 }) => (
  <th>
    <div className="d-flex justify-content-between">
      {title}
      <div>
        <ArrowUpShort size={iconSize} role="button" onClick={onAsc} />
        <ArrowDownShort size={iconSize} role="button" onClick={onDesc} />
      </div>
    </div>
  </th>
);

export default TableHeadingSort;
