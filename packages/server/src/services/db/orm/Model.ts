// import { types } from "pg";
import type { Pool, QueryResult } from "pg";
import type { Columns } from "./Columns";
import { Stmt } from "./Stmt";

interface TModelConstructorArgs {
  pool: Pool;
  schema: string;
  table: string;
  columns: Columns;
}

type TModelQuery<TModelDef> = Partial<TModelDef>;

// type TModelBody<TModelDef> = Omit<TModelDef, "id">;

export class Model<TModelDef extends Record<string, any>> {
  pool: Pool;
  schema: string;
  table: string;
  columns: Columns;

  constructor({ pool, schema, table, columns }: TModelConstructorArgs) {
    this.pool = pool;
    this.schema = schema;
    this.table = table;
    this.columns = columns;
  }

  #composeSelect(): Stmt {
    const stmt = new Stmt();
    stmt.addPartials(/* sql */ `select %I from "%I"."%I"`);
    stmt.addPartialParams(this.columns.getNames(), this.schema, this.table);
    return stmt;
  }

  #composeWhere(params: TModelQuery<TModelDef> = {}): Stmt {
    const stmt = new Stmt();
    const keys = Object.keys(params);
    if (keys.length > 0) {
      keys.forEach((key, index) => {
        stmt.addPartials(/* sql */ ` ${index === 0 ? "where" : "and"} %I = ?`);
        stmt.addPartialParams(key);
        stmt.addValues(params[key]);
      });
    }
    return stmt;
  }

  #composeLimit(limit: number): Stmt {
    const stmt = new Stmt();
    stmt.addPartials(/* sql */ ` limit ?`);
    stmt.addValues(limit);
    return stmt;
  }

  async findOne(params?: TModelQuery<TModelDef>): Promise<TModelDef> {
    const stmt = new Stmt();
    stmt.addStmt(this.#composeSelect());
    stmt.addStmt(this.#composeWhere(params));
    stmt.addStmt(this.#composeLimit(1));
    const qStmt = stmt.build();

    const client = await this.pool.connect();
    const { rows }: QueryResult<TModelDef> = await client.query(qStmt);
    client.release();

    const user = rows[0];
    return user;
  }

  async findAll(params?: TModelQuery<TModelDef>): Promise<TModelDef[]> {
    const stmt = new Stmt();
    stmt.addStmt(this.#composeSelect());
    stmt.addStmt(this.#composeWhere(params));
    const qStmt = stmt.build();

    const client = await this.pool.connect();
    const { rows }: QueryResult<TModelDef> = await client.query(qStmt);
    client.release();

    const users = rows;
    return users;
  }

  // async createOne(body: TModelBody<TModelDef>): Promise<TModelDef> {
  //   const user: TModelDef = { name: "user" };
  //   return user;
  // }
}
