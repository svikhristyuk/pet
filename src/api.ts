import { User, UserFormValues } from "./typings";

const apiUrl = "https://jsonplaceholder.typicode.com";
const usersEndpoint = `${apiUrl}/users`;

function handleResponse(response: Response) {
  return response.json();
}

export function fetchUsers(): Promise<User[]> {
  return fetch(usersEndpoint).then(handleResponse);
}

export function fetchUser(id: User["id"]): Promise<User> {
  return fetch(`${usersEndpoint}/${id}`).then(handleResponse);
}

export function updateUser(
  userId: string,
  userFormValues: UserFormValues
): Promise<User> {
  return fetch(`${usersEndpoint}/${userId}`, {
    method: "PUT",
    body: JSON.stringify(userFormValues),
  }).then(handleResponse);
}

export function createUser(userFormValues: UserFormValues): Promise<User> {
  return fetch(usersEndpoint, {
    method: "POST",
    body: JSON.stringify(userFormValues),
  }).then(handleResponse);
}

export function deleteUser(user: User): Promise<User> {
  return fetch(`${usersEndpoint}/${user.id}`, {
    method: "DELETE",
    body: JSON.stringify(user),
  }).then(handleResponse);
}
