import { Column, ColumnList, Model } from "../services/db/orm";
import { pool } from "../services/db/pool";

export interface IWorkspace {
  id: string;
  name: string;
  slug: string;
  created_on: Date;
  updated_on: Date;
}

export const Workspaces = new Model<IWorkspace>({
  pool,
  schema: "public",
  table: "workspaces",
  columns: new ColumnList([
    new Column({ name: "id", datatype: "uuid" }),
    new Column({ name: "name", datatype: "text" }),
    new Column({ name: "slug", datatype: "text" }),
    new Column({ name: "created_on", datatype: "timestamptz" }),
    new Column({ name: "updated_on", datatype: "timestamptz" }),
  ]),
});
