import { Router } from 'express';
import * as path from 'path';
import { Database } from 'sqlite3';

import { DataTableSchema } from '@/core/types';

import { convertTableSchemaToDSL } from '../../core/utils/data-table-schema';

export const router: Router = Router();

const db = new Database(path.join(__dirname, '../../../data/sqlite/northwind.db'));

router.get('/northwind/table/all/names', (req, res) => {
  db.all(
    `SELECT tbl_name FROM sqlite_schema WHERE type="table" ORDER BY tbl_name`,
    (err: Error | null, rows: { tbl_name: string }[]) => {
      if (!err) {
        const names = rows.map((row) => row.tbl_name).filter((name) => !name.startsWith('sqlite_'));
        res.send(names);
      }
    }
  );
});

router.get('/northwind/table/:tableName/schema', (req, res) => {
  db.all(
    `SELECT name, type, pk FROM pragma_table_info('${req.params.tableName}') ORDER BY cid`,
    (err: Error | null, rows: { name: string; type: string; pk: number }[]) => {
      if (!err) {
        const schema: DataTableSchema = {
          name: req.params.tableName,
          columns: rows.map((row) => ({
            name: row.name,
            type: row.type,
            isPK: row.pk === 1 ? true : undefined,
          })),
        };
        // const dsl = convertTableSchemaToDSL(schema);
        res.send(schema);
      }
    }
  );
});
