import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import 'dotenv/config';
import * as express from 'express';
import { createServer } from 'vite';

import { router as sqliteRouter } from './routers/sqlite';

const devMode = process.env.NODE_ENV === 'development';

const app = express();
app.use(cors());
app.use(bodyParser.json());
if (devMode) {
  setupViteDevServer();
} else {
  app.use(express.static('dist'));
}
app.use('/api/sqlite', sqliteRouter);

async function setupViteDevServer() {
  console.info('Running in DEV mode.');
  const viteDevServer = await createServer({
    server: { middlewareMode: true },
    root: process.cwd(),
    configFile: './vite.config.ts',
  });
  app.use(viteDevServer.middlewares);
}

app.listen(3000, () => {
  console.log('Server is now running at port 3000.');
});
