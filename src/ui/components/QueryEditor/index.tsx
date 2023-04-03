import { Button } from '@arco-design/web-react';
import { IconPlayArrow } from '@arco-design/web-react/icon';
import Editor from '@dp/byte-editor-react';
import cn from 'classnames';

import styles from './index.module.less';

export interface QueryEditorProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
}

export function QueryEditor({ className, value, onChange }: QueryEditorProps) {
  return (
    <div className={cn(styles.container, className)}>
      <header className={styles.header}>
        <menu className={styles.toolbar}>
          <li>
            <Button type="primary" icon={<IconPlayArrow />} disabled={value.trim() === ''}>
              Execute
            </Button>
          </li>
          <li className={styles.spring}></li>
          <li>Help</li>
        </menu>
      </header>
      <main className={styles.main}>
        <Editor style={{ fontSize: 16 }} language="hive" onChange={onChange} value={value} />
      </main>
    </div>
  );
}
