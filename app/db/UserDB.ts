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
      .query(query, [user.username, hashPassword(user.password)])
      .then((inserted) => inserted.oid)
      .catch((error) => {
        if (error.code === DBError.DUPLICATE_KEY) {
          return DBError.DUPLICATE_KEY;
        }
        return DBError.UNHANDLED;
      });
  }

  public async userExists(user: User): Promise<boolean> {
    const query = `
    SELECT password
    FROM users 
    WHERE email = $1;
  `;

    const client = getDBClient();
    client.connect();

    const queryResult = await client.query(query, [user.username]);

    if (queryResult === null || queryResult.rowCount === 0) {
      return false;
    }
    const hashedPassword = queryResult.rows.at(0)?.password;

    if (hashedPassword === undefined) {
      return false;
    }
    return comparePassword(user.password, hashedPassword);
  }
}
export default UserDB;
