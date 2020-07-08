import React from "react";
import { useParams } from "react-router-dom";
import { updateUser } from "../api";
import { UserFormValues } from "../typings";
import { useAppContext } from "../AppContext";
import { UserForm } from "../components/UserForm";

export function UserEditPage() {
  const { userId } = useParams<{ userId: string }>();
  const { users, replaceUser, deleteUser, isDeletingUser } = useAppContext();
  const user = users.find((user) => user.id === Number(userId));

  const handleSubmit = (userValues: UserFormValues) => {
    return updateUser(userId, userValues)
      .then((updatedUser) => replaceUser({ ...userValues, ...updatedUser }))
      .catch(console.error);
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
