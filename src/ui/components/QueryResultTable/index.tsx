import type { TableColumnProps } from '@arco-design/web-react';
import { Table } from '@arco-design/web-react';
import cn from 'classnames';

import styles from './index.module.less';

export interface QueryResultTableProps {
  className?: string;
  data?: unknown[];
  height?: number;
}

export function QueryResultTable({ className, data, height }: QueryResultTableProps) {
  const columns: TableColumnProps[] = data
    ? Object.keys(data[0] || {}).map((key) => ({
        title: key,
        dataIndex: key,
      }))
    : [];
  return (
    <div className={cn(styles.container, className)}>
      <Table
        className={styles.table}
        virtualized
        scroll={{
          y: height,
        }}
        columns={columns}
        data={data}
        pagination={false}
        border
      />
    </div>
  );
}
