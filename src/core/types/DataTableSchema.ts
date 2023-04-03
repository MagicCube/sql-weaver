import { DataColumn } from './DataColumn';

export interface DataTableSchema {
  name: string;
  columns: DataColumn[];
}
