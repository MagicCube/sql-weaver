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
    <Editor
      className={cn(styles.container, className)}
      style={{ fontSize: 16 }}
      language="sql"
      onChange={onChange}
      value={value}
    />
  );
}
