import { Router } from 'express';
import { Configuration, OpenAIApi } from 'openai';

export const router: Router = Router();

if (!process.env.OPENAI_API_KEY) {
  console.info('ERROR: Missing OPENAI_API_KEY environment variable.');
  console.info('1. Add a `.env` file to the root of the project with the following content:');
  console.info('\n\nOPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n\n');
  console.info('2. Restart the server.');
  process.exit(1);
}

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);
