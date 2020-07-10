import React from "react";
import { useSnackbar } from "notistack";
import { createUser } from "../api";
import { UserFormValues } from "../typings";
import { useAppContext } from "../AppContext";
import { UserForm } from "../components/UserForm";

export function UserCreatePage() {
  const { enqueueSnackbar } = useSnackbar();
  const { addUser } = useAppContext();
  const handleSubmit = (userValues: UserFormValues) => {
    return createUser(userValues)
      .then((createdUser) => {
        addUser({ ...userValues, ...createdUser });
        enqueueSnackbar("User created");
      })
      .catch(console.error);
  };

  return <UserForm title="Create User" onSubmit={handleSubmit} />;
}
