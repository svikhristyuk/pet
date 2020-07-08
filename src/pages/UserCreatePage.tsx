import React from "react";
import { createUser } from "../api";
import { UserFormValues } from "../typings";
import { useAppContext } from "../AppContext";
import { UserForm } from "../components/UserForm";

export function UserCreatePage() {
  const { addUser } = useAppContext();
  const handleSubmit = (userValues: UserFormValues) => {
    return createUser(userValues)
      .then((createdUser) => addUser({ ...userValues, ...createdUser }))
      .catch(console.error);
  };

  return <UserForm title="Create User" onSubmit={handleSubmit} />;
}
