import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

export const getDbClient = async () => {
  const client = await pool.connect();
  return client;
};
