import React from "react";
import { useUsersContext } from "../UsersContex";
import { UserForm } from "../components/UserForm";

export function UserCreatePage() {
  const { createUser } = useUsersContext();

  return <UserForm title="Create User" onSubmit={createUser} />;
}
