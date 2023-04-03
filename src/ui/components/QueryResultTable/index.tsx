import { Table } from '@arco-design/web-react';
import cn from 'classnames';

import styles from './index.module.less';

export interface QueryResultTableProps {
  className?: string;
  data?: unknown[];
}

export function QueryResultTable({ className, data }: QueryResultTableProps) {
  const columns = data
    ? Object.keys(data[0] || {}).map((key) => ({
        title: key,
        dataIndex: key,
      }))
    : [];
  return (
    <div className={cn(styles.container, className)}>
      <Table columns={columns} data={data} pagination={false} />
    </div>
  );
}
