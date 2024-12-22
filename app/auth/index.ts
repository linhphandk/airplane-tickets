import UserDB from "@/app/db/UserDB";
import User from "@/app/model/User";
export const login = (email: string, password: string) =>
  new UserDB().userExists(new User(email, password));
export const register = (email: string, password: string) =>
  new UserDB().addUser(new User(email, password));
