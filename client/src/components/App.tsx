import React, { useEffect, useState } from "react";
import { Header } from "./header";
import { Navigation } from "./routes";
import AuthContext from "../contexts/auth.context";
import { UserFetch } from "../api/user.fetch";

function App() {
  const authContext = useState<null | { id: string; username: string }>(null);
  const authInfo = async () => {
    return await UserFetch.getMyData();
  };
  useEffect(() => {
    (async () => {
      const response = await authInfo();
      if (response.body) authContext[1](response.body);
    })();
  }, []);
  return (
    <AuthContext.Provider value={{ set: authContext[1], data: authContext[0] }}>
      <div className="App">
        <Header />
        <Navigation />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
