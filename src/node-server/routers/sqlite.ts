import { Router } from 'express';
import * as path from 'path';
import { Database, Statement } from 'sqlite3';

export const router: Router = Router();

const db = new Database(path.join(__dirname, '../../../data/sqlite/northwind.db'));

router.get('/table/all', (req, res) => {
  db.all(`SELECT name FROM sqlite_schema WHERE type="table"`, (err: Error | null, rows: { name: string }[]) => {
    if (!err) {
      res.send(rows.map((row) => row.name).filter((name) => !name.startsWith('sqlite_')));
    }
  });
});

router.get('/table/:tableName', (req, res) => {
  db.all(
    `SELECT name, type, pk FROM pragma_table_info('${req.params.tableName}') ORDER BY cid`,
    (err: Error | null, rows: { name: string; type: string; pk: number }[]) => {
      if (!err) {
        res.send(rows.map((row) => ({ name: row.name, type: row.type, isPK: row.pk === 1 ? true : undefined })));
      }
    }
  );
});
