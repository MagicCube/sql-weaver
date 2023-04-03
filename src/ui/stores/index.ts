import { proxy } from 'valtio';

import { QueryStore } from './query';
import { DataTableSchemaStore } from './schema';

export const dataTableSchemaStore = proxy(new DataTableSchemaStore());
dataTableSchemaStore.initialLoad();

export const queryStore = proxy(new QueryStore());
