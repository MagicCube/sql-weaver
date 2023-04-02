import {
  ApartmentOutlined,
  HomeOutlined,
  PieChartOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { Tooltip } from '@arco-design/web-react';
import cn from 'classnames';

import styles from './index.module.less';

export interface MainMenuProps {
  className?: string;
}

export function MainMenu({ className }: MainMenuProps) {
  return (
    <menu className={cn(styles.container, className)}>
      <li>
        <Tooltip content="主页" position="right">
          <a className={styles.item}>
            <HomeOutlined />
          </a>
        </Tooltip>
      </li>
      <li>
        <Tooltip content="智能辅助查询" position="right">
          <a className={cn(styles.active, styles.item)}>
            <TableOutlined />
          </a>
        </Tooltip>
      </li>
      <li>
        <Tooltip content="数据可视化" position="right">
          <a className={styles.item}>
            <PieChartOutlined />
          </a>
        </Tooltip>
      </li>
      <li className={styles.spring}></li>
      <li>
        <Tooltip content="系统设置" position="right">
          <a className={styles.item}>
            <SettingOutlined />
          </a>
        </Tooltip>
      </li>
      <li>
        <Tooltip content="Indoc 帮助中心" position="right">
          <a className={styles.item}>
            <QuestionCircleOutlined />
          </a>
        </Tooltip>
      </li>
    </menu>
  );
}
