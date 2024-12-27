import User from "@/app/model/User";
import { getDBClient } from "./DBClient";
import { comparePassword, hashPassword } from "@/app/encryption/encryption";
export enum DBError {
  DUPLICATE_KEY = "23505",
  UNHANDLED = "unhandled",
}
type DBResult<T> = T | DBError;
class UserDB {
  constructor() {}

  public async addUser(user: User): Promise<DBResult<number>> {
    const client = getDBClient();
    await client.connect();
    const query = `
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING *;
  `;

    return client
      .query(query, [user.email, hashPassword(user.password)])
      .then((inserted) => 
        inserted.rows.at(0).uid
      )
      .catch((error) => {
        if (error.code === DBError.DUPLICATE_KEY) {
          return DBError.DUPLICATE_KEY;
        }
        return DBError.UNHANDLED;
      });
  }

  public async getUserId(user: User): Promise<number | null> {
    const query = `
    SELECT uid, password
    FROM users
    WHERE email = $1;
  `;

    const client = getDBClient();
    client.connect();
    const queryResult = await client.query(query, [user.email]);

    if (queryResult === null || queryResult.rowCount === 0) {
      return null;
    }
    const hashedPassword = queryResult.rows.at(0)?.password;

    if (hashedPassword === undefined) {
      return null;
    }
    if (await comparePassword(user.password, hashedPassword)) {
      return queryResult.rows.at(0)?.uid??null;
    }
    return null;
  }
}
export default UserDB;
