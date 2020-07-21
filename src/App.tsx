import React from "react";
import { SnackbarProvider } from "notistack";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Users } from "./modules/users/Users";

export function App() {
  return (
    <SnackbarProvider
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      variant="success"
    >
      <BrowserRouter>
        <Switch>
          <Route path="/users">
            <Users />
          </Route>

          <Redirect to="/users" />
        </Switch>
      </BrowserRouter>
    </SnackbarProvider>
  );
}
