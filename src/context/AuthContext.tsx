import React, { createContext, useState } from "react";

import * as UserInterface from '@/interface/user';

type AuthContextType = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  userEmail: string;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
  role: UserInterface.Role;
  setRole: React.Dispatch<React.SetStateAction<UserInterface.Role>>;
  clearAuth: () => void;
};

const AuthContext = createContext<AuthContextType>({
  token: "",
  setToken: () => {},
  userId: '',
  setUserId: () => {},
  userEmail: '',
  setUserEmail: () => {},
  role: UserInterface.Role.USER,
  setRole: () => {},
  clearAuth: () => {},
});

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [role, setRole] = useState(UserInterface.Role.USER);

  const clearAuth = () => {
    setToken('');
    setUserId('');
    setUserEmail('');
    setRole(UserInterface.Role.USER);
  }

  return (
    <AuthContext.Provider value={{ token, setToken, userId, setUserId, userEmail, setUserEmail, role, setRole, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
