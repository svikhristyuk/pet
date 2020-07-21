import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { UserList } from "./components/UserList";
import { UserCreatePage } from "./pages/UserCreatePage";
import { UserEditPage } from "./pages/UserEditPage";
import { UserNotSelectedPage } from "./pages/UserNotSelectedPage";
import { UsersContextProvider } from "./UsersContex";

export function Users() {
  const { path } = useRouteMatch();

  return (
    <UsersContextProvider>
      <Layout
        list={<UserList />}
        details={
          <Switch>
            <Route path={`${path}/create`}>
              <UserCreatePage />
            </Route>

            <Route path={`${path}/:userId`}>
              <UserEditPage />
            </Route>

            <Route path={path}>
              <UserNotSelectedPage />
            </Route>
          </Switch>
        }
      />
    </UsersContextProvider>
  );
}
