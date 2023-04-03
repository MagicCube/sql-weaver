import { KeyOutlined, ProfileOutlined, TableOutlined } from '@ant-design/icons';
import type { TreeNodeProps } from '@arco-design/web-react';
import { Tree } from '@arco-design/web-react';
import type { NodeInstance } from '@arco-design/web-react/es/Tree/interface';
import cn from 'classnames';
import { useCallback } from 'react';
import { useSnapshot } from 'valtio';

import { dataTableSchemaStore } from '@/ui/stores';

import styles from './index.module.less';

export interface DatabaseSchemaTreeProps {
  className?: string;
  databaseName: string;
}

export function DatabaseSchemaTree({ className }: DatabaseSchemaTreeProps) {
  const snapshot = useSnapshot(dataTableSchemaStore);
  const handleLoad = useCallback(async (node: NodeInstance): Promise<void> => {
    const tableName = node.key as string;
    await dataTableSchemaStore.loadSchema(tableName);
  }, []);
  const data = snapshot.schemas.map<TreeNodeProps>((schema) => ({
    key: schema.name,
    title: schema.name,
    icon: <TableOutlined />,
    children: schema.columns.map<TreeNodeProps>((column) => ({
      key: `${schema.name}.${column.name}`,
      title: column.name,
      icon: column.isPK ? <KeyOutlined /> : <ProfileOutlined />,
      isLeaf: true,
    })),
  }));
  return <Tree className={cn(styles.container, className)} treeData={data} loadMore={handleLoad}></Tree>;
}
