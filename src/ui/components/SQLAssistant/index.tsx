import { Input, Steps } from '@arco-design/web-react';
import cn from 'classnames';
import { useSnapshot } from 'valtio';

import { assistantStore } from '@/ui/stores';

import styles from './index.module.less';

export interface SQLAssistantProps {
  className?: string;
}

export function SQLAssistant({ className }: SQLAssistantProps) {
  const snapshot = useSnapshot(assistantStore);
  const handleAsk = (question: string) => {
    if (question.trim()) {
      assistantStore.ask(question.trim());
    }
  };
  const moreThanOneTable = snapshot.result?.involvedTableNames && snapshot.result?.involvedTableNames?.length > 1;
  const step = snapshot.state as unknown as number;
  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.inputContainer}>
        <Input.Search
          autoFocus
          defaultValue="Who are my top 10 highest spend customers?"
          placeholder="Tell me your next great idea (in English or 中文)"
          disabled={step > 0}
          size="large"
          searchButton
          onSearch={handleAsk}
        />
      </div>
      <div className={styles.stepsContainer} style={{ display: step == 0 ? 'none' : 'flex' }}>
        <Steps direction="vertical" current={step} style={{ maxWidth: 780, marginBottom: 40 }}>
          <Steps.Step title="Asking" description="Send your question to AI" />
          <Steps.Step
            title="Pre-processing"
            description={
              snapshot.result?.involvedTableNames ? (
                <div>
                  Table{moreThanOneTable ? 's' : ''} of{' '}
                  <span className={styles.important}>
                    {[snapshot.result?.involvedTableNames.map((name) => `"${name}"`).join(', ')]}
                  </span>{' '}
                  {moreThanOneTable ? 'are' : 'is'} involved in this query
                </div>
              ) : (
                'Determine which tables should be used in the query'
              )
            }
          />
          <Steps.Step title="Fetching table schema" description="Send table schema to AI" />
          <Steps.Step title="Generating SQL" description="Generate SQL based on your question" />
        </Steps>
      </div>
    </div>
  );
}
