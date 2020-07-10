import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  PropsWithChildren,
} from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { User, UserFormValues } from "./typings";
import * as usersApi from "./api";

interface Context {
  users: User[];
  isFetchingUsers: boolean;
  createUser: (userFormValues: UserFormValues) => void;
  updateUser: (userId: string, userFormValues: UserFormValues) => void;
  deleteUser: (userForDelete: User) => void;
  isDeletingUser: boolean;
}

const AppContext = createContext<Context | null>(null);

export function AppContextProvider({ children }: PropsWithChildren<{}>) {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
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

  const createUser = (userFormValues: UserFormValues) => {
    return usersApi
      .createUser(userFormValues)
      .then((createdUser) => {
        setUsers([...users, { ...userFormValues, ...createdUser }]);
        enqueueSnackbar("User created");
      })
      .catch(console.error);
  };

  const updateUser = (userId: string, userFormValues: UserFormValues) => {
    return usersApi
      .updateUser(userId, userFormValues)
      .then(({ id }) => {
        const updatedUsers = users.map((user) =>
          user.id === id ? { ...user, ...userFormValues } : user
        );
        setUsers(updatedUsers);
        enqueueSnackbar("User updated");
      })
      .catch(console.error);
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
        enqueueSnackbar("User deleted");
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
    createUser,
    updateUser,
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
