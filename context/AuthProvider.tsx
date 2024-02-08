import React, { useState } from "react";
import api from "../services/api";
import { useStorageState } from "./useStorageState";
import {
  AuthProviderProps,
  AuthState,
  SignInCredentials,
  AuhtContext,
} from "./auth";

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [[isLoading, session], setSession] = useStorageState("session");

  const signIn = async ({ phonenumber, password }: SignInCredentials) => {
    const response = await api.post("/login", {
      phonenumber: "+258" + phonenumber,
      password,
    });

    console.log(response.data);
    const { user } = response.data;
    const { token } = response.data.user;
    setData({ token, user });
    api.defaults.headers.authorization = `Bearer ${token}`;
    setSession("xxx");
  };

  const signOut = async () => {
    setData({});
    setSession(null);
  };

  return (
    <AuhtContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuhtContext.Provider>
  );
};
