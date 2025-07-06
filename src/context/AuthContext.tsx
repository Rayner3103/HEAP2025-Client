import React, { createContext, useState } from "react";

type AuthContextType = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;

};

const AuthContext = createContext<AuthContextType>({
  token: "",
  setToken: () => {},
  userId: '',
  setUserId: () => {},
});

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  return (
    <AuthContext.Provider value={{ token, setToken, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
