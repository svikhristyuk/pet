import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  PropsWithChildren,
} from "react";
import { useHistory } from "react-router-dom";
import { User } from "./typings";
import * as usersApi from "./api";

interface Context {
  users: User[];
  isFetchingUsers: boolean;
  addUser: (user: User) => void;
  replaceUser: (user: User) => void;
  deleteUser: (userForDelete: User) => void;
  isDeletingUser: boolean;
}

const AppContext = createContext<Context | null>(null);

export function AppContextProvider({ children }: PropsWithChildren<{}>) {
  const history = useHistory();
  const [users, setUsers] = useState<User[]>([]);
  const [isFetchingUsers, setIsFetchingUsers] = useState(false);
  const [isDeletingUser, setIsDeletingUser] = useState(false);

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

  const deleteUser = (userForDelete: User) => {
    setIsDeletingUser(true);

    usersApi
      .deleteUser(userForDelete)
      .then(() => {
        const filteredUsers = users.filter(
          (user) => user.id !== userForDelete.id
        );
        setUsers(filteredUsers);
        history.push("/");
      })
      .catch(console.error)
      .finally(() => {
        setIsDeletingUser(false);
      });
  };

  const value = {
    users,
    isFetchingUsers,
    addUser,
    replaceUser,
    deleteUser,
    isDeletingUser,
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
