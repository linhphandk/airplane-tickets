import { Client } from "pg";
export const getDBClient = () =>
  new Client({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "postgres",
  });
