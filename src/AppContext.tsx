import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  PropsWithChildren,
} from "react";
import { User } from "./typings";
import * as usersApi from "./api";

interface Context {
  users: User[];
  isFetchingUsers: boolean;
  addUser: (user: User) => void;
  replaceUser: (user: User) => void;
}

const AppContext = createContext<Context | null>(null);

export function AppContextProvider({ children }: PropsWithChildren<{}>) {
  const [users, setUsers] = useState<User[]>([]);
  const [isFetchingUsers, setIsFetchingUsers] = useState(false);

  useEffect(() => {
    setIsFetchingUsers(true);
    usersApi
      .fetchUsers()
      .then(setUsers)
      .finally(() => setIsFetchingUsers(false));
  }, []);

  const addUser = (user: User) => {
    setUsers([...users, user]);
  };

  const replaceUser = (userForReplace: User) => {
    const updatedUsers = users.map((user) =>
      user.id === userForReplace.id ? userForReplace : user
    );
    setUsers(updatedUsers);
  };

  const value = {
    users,
    isFetchingUsers,
    addUser,
    replaceUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(`Used outside of "AppContextProvider"`);
  }

  return context;
}
