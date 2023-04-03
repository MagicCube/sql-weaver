import Split from '@uiw/react-split';
import cn from 'classnames';
import { useState } from 'react';
import { useSnapshot } from 'valtio';

import { queryStore } from '@/ui/stores';

import { DatabaseSchemaTree } from '../DatabaseSchemaTree';
import { DatabaseSelector } from '../DatabaseSelector';
import { QueryEditor } from '../QueryEditor';

import styles from './index.module.less';

export interface QueryExplorerProps {
  className?: string;
}

export function QueryExplorer({ className }: QueryExplorerProps) {
  const [databaseName] = useState('northwind');
  const snapshot = useSnapshot(queryStore);
  return (
    <Split className={cn(styles.container, className)} lineBar>
      <aside className={styles.left}>
        <div className={styles.databaseSelectorContainer}>
          <DatabaseSelector value={databaseName} />
        </div>
        <div className={styles.databaseSchemaTreeContainer}>
          <DatabaseSchemaTree databaseName={databaseName} />
        </div>
      </aside>
      <main className={styles.main}>
        <header className={styles.header}></header>
        <Split mode="vertical" className={styles.verticalSplit} lineBar>
          <div className={styles.up}>
            <QueryEditor value={snapshot.query} onChange={(value) => snapshot.setQuery(value)} />
          </div>
          <div className={styles.down}></div>
        </Split>
      </main>
    </Split>
  );
}
