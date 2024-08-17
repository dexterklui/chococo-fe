import { createContext } from "react";

const USER_ID_LOCAL_STORAGE_KEY = "userId";

export type User = {
  userId: string;
};

export const UserContext = createContext<User>({ userId: "" });

export function getUser() {
  const storedUserId = localStorage.getItem(USER_ID_LOCAL_STORAGE_KEY);
  const user = {
    userId: storedUserId ? storedUserId : crypto.randomUUID(),
  };
  return user;
}
