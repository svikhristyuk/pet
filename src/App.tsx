import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AppContextProvider } from "./AppContext";
import { Layout } from "./components/Layout";
import { UserList } from "./components/UserList";
import { UserCreatePage } from "./pages/UserCreatePage";
import { UserEditPage } from "./pages/UserEditPage";
import { UserNotSelectedPage } from "./pages/UserNotSelectedPage";

function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Layout
          list={UserList}
          details={
            <Switch>
              <Route path="/create">
                <UserCreatePage />
              </Route>

              <Route path="/:userId">
                <UserEditPage />
              </Route>

              <Route path="/">
                <UserNotSelectedPage />
              </Route>
            </Switch>
          }
        />
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
