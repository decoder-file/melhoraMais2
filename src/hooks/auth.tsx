import React, { createContext, useState, useContext, ReactNode } from "react";

import { api } from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
  location: string;
}

interface AuthState {
  access_token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>({} as AuthState);

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post("/login", {
      email,
      password,
    });

    const { access_token, user } = response.data;

    api.defaults.headers.authorization = `Bearer ${access_token}`

    setData({ access_token, user });
  }

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
