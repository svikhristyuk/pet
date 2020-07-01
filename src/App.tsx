import React from "react";
import { AppContextProvider } from "./AppContext";
import { Layout } from "./components/Layout";
import { UserList } from "./components/UserList";
import { UserForm } from "./components/UserForm";

function App() {
  return (
    <AppContextProvider>
      <Layout list={UserList} details={UserForm} />
    </AppContextProvider>
  );
}

export default App;
