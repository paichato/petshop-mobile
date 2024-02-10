import React, { createContext, ReactNode, useContext, useState } from "react";
import api from "../services/api";
import { useStorageState } from "./useStorageState";

interface User {
  id: string;
  phonenumber: string;
  name: string;
  driver_license: string;
  avatar: string;
  password: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  phonenumber: String;
  password: String;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  session: string | null;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [[isLoading, session], setSession] = useStorageState("session");

  const signIn = async ({ phonenumber, password }: SignInCredentials) => {
    // const response = await api.post("/login", {
    //   phonenumber: "+258" + phonenumber,
    //   password,
    // });

    // console.log(JSON.stringify(response.data));
    // const { user } = response.data;
    // const { token } = response.data.user;
    // setData({ token, user });
    // api.defaults.headers.authorization = `Bearer ${token}`;
    setSession("xxx");
  };

  const signOut = async () => {
    setData({ token: "", user: null });
    console.warn("Deleted Data");
    delete api.defaults.headers.authorization;
    console.warn("Deleted headers");
    setSession(null);
    console.warn("Deleted session");
  };

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, session, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };
