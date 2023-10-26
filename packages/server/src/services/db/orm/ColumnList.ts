import { intersection } from "lodash";
import type { Column, TColumnName } from "./Column";
import { sqlJoinIdents } from "./sql";

interface TColumnListIdentsOptions<M extends Record<string, any>> {
  pick?: Array<TColumnName<M>>;
}

interface TColumnListIdentsWithParentOptions<M extends Record<string, any>> {
  pick?: Array<TColumnName<M>>;
  parent?: string;
}

export class ColumnList<M extends Record<string, any>> {
  UNSAFE_cols: Array<Column<M>>;
  cols: Array<Column<M>>;

  constructor(cols: Array<Column<M>>) {
    this.UNSAFE_cols = cols;
    this.cols = this.UNSAFE_cols.filter((c) => !c.hidden);
  }

  names() {
    return this.cols.map((column) => column.name);
  }

  idents({ pick = [] }: TColumnListIdentsOptions<M> = {}) {
    const colNames = intersection(this.names(), pick);
    return sqlJoinIdents(colNames.map((c) => c.toString()));
  }

  identsWithParent(parent: string, { pick = [] }: TColumnListIdentsWithParentOptions<M> = {}) {
    const colNames = intersection(this.names(), pick);
    return sqlJoinIdents(colNames.map((c) => [c.toString(), parent]));
  }
}
