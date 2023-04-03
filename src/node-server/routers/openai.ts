import { Router } from 'express';
import type { CreateChatCompletionRequest } from 'openai';
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

router.post('/ask', async (req, res) => {
  const completionReq: CreateChatCompletionRequest = {
    model: 'gpt-3.5-turbo',
    messages: req.body.messages,
  };
  if (req.query.stream === 'true') {
    const partialCompletionRes = await openai.createChatCompletion(
      {
        ...completionReq,
        stream: true,
      },
      {
        responseType: 'stream',
      }
    );
    // @ts-ignore
    partialCompletionRes.data.on('data', (data: ReadableStream) => {
      const chunks = data
        .toString()
        .trim()
        .split('\n\n')
        .map((l) => l.trim().split('data: ')[1]);
      chunks.forEach((chunk) => {
        if (chunk === '[DONE]') {
          res.end();
        } else {
          const json = JSON.parse(chunk);
          if (json.choices[0].delta.content) {
            const content = json.choices[0].delta.content;
            res.write(`data: ${content}\n\n`);
          }
        }
      });
    });
    res.type('text/event-stream');
  } else {
    const completionRes = await openai.createChatCompletion({
      ...completionReq,
    });
    res.end(completionRes.data.choices[0].message?.content);
  }
});
