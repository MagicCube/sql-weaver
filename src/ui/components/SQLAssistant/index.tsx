import { Input } from '@arco-design/web-react';
import cn from 'classnames';

import { assistantStore } from '@/ui/stores';

import styles from './index.module.less';

export interface SQLAssistantProps {
  className?: string;
}

export function SQLAssistant({ className }: SQLAssistantProps) {
  const handleAsk = (question: string) => {
    assistantStore.ask(question);
  };
  return (
    <div className={cn(styles.container, className)}>
      <Input.Search
        autoFocus
        placeholder="Tell me your next great idea (in English or 中文)"
        searchButton
        onSearch={handleAsk}
      />
    </div>
  );
}
