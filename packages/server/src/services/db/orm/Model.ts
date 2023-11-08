import type { Pool, QueryResult } from "pg";
import type { ColumnList } from "./ColumnList";
import type { SqlStatment } from "./sql";
import { sql, sqlIdent, sqlJoin, sqlJoinIdents, sqlJoinLiterals } from "./sql";
import type { TColumnName } from "./Column";

interface TModelConstructorArgs<M extends Record<string, any>> {
  pool: Pool;
  schema: string;
  table: string;
  columns: ColumnList<M>;
  alias?: string;
  idKey?: string;
}

type TModeFilter<M extends Record<string, any>> = Partial<M>;

type TModelBody<M> = Partial<M>;

interface TModelFindByIdOpts<M extends Record<string, any>> {
  cols?: Array<TColumnName<M>>;
}
interface TModelFindAllOptions<M extends Record<string, any>> {
  filter?: TModeFilter<M>;
  cols?: Array<TColumnName<M> | string>;
}

interface TModelInsertOneOptions<M extends Record<string, any>> {
  body: TModelBody<M>;
}

export class Model<M extends Record<string, any>> {
  readonly pool: Pool;
  readonly schema: string;
  readonly table: string;
  readonly columns: ColumnList<M>;
  readonly idKey: string;
  readonly #alias: string;
  readonly #ident: SqlStatment;
  readonly #identWithAlias: SqlStatment;

  constructor({ pool, schema, table, columns, alias = "t", idKey = "id" }: TModelConstructorArgs<M>) {
    this.pool = pool;
    this.schema = schema;
    this.table = table;
    this.idKey = idKey;
    this.columns = columns;
    this.#alias = alias;
    this.#ident = sqlIdent(this.table, this.schema);
    this.#identWithAlias = sqlIdent(this.table, this.schema, this.#alias);
  }

  #clauseWhere(filter: Partial<M> = {}): SqlStatment {
    const keys = Object.keys(filter ?? {});

    if (keys.length > 0) {
      const stmts = keys.map((key) => sql`${sqlIdent(key, this.#alias)} = ${filter[key]}`);
      return sql`where ${sqlJoin(stmts)}`;
    }
    return sql``;
  }

  async selectById(id: string, { cols }: TModelFindByIdOpts<M> = {}): Promise<M> {
    const stmt = sql`
      select ${this.columns.identsWithParent(this.#alias, { cols })}
      from ${this.#identWithAlias}
      where ${sqlIdent(this.idKey, this.#alias)} = ${id}
      limit 1  
    `;

    const client = await this.pool.connect();
    const { rows }: QueryResult<M> = await client.query(stmt);
    client.release();

    return rows[0];
  }

  async select({ filter, cols }: TModelFindAllOptions<M> = {}): Promise<M[]> {
    const stmt = sql`
      select ${this.columns.identsWithParent(this.#alias, { cols })}
      from ${this.#identWithAlias}
      ${this.#clauseWhere(filter)}
    `;

    const client = await this.pool.connect();
    const { rows }: QueryResult<M> = await client.query(stmt);
    client.release();

    return rows;
  }

  async insertOne({ body }: TModelInsertOneOptions<M>) {
    const colNames = Object.keys(body) as Array<TColumnName<M>>;
    const values = Object.values(body);
    const stmt = sql`
      insert into ${this.#ident} (${sqlJoinIdents(colNames)})
      values (${sqlJoinLiterals(values)})
      returning *
    `;

    const client = await this.pool.connect();
    const { rows }: QueryResult<M> = await client.query(stmt);
    client.release();

    const row = this.columns.names().reduce((acc: Partial<M>, colName) => {
      acc[colName] = rows[0][colName];
      return acc;
    }, {}) as M;

    return row;
  }
}
