import { Column, Columns, Model } from "../orm";
import { pool } from "../pool";

export interface IProject {
  id: string;
  name: string;
  slug: string;
  created_on: Date;
  updated_on: Date;
}

export const Projects = new Model<IProject>({
  pool,
  schema: "public",
  table: "projects",
  columns: new Columns(
    new Column({ name: "id", datatype: "uuid" }),
    new Column({ name: "name", datatype: "text" }),
    new Column({ name: "slug", datatype: "text" }),
    new Column({ name: "created_on", datatype: "timestamptz" }),
    new Column({ name: "updated_on", datatype: "timestamptz" }),
  ),
});
