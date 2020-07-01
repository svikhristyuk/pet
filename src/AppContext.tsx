import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  PropsWithChildren,
} from "react";
import { fetchUsers, User } from "./api";

interface Context {
  users: User[];
  isFetchingUsers: boolean;
}

const AppContext = createContext<Context | null>(null);

export function AppContextProvider({ children }: PropsWithChildren<{}>) {
  const [users, setUsers] = useState<User[]>([]);
  const [isFetchingUsers, setIsFetchingUsers] = useState(false);

  useEffect(() => {
    setIsFetchingUsers(true);
    fetchUsers()
      .then(setUsers)
      .finally(() => setIsFetchingUsers(false));
  }, []);

  const value = { users, isFetchingUsers };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(`Used outside of "AppContextProvider"`);
  }

  return context;
}
