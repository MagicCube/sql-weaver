import { Button, Tooltip } from '@arco-design/web-react';
import { IconPlayArrow, IconRobot } from '@arco-design/web-react/icon';
import Editor from '@dp/byte-editor-react';
import cn from 'classnames';
import type { editor } from 'monaco-editor';
import { useCallback, useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';

import { assistantStore, dataTableSchemaStore } from '@/ui/stores';
import { AssistantState } from '@/ui/stores/assistant';

import styles from './index.module.less';

export interface QueryEditorProps {
  className?: string;
  value: string;
  height?: number;
  onChange?: (value: string) => void;
  onExecute?: () => void;
  onAssistantRequest?: () => void;
}

export function QueryEditor({ className, value, height, onChange, onExecute, onAssistantRequest }: QueryEditorProps) {
  const schemaSnapshot = useSnapshot(dataTableSchemaStore);
  const assistantSnapshot = useSnapshot(assistantStore);
  const editorRef = useRef<{ formatter(): void }>(null);
  const editorIns = useRef<editor.IStandaloneCodeEditor | null>(null);
  useEffect(() => {
    if (assistantSnapshot.state === AssistantState.SQLGenerated) {
      editorRef.current?.formatter();
    }
  }, [assistantSnapshot.state]);
  const handleSuggestTables = async () => {
    return schemaSnapshot.schemas.map((table) => {
      return {
        label: table.name,
        type: 4,
      };
    });
  };
  const handleExecute = useCallback(() => {
    editorRef.current?.formatter();
    editorIns.current?.setPosition({ column: 0, lineNumber: 0 });
    onExecute?.();
  }, [onExecute]);
  return (
    <div className={cn(styles.container, className)}>
      <header className={styles.header}>
        <menu className={styles.toolbar}>
          <li>
            <Button type="primary" icon={<IconPlayArrow />} disabled={value.trim() === ''} onClick={handleExecute}>
              Execute
            </Button>
          </li>
          <li>
            <Tooltip content="AI powered SQL assitant">
              <Button type="outline" icon={<IconRobot />} onClick={onAssistantRequest}>
                SQL Assistant
              </Button>
            </Tooltip>
          </li>
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
          height={height ? height - 56 : undefined}
          value={value}
          onChange={onChange}
          onSuggestTables={handleSuggestTables}
          onEditorCreated={(ins) => {
            // @ts-ignore
            editorIns.current = ins;
          }}
        />
      </main>
    </div>
  );
}
