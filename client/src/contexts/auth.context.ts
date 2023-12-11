import React, { createContext, Dispatch, SetStateAction } from "react";

const AuthContext = createContext<null | {
  set: Dispatch<SetStateAction<{ id: string; username: string } | null>>;
  data: { id: string; username: string } | null;
}>(null);

export default AuthContext;
