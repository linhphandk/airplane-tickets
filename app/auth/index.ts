import UserDB from "@/app/db/UserDB";
import User from "@/app/model/User";
import jwt from "jsonwebtoken";
export const login = (email: string, password: string) =>
  new UserDB().getUserId(new User(email, password));
export const register = (email: string, password: string) =>
  new UserDB().addUser(new User(email, password));

export const getJWTToken = (email: string) => {
  const token = jwt.sign({ email }, "shhhhh");
  return token;
};
