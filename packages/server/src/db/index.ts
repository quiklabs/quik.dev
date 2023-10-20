import { Pool } from "pg";

const pool = new Pool();

export const getDbClient = async () => {
  try {
    const client = await pool.connect();
    return client;
  } catch (err) {
    console.error("Could not get client from pool", err);
  }
};
