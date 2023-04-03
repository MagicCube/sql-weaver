import { Select } from '@arco-design/web-react';
import cn from 'classnames';

import styles from './index.module.less';

export interface DatabaseSelectorProps {
  className?: string;
  value: string;
}

export function DatabaseSelector({ className, value }: DatabaseSelectorProps) {
  return (
    <Select className={cn(styles.container, className)} size="large" addBefore="Database:" value={value}>
      <Select.Option value="northwind">Northwind</Select.Option>
    </Select>
  );
}
