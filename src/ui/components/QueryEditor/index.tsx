import { Button } from '@arco-design/web-react';
import { IconPlayArrow } from '@arco-design/web-react/icon';
import Editor from '@dp/byte-editor-react';
import cn from 'classnames';
import { useCallback, useRef } from 'react';
import { useSnapshot } from 'valtio';

import { dataTableSchemaStore } from '@/ui/stores';

import styles from './index.module.less';

export interface QueryEditorProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
}

export function QueryEditor({ className, value, onChange }: QueryEditorProps) {
  const snapshot = useSnapshot(dataTableSchemaStore);
  const editorRef = useRef<{ formatter(): void }>(null);
  const handleSuggestTables = async () => {
    return snapshot.schemas.map((table) => {
      return {
        label: table.name,
        type: 4,
      };
    });
  };
  const handleExecute = useCallback(() => {
    editorRef.current?.formatter();
  }, []);
  return (
    <div className={cn(styles.container, className)}>
      <header className={styles.header}>
        <menu className={styles.toolbar}>
          <li>
            <Button type="primary" icon={<IconPlayArrow />} disabled={value.trim() === ''} onClick={handleExecute}>
              Execute
            </Button>
          </li>
          <li className={styles.spring}></li>
          <li>Help</li>
        </menu>
      </header>
      <main className={styles.main}>
        <Editor
          ref={editorRef}
          style={{ fontSize: 16 }}
          language="hive"
          format={{
            keywordCase: 'upper',
            denseOperators: true,
            logicalOperatorNewline: 'before',
            indentStyle: 'standard',
          }}
          value={value}
          onChange={onChange}
          onSuggestTables={handleSuggestTables}
        />
      </main>
    </div>
  );
}
