import React from "react";
import { AppContextProvider } from "./AppContext";
import { Layout } from "./components/Layout";
import { UserList } from "./components/UserList";

function App() {
  return (
    <AppContextProvider>
      <Layout list={UserList} details="Details" />
    </AppContextProvider>
  );
}

export default App;
