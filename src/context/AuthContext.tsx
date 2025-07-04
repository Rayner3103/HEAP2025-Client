import React, { createContext, useState } from "react";

type AuthContextType = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

const AuthContext = createContext<AuthContextType>({
  token: "",
  setToken: () => {},
});

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const [token, setToken] = useState("");

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
