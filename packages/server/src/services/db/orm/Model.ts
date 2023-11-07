import type { Pool, QueryResult } from "pg";
import type { ColumnList } from "./ColumnList";
import type { SqlStatment } from "./sql";
import { sql, sqlIdent, sqlJoin } from "./sql";
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

interface TModelClauseWhereOpts<M extends Record<string, any>> {
  filter?: TModeFilter<M>;
}

interface TModelFindByIdOpts<M extends Record<string, any>> {
  pick?: Array<TColumnName<M>>;
}
interface TModelFindAllOptions<M extends Record<string, any>> {
  filter?: TModeFilter<M>;
  pick?: Array<TColumnName<M>>;
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

  #clauseWhere({ filter = {} }: TModelClauseWhereOpts<M> = {}): SqlStatment {
    const keys = Object.keys(filter ?? {});

    if (keys.length > 0) {
      const stmts = keys.map((key) => sql`${sqlIdent(key, this.#alias)} = ${filter[key]}`);
      return sql`where ${sqlJoin(stmts)}`;
    }
    return sql``;
  }

  async selectById(id: string, { pick }: TModelFindByIdOpts<M> = {}): Promise<M> {
    const stmt = sql`
      select ${this.columns.identsWithParent(this.#alias, { pick })}
      from ${this.#identWithAlias}
      where ${sqlIdent(this.idKey, this.#alias)} = ${id}
      limit 1  
    `;

    const client = await this.pool.connect();
    const { rows }: QueryResult<M> = await client.query(stmt);
    client.release();

    const user = rows[0];
    return user;
  }

  async select({ filter, pick }: TModelFindAllOptions<M> = {}): Promise<M[]> {
    const stmt = sql`
      select ${this.columns.identsWithParent(this.#alias, { pick })}
      from ${this.#ident} ${this.#alias}
      ${this.#clauseWhere(filter)}
    `;

    const client = await this.pool.connect();
    const { rows }: QueryResult<M> = await client.query(stmt);
    client.release();

    const users = rows;
    return users;
  }

  async insertOne({ body }: TModelInsertOneOptions<M>) {
    const colNames = Object.keys(body) as Array<TColumnName<M>>;
    const values = Object.values(body);
    const stmt = sql`
      insert into ${this.#ident} (${this.columns.idents({ pick: colNames })})
      values ${values}
      returning *
    `;

    const client = await this.pool.connect();
    const { rows }: QueryResult<M> = await client.query(stmt);
    client.release();

    const user = rows[0];
    return user;
  }
}
