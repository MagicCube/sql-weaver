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
        <Tooltip content="Home" position="right">
          <a className={styles.item}>
            <HomeOutlined />
          </a>
        </Tooltip>
      </li>
      <li>
        <Tooltip content="Query AI" position="right">
          <a className={cn(styles.active, styles.item)}>
            <TableOutlined />
          </a>
        </Tooltip>
      </li>
      <li>
        <Tooltip content="Vision AI" position="right">
          <a className={styles.item}>
            <PieChartOutlined />
          </a>
        </Tooltip>
      </li>
      <li className={styles.spring}></li>
      <li>
        <Tooltip content="Settings" position="right">
          <a className={styles.item}>
            <SettingOutlined />
          </a>
        </Tooltip>
      </li>
      <li>
        <Tooltip content="Indoc Help Center" position="right">
          <a className={styles.item}>
            <QuestionCircleOutlined />
          </a>
        </Tooltip>
      </li>
    </menu>
  );
}
