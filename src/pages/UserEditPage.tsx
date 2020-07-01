import React from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../AppContext";
import { UserForm } from "../components/UserForm";

export function UserEditPage() {
  const { userId } = useParams();
  const { users } = useAppContext();
  const user = users.find((user) => user.id === userId);

  return <UserForm title="Edit User" user={user} />;
}
