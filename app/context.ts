import { createContext, Dispatch, SetStateAction } from "react";

export interface IUser {
  id: string;
  email: string;
}
interface IUserContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
}

export const UserContext = createContext<IUserContext | null>(null);
