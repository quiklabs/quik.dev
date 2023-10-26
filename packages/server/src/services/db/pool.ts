import { Pool, Query } from "pg";

const submit = Query.prototype.submit;
Query.prototype.submit = function (...args) {
  // // @ts-expect-error // types are not defined for internal methods in 'pg' package
  // logger.debug({ text: this.text, values: this.values }, "db query");
  submit.apply(this, args);
};

export const pool = new Pool({
  connectionString: process.env.DB_URL,
});
