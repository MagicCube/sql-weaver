import Split from '@uiw/react-split';
import cn from 'classnames';

import styles from './index.module.less';

export interface QueryExplorerProps {
  className?: string;
}

export function QueryExplorer({ className }: QueryExplorerProps) {
  return (
    <Split className={cn(styles.container, className)} lineBar>
      <aside className={styles.left}></aside>
      <main className={styles.main}>
        <header className={styles.header}></header>
        <Split mode="vertical" className={styles.verticalSplit} lineBar>
          <div className={styles.up}></div>
          <div className={styles.down}></div>
        </Split>
      </main>
    </Split>
  );
}
