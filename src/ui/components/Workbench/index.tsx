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
        <Tooltip
          className={styles.introduction}
          content={
            <div>
              <h3 style={{ marginTop: 0, marginBottom: 4 }}>欢迎使用 SQLMind</h3>
              <div>SQLMind 是一款 AI 驱动的 SQL 查询工具，旨在帮助您通过自然语言对话完成数据查询任务。</div>
            </div>
          }
          position="right"
        >
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
