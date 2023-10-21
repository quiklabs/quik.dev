import format from "pg-format";
import type { Pool, QueryResult, QueryResultRow } from "pg";
import type { Columns } from "./Columns";

interface IModelConstructorArgs {
  pool: Pool;
  schema: string;
  table: string;
  columns: Columns;
}

export class Model<TModelDef extends QueryResultRow> {
  pool: Pool;
  schema: string;
  table: string;
  columns: Columns;

  constructor({ pool, schema, table, columns }: IModelConstructorArgs) {
    this.pool = pool;
    this.schema = schema;
    this.table = table;
    this.columns = columns;
  }

  async findOne(): Promise<TModelDef> {
    const client = await this.pool.connect();
    const sql = format(
      /* sql */ `
        select %I from %I.%I limit 1
      `,
      this.columns.getNames(),
      this.schema,
      this.table,
    );
    const { rows }: QueryResult<TModelDef> = await client.query(sql);
    return rows[0];
  }
}
