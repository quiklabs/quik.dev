import { type QueryResultRow, type QueryResult } from "pg";
import { getDbClient } from "../../db";
import format from "pg-format";
import { type Columns } from "./Columns";

interface IModelConstructorArgs {
  schema: string;
  table: string;
  columns: Columns;
}

export class Model<TModelDef extends QueryResultRow> {
  table: string;
  schema: string;
  columns: Columns;

  constructor({ schema, table, columns }: IModelConstructorArgs) {
    this.schema = schema;
    this.table = table;
    this.columns = columns;
  }

  async findOne(): Promise<TModelDef> {
    const client = await getDbClient();
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
