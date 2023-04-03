import type { DataTableSchema } from '../types';

export function convertTableSchemaToDSL(schema: DataTableSchema) {
  let dsl = `table "${schema.name}" {\n`;
  schema.columns.forEach((column) => {
    dsl += `  ${column.isPK ? '@pk ' : ''}${column.name}\n`;
  });
  dsl += '}\n';
  return dsl;
}
