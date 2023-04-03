import yaml from '@modyfi/vite-plugin-yaml';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {
  return {
    plugins: [
      tsconfigPaths(),
      react({ jsxRuntime: 'classic' }),
      yaml(),
      monacoEditorPlugin({
        customWorkers: [
          {
            label: 'clickhouse',
            entry: '@dp/monaco-languages/esm/clickhouse/clickhouse.worker',
          },
          {
            label: 'hive',
            entry: '@dp/monaco-languages/esm/hive/hive.worker',
          },
          {
            label: 'las',
            entry: '@dp/monaco-languages/esm/las/las.worker',
          },
          {
            label: 'flink',
            entry: '@dp/monaco-languages/esm/flink/flink.worker',
          },
        ],
      }),
    ],
    resolve: {
      alias: [{ find: '@', replacement: path.resolve('./src') }],
    },
  };
});
