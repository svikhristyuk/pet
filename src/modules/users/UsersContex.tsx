import React, {
  useState,
  createContext,
  useContext,
  PropsWithChildren,
  useEffect,
} from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { User, UserFormValues } from "../../typings";
import * as usersApi from "../../api";

interface Context {
  users: User[];
  fetchUsers: () => void;
  createUser: (userFormValues: UserFormValues) => void;
  updateUser: (userId: string, userFormValues: UserFormValues) => void;
  deleteUser: (userForDelete: User) => void;
  isDeletingUser: boolean;
}

const UsersContext = createContext<Context | null>(null);

export function UsersContextProvider({ children }: PropsWithChildren<{}>) {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [users, setUsers] = useState<User[]>([]);
  const [isDeletingUser, setIsDeletingUser] = useState(false);

  const fetchUsers = () => {
    return usersApi.fetchUsers().then(setUsers).catch(console.error);
  };

  const createUser = (userFormValues: UserFormValues) => {
    return usersApi
      .createUser(userFormValues)
      .then((createdUser) => {
        setUsers([{ ...userFormValues, ...createdUser }, ...users]);
        enqueueSnackbar("User created");
        history.push(`/users/${createdUser.id}`);
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
        history.push("/users");
      })
      .catch(console.error)
      .finally(() => {
        setIsDeletingUser(false);
      });
  };

  const value = {
    users,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    isDeletingUser,
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
}

export function useUsersContext() {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error(`Used outside of "UsersContextProvider"`);
  }

  return context;
}
