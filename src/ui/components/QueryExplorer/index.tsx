import Split from '@uiw/react-split';
import cn from 'classnames';
import { useCallback, useState } from 'react';
import { useRef } from 'react';
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
  const splitRef = useRef(null);
  const [databaseName] = useState('northwind');
  const snapshot = useSnapshot(queryStore);
  const [editorHeight, setEditorHeight] = useState<number | undefined>(undefined);
  const handleResize = useCallback((preSize: number, nextSize: number) => {
    const wrapper = (splitRef.current as { warpper: HTMLElement } | null)?.warpper;
    if (wrapper) {
      const height = (wrapper.clientHeight * (100 - nextSize)) / 100;
      setEditorHeight(height);
    }
  }, []);
  return (
    <Split ref={splitRef} className={cn(styles.container, className)} lineBar>
      <aside className={styles.left}>
        <div className={styles.databaseSelectorContainer}>
          <DatabaseSelector value={databaseName} />
        </div>
        <div className={styles.databaseSchemaTreeContainer}>
          <DatabaseSchemaTree databaseName={databaseName} />
        </div>
      </aside>
      <main className={styles.main}>
        <Split mode="vertical" className={styles.verticalSplit} lineBar onDragging={handleResize}>
          <div className={styles.up}>
            <QueryEditor
              value={snapshot.query}
              height={editorHeight}
              onChange={(value) => queryStore.setQuery(value)}
            />
          </div>
          <div className={styles.down}></div>
        </Split>
      </main>
    </Split>
  );
}
