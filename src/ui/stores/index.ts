import { proxy } from 'valtio';

import { DataTableSchemaStore } from './schema';

export const dataTableSchemaStore = proxy(new DataTableSchemaStore());
dataTableSchemaStore.initialLoad();
