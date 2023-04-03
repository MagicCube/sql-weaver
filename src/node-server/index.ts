import * as bodyParser from 'body-parser';
import 'dotenv/config';
import * as express from 'express';
import { createServer } from 'vite';

import { router as openaiRouter } from './routers/openai';
import { router as sqliteRouter } from './routers/sqlite';

const devMode = process.env.NODE_ENV === 'development';

const app = express();
app.use(bodyParser.json());
if (devMode) {
  setupViteDevServer();
} else {
  app.use(express.static('dist'));
}
app.use('/api/sqlite', sqliteRouter);
app.use('/api/ai', openaiRouter);

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
  console.log('🖥️ SQLWeaver server is now running at port 3000.\n\n🚀Please visit http://localhost:3000');
});
