import React from "react";
import { useAppContext } from "../AppContext";
import { UserForm } from "../components/UserForm";

export function UserCreatePage() {
  const { createUser } = useAppContext();

  return <UserForm title="Create User" onSubmit={createUser} />;
}
