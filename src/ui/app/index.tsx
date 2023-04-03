import { ConfigProvider } from '@arco-design/web-react';
import enUS from '@arco-design/web-react/es/locale/en-US';

import { Workbench } from '../components/Workbench';

import styles from './index.module.less';

export function App() {
  return (
    <ConfigProvider locale={enUS}>
      <div className={styles.container}>
        <Workbench />
      </div>
    </ConfigProvider>
  );
}
