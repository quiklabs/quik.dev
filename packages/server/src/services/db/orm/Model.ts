// import { types } from "pg";
import type { Pool, QueryResult } from "pg";
import type { Columns } from "./Columns";
import { intersection } from "lodash";
import type { SqlStatment } from "./sql";
import { sql, sqlIdent, sqlJoin, sqlJoinIdents } from "./sql";

interface TModelConstructorArgs<M extends Record<string, any>> {
  pool: Pool;
  schema: string;
  table: string;
  columns: Columns<M>;
  alias?: string;
  idKey?: string;
}

type TModelQuery<M extends Record<string, any>> = Partial<M>;

type TModelBody<M> = Omit<M, "id">;

interface TModelColsListOptions<M extends Record<string, any>> {
  pickCols?: Array<keyof M>;
}
interface TModelFindAllOptions<M extends Record<string, any>> {
  params?: TModelQuery<M>;
  pickCols?: Array<keyof M>;
}

export class Model<M extends Record<string, any>> {
  readonly pool: Pool;
  readonly schema: string;
  readonly table: string;
  readonly columns: Columns<M>;
  readonly alias: string;
  readonly idKey: string;
  readonly #ident: SqlStatment;

  constructor({ pool, schema, table, columns, alias = "t", idKey = "id" }: TModelConstructorArgs<M>) {
    this.pool = pool;
    this.schema = schema;
    this.table = table;
    this.columns = columns;
    this.alias = alias;
    this.idKey = idKey;
    this.#ident = sqlIdent(this.table, this.schema, this.alias);
  }

  #colsList({ pickCols }: TModelColsListOptions<M>) {
    let cols = this.columns.getNames();
    if (pickCols && pickCols.length > 0) {
      cols = intersection(cols, pickCols);
    }
    return sqlJoinIdents(cols.map((c) => [c.toString(), this.alias]));
  }

  #whereClause(params: TModelQuery<M | Record<string, string>> = {}): SqlStatment {
    const paramEntries = Object.keys(params);
    const stmts = paramEntries.map((key) => sql`${sqlIdent(key, this.alias)} = ${params[key]}`);
    if (stmts.length === 0) {
      return sql``;
    }
    return sql`where ${sqlJoin(stmts)}`;
  }

  async findById(id: string, { pickCols }: TModelFindAllOptions<M> = {}): Promise<M> {
    const params = { [this.idKey]: id };
    const stmt = sql`
      select ${this.#colsList({ pickCols })}
      from ${this.#ident}
      ${this.#whereClause(params)}
      limit 1  
    `;

    const client = await this.pool.connect();
    const { rows }: QueryResult<M> = await client.query(stmt);
    client.release();

    const user = rows[0];
    return user;
  }

  async find({ params, pickCols }: TModelFindAllOptions<M> = {}): Promise<M[]> {
    const stmt = sql`
      select ${this.#colsList({ pickCols })}
      from ${this.#ident} 
      ${this.#whereClause(params)}
    `;

    const client = await this.pool.connect();
    const { rows }: QueryResult<M> = await client.query(stmt);
    client.release();

    const users = rows;
    return users;
  }
}
