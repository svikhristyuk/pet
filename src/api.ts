import { User } from "./typings";

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

export function updateUser(user: User): Promise<User> {
  return fetch(`${usersEndpoint}/${user.id}`, {
    method: "PUT",
    body: JSON.stringify(user),
  }).then(handleResponse);
}

export function createUser(user: User): Promise<User> {
  return fetch(usersEndpoint, {
    method: "POST",
    body: JSON.stringify(user),
  }).then(handleResponse);
}

export function removeUser(user: User): Promise<User> {
  return fetch(`${usersEndpoint}/${user.id}`, {
    method: "DELETE",
    body: JSON.stringify(user),
  }).then(handleResponse);
}
