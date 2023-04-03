import { dataTableSchemaStore, queryStore } from '.';

import type { DataTableSchema } from '@/core/types';
import { convertTableSchemaToDSL } from '@/core/utils/data-table-schema';

export class AssistantStore {
  question: string | null = null;
  state: AssistantState = AssistantState.Idle;
  result: AssistantResult | null = null;

  async ask(question: string) {
    this.question = question;
    this.state = AssistantState.PreProcessing;
    const involvedTableNames: string[] = await this._askForInvolvedTables(question);
    this.result = {
      involvedTableNames,
    };
    this.state = AssistantState.SchemaFetching;
    await Promise.all(involvedTableNames.map((tableName) => dataTableSchemaStore.loadSchema(tableName)));

    this.state = AssistantState.SQLGenerating;
    await this._generateSQL(question, involvedTableNames);
  }

  private async _askForInvolvedTables(question: string) {
    const res = await fetch('/api/ai/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: `You are an SQL expert.
I will state my question in natural language, and your task is to efficiently list the names of the data tables that need to be used to answer my question.
Output the selected table names as an array of JSON strings (e.g. ['a', 'b']) without any explanation.
Here are the names of all the tables in the current database:
${JSON.stringify(dataTableSchemaStore.getTableNames())}`,
          },
          { role: 'user', content: question },
        ],
      }),
    });
    const result = await res.json();
    return result;
  }

  private async _generateSQL(question: string, tableNames: string[]) {
    let dsl = '';
    for (const tableName of tableNames) {
      dsl += convertTableSchemaToDSL(dataTableSchemaStore.getSchema(tableName) as DataTableSchema) + '\n';
    }

    const res = await fetch('/api/ai/ask?stream=true', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: `You are an SQL expert who translate what I said into SQL statement.
1. Your task is to solve my question based on the <SCHEMA> which I provided bellow.
2. Output the valid SQL statement without any explanation.
<SCHEMA>
${dsl}`,
          },
          { role: 'user', content: question },
        ],
      }),
    });
    if (res.body) {
      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
      let sql = '';
      while (true) {
        const { value, done } = await reader.read();
        const textValue = value?.toString().replace(/\n\ndata:\s/g, '');
        const extractedValue = textValue?.substr(6, textValue.length - 6 - 2) ?? '';
        if (extractedValue) {
          sql += extractedValue;
          queryStore.setQuery(sql);
        }
        if (done) {
          break;
        }
      }
    }
    this.state = AssistantState.SQLGenerated;
    this.result = null;
  }
}

export enum AssistantState {
  Idle,
  PreProcessing = 2,
  SchemaFetching = 3,
  SQLGenerating = 4,
  SQLGenerated = 5,
}

export interface AssistantResult {
  involvedTableNames: string[];
}
