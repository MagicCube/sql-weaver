import { Tooltip } from '@arco-design/web-react';
import cn from 'classnames';

import { Logo } from '../Logo';
import { MainMenu } from '../MainMenu';
import { QueryExplorer } from '../QueryExplorer';

import styles from './index.module.less';

export interface WorkbenchProps {
  className?: string;
}

export function Workbench({ className }: WorkbenchProps) {
  return (
    <div className={cn(styles.container, className)}>
      <aside className={styles.sideBar}>
        <Tooltip content="欢迎使用 SQLWeaver" position="right">
          <div className={styles.logo}>
            <Logo />
          </div>
        </Tooltip>
        <MainMenu className={styles.mainMenu} />
      </aside>
      <main className={styles.main}>
        <QueryExplorer />
      </main>
    </div>
  );
}
