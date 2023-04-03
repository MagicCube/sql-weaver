import type { DataTableSchema } from '@/core/types';

export class DataTableSchemaStore {
  schemas: DataTableSchema[] = [];

  getSchema(tableName: string): DataTableSchema | null {
    return this.schemas.find((schema) => schema.name === tableName) || null;
  }

  async initialLoad() {
    const res = await fetch('/api/sqlite/northwind/table/all/names');
    const data = (await res.json()) as string[];
    this.schemas = data.map<DataTableSchema>((tableName) => ({ name: tableName, columns: [] }));
  }

  async loadSchema(tableName: string): Promise<DataTableSchema> {
    const schema = this.getSchema(tableName);
    if (schema && schema.columns.length > 0) {
      return schema;
    }

    if (schema) {
      const res = await fetch(`/api/sqlite/northwind/table/${tableName}/schema`);
      const data = (await res.json()) as DataTableSchema;
      schema.columns = data.columns;
      return data;
    }

    throw new Error(`Table "${tableName}" not found.`);
  }
}
