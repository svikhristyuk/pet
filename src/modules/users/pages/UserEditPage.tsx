import React from "react";
import { useParams } from "react-router-dom";
import { UserFormValues } from "../../../typings";
import { useUsersContext } from "../UsersContex";
import { UserForm } from "../components/UserForm";

export function UserEditPage() {
  const { userId } = useParams<{ userId: string }>();
  const { users, updateUser, deleteUser, isDeletingUser } = useUsersContext();
  const user = users.find((user) => user.id === Number(userId));
  const handleSubmit = (userFormValues: UserFormValues) => {
    return updateUser(userId, userFormValues);
  };

  return (
    <UserForm
      title="Edit User"
      user={user}
      onSubmit={handleSubmit}
      onDelete={deleteUser}
      isDeleting={isDeletingUser}
    />
  );
}
