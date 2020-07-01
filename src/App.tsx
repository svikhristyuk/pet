import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AppContextProvider } from "./AppContext";
import { Layout } from "./components/Layout";
import { UserList } from "./components/UserList";
import { UserForm } from "./components/UserForm";
import { UserNotSelected } from "./components/UserNotSelected";

function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Layout
          list={UserList}
          details={
            <Switch>
              <Route path="/:id">
                <UserForm />
              </Route>

              <Route path="/">
                <UserNotSelected />
              </Route>
            </Switch>
          }
        />
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
