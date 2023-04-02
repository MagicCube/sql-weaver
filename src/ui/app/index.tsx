import { Workbench } from '../components/Workbench';

import styles from './index.module.less';

export function App() {
  return (
    <div className={styles.container}>
      <Workbench />
    </div>
  );
}
