import { Modal, Result } from '@arco-design/web-react';
import Split from '@uiw/react-split';
import cn from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { useRef } from 'react';
import { useSnapshot } from 'valtio';

import { queryStore } from '@/ui/stores';

import { DatabaseSchemaTree } from '../DatabaseSchemaTree';
import { DatabaseSelector } from '../DatabaseSelector';
import { QueryEditor } from '../QueryEditor';
import { QueryResultTable } from '../QueryResultTable';
import { SQLAssistant } from '../SQLAssistant';

import styles from './index.module.less';

export interface QueryExplorerProps {
  className?: string;
}

export function QueryExplorer({ className }: QueryExplorerProps) {
  const splitRef = useRef(null);
  const upRef = useRef<HTMLDivElement>(null);
  const downRef = useRef<HTMLDivElement>(null);
  const [databaseName] = useState('northwind');
  const [sqlAssistantVisible, setSQLAssistantVisible] = useState(false);
  const snapshot = useSnapshot(queryStore);
  const [editorHeight, setEditorHeight] = useState<number | undefined>(undefined);
  const [tableHeight, setTableHeight] = useState<number | undefined>(undefined);
  const autoResize = useCallback(() => {
    if (upRef.current && downRef.current && splitRef.current) {
      setEditorHeight(upRef.current.clientHeight);
      setTableHeight(downRef.current.clientHeight);
    }
  }, []);
  const handleResize = useCallback((preSize: number, nextSize: number) => {
    const wrapper = (splitRef.current as { warpper: HTMLElement } | null)?.warpper;
    if (wrapper) {
      const height = (wrapper.clientHeight * (100 - nextSize)) / 100;
      setEditorHeight(height);
      setTableHeight(wrapper.clientHeight - height - 1);
    }
  }, []);
  const handleAssistantRequest = useCallback(() => {
    setSQLAssistantVisible(true);
  }, []);
  useEffect(() => {
    autoResize();
  }, [autoResize]);
  useEffect(() => {
    window.addEventListener('resize', autoResize);
    return () => {
      window.removeEventListener('resize', autoResize);
    };
  }, [autoResize]);
  return (
    <>
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
            <div ref={upRef} className={styles.up}>
              <QueryEditor
                value={snapshot.query}
                height={editorHeight}
                onChange={(value) => queryStore.setQuery(value)}
                onExecute={() => queryStore.executeQuery()}
                onAssistantRequest={() => handleAssistantRequest()}
              />
            </div>
            <div ref={downRef} className={styles.down}>
              {!snapshot.error ? (
                <QueryResultTable data={(snapshot.results || []) as unknown[]} height={tableHeight} />
              ) : (
                <Result
                  status="error"
                  title="An error was occurred during querying"
                  subTitle={snapshot.error.message || 'Unknown issue.'}
                />
              )}
            </div>
          </Split>
        </main>
      </Split>
      <Modal
        autoFocus
        visible={sqlAssistantVisible}
        title="SQL Assistant"
        footer={null}
        onCancel={() => {
          setSQLAssistantVisible(false);
        }}
      >
        <SQLAssistant />
      </Modal>
    </>
  );
}
