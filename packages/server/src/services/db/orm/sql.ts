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
  text: string = "";
  values: any[] = [];
}

export const sql = (strs: TemplateStringsArray, ...params: TSqlValue[]) => {
  const stmt = new SqlStatment();

  for (const str of strs) {
    stmt.text += str;
    if (params.length > 0) {
      const param = params.shift();
      if (param instanceof SqlStatment) {
        stmt.text += param.text;
        stmt.values = stmt.values.concat(param.values);
      } else {
        stmt.values.push(param);
        stmt.text += `$${stmt.values.length}`;
      }
    }
  }

  stmt.text = stmt.text.trim();

  return stmt;
};

export const sqlJoin = (stmts: SqlStatment[], delimiter: string = ", ") => {
  const stmt = new SqlStatment();
  for (const [index, currentStmt] of stmts.entries()) {
    if (index > 0) currentStmt.text += delimiter;
    stmt.text += currentStmt.text;
    stmt.values = stmt.values = stmt.values.concat(currentStmt.values);
  }
  return stmt;
};

export const sqlIdent = (identifier: string, parent?: string, alias?: string) => {
  const stmt = new SqlStatment();
  if (identifier && !parent && !alias) {
    stmt.text += format('"%I"', identifier);
  } else if (identifier && parent && !alias) {
    stmt.text += format('"%I"."%I"', parent, identifier);
  } else if (identifier && !parent && alias) {
    stmt.text += format('"%I" as "%I"', identifier, alias);
  } else if (identifier && parent && alias) {
    stmt.text += format('"%I"."%I" as "%I"', parent, identifier, alias);
  }
  return stmt;
};

type TIdentTuple = [identifier: string, parent?: string, alias?: string];

export const sqlJoinIdents = (identifiers: Array<string | TIdentTuple>, delimiter: string = ", ") => {
  const stmt = new SqlStatment();
  for (const [index, identifier] of identifiers.entries()) {
    if (index > 0) stmt.text += delimiter;
    const args: TIdentTuple = typeof identifier === "string" ? [identifier] : identifier;
    const identStmt = sqlIdent(...args);
    stmt.text += identStmt.text;
    stmt.values = stmt.values.concat(identStmt.values); // no use
  }
  return stmt;
};
