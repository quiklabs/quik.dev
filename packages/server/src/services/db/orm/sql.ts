import format from "pg-format";

type TSqlValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Date
  | SqlStatment
  | TSqlValue[]
  | { [key: string]: TSqlValue };

export class SqlStatment {
  sql: string = "";
  values: any[] = [];

  get text() {
    let index = 1;
    return this.sql.replace(/\?/g, () => {
      return `$${index++}`;
    });
  }
}

export const sql = (strs: TemplateStringsArray, ...params: TSqlValue[]) => {
  const stmt = new SqlStatment();

  for (const str of strs) {
    stmt.sql += str;
    if (params.length > 0) {
      const param = params.shift();
      if (param instanceof SqlStatment) {
        stmt.sql += param.sql;
        stmt.values = stmt.values.concat(param.values);
      } else {
        stmt.values.push(param);
        stmt.sql += `?`;
      }
    }
  }

  stmt.sql = stmt.sql.trim();

  return stmt;
};

export const sqlJoin = (stmts: SqlStatment[], delimiter: string = ", ") => {
  const stmt = new SqlStatment();
  for (const [index, currentStmt] of stmts.entries()) {
    if (index > 0) stmt.sql += delimiter;
    stmt.sql += currentStmt.sql;
    stmt.values = stmt.values = stmt.values.concat(currentStmt.values);
  }
  return stmt;
};

export const sqlJoinLiterals = (literals: any[], delimiter: string = ", ") => {
  const literalStmt = literals.map((literal) => sql`${literal}`);
  const stmt = sqlJoin(literalStmt, delimiter);
  return stmt;
};

export const sqlIdent = (identifier: string, parent?: string, alias?: string) => {
  const stmt = new SqlStatment();
  if (identifier && !parent && !alias) {
    stmt.sql += format("%I", identifier);
  } else if (identifier && parent && !alias) {
    stmt.sql += format("%I.%I", parent, identifier);
  } else if (identifier && !parent && alias) {
    stmt.sql += format("%I as %I", identifier, alias);
  } else if (identifier && parent && alias) {
    stmt.sql += format("%I.%I as %I", parent, identifier, alias);
  }
  return stmt;
};

type TIdentTuple = [identifier: string, parent?: string, alias?: string];

export const sqlJoinIdents = (identifiers: Array<string | TIdentTuple>, delimiter: string = ", ") => {
  const stmt = new SqlStatment();
  for (const [index, identifier] of identifiers.entries()) {
    if (index > 0) stmt.sql += delimiter;
    const args: TIdentTuple = typeof identifier === "string" ? [identifier] : identifier;
    const identStmt = sqlIdent(...args);
    stmt.sql += identStmt.sql;
    stmt.values = stmt.values.concat(identStmt.values); // no use
  }
  return stmt;
};
