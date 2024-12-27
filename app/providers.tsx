"use client";

import { useLocalStorage } from "@uidotdev/usehooks";
import { IUser, UserContext } from "./context";
import { User } from "./register/localstorage";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function Providers({ children }) {
  const [userLs, setUserLs] = useLocalStorage<User | null>("user", null);
  const [user, setUser] = useState<IUser | null>(userLs);
  const router = useRouter();
  useEffect(() => {
    setUserLs(user);
    const path = window.location.pathname;
    if (user === null && !(path == "/" || path == "/register")) {
      router.push("/");
    }
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
