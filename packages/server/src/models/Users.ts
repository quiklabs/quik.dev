import { Column, ColumnList, Model } from "../services/db/orm";
import { pool } from "../services/db/pool";

export interface IUser {
  id: string;
  fullname: string;
  email: string;
  hashedPassword: string; // should be hidden
  createdOn: Date;
  updatedOn: Date;
}

export const Users = new Model<IUser>({
  pool,
  schema: "public",
  table: "users",
  columns: new ColumnList([
    new Column({ name: "id", datatype: "uuid" }),
    new Column({ name: "fullname", datatype: "text" }),
    new Column({ name: "email", datatype: "text" }),
    new Column({ name: "hashedPassword", datatype: "text", hidden: true }),
    new Column({ name: "createdOn", datatype: "timestamptz" }),
    new Column({ name: "updatedOn", datatype: "timestamptz" }),
  ]),
});
