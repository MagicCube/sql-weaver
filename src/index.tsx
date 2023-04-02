import { createRoot } from 'react-dom/client';

import { App } from './ui';

import './index.less';
import '@arco-design/web-react/dist/css/arco.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('React mount point element #root not found.');
}

const root = createRoot(rootElement);
root.render(<App />);
