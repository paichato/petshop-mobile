import React, { createContext, ReactNode, useContext, useState } from "react";
import api from "../services/api";

interface User {
  id?: string;
  phonenumber?: string;
  name?: string;
  password?: string;
  location?: string;
  memberSince?: Date;
  type?: string;
  sellerType?: string;
  servicesType?: string;
  deleted?: Boolean;
  blocked?: Boolean;
  banned?: Boolean;
  stars?: Number;
  email?: string;
  bio?: string;
  points?: Number;
  isSuper?: Boolean;
  image?: UserImage;
  gender?: string;
}

interface UserImage {
  url: string;
  public_id: string;
}

interface UserState {
  phonenumber: string;
  name?: string;
  type?: string;
  location?: string;
  password?: string;
  //   user?: User;
}

interface SignUpCredentials {
  name: string;
  phonenumber: string;
  password: string;
  confirmPassword: string;
  location: string;
  otp?: string;
}

interface NewAccountContextData {
  signUp: (credentials: SignUpCredentials) => Promise<Boolean>;
  processing: Boolean;
  generateOtpCode: () => number;
  updateUserData: (val: User) => void;
  userData: UserState;
  generatedCode: Number;
}

interface NewAccountProviderProps {
  children: ReactNode;
}

const NewAccountContext = createContext<NewAccountContextData>(
  {} as NewAccountContextData
);

export function useSession() {
  const value = React.useContext(NewAccountContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

const NewAccountProvider = ({ children }: NewAccountProviderProps) => {
  const [userData, setUserData] = useState<UserState>({} as UserState);
  const [processing, setProcessing] = useState(false);
  const [generatedCode, setGeneratedCode] = useState(0);
  //   const [userNumber,setGeneratedCode]=useState(0);

  const signUp = async ({
    phonenumber,
    password,
    name,
    location,
  }: SignUpCredentials) => {
    setProcessing(true);

    try {
      const response = await api.post("/create", {
        phonenumber: "+258" + phonenumber,
        password,
        name,
        type: "Regular",
        location,
      });

      // if (response.data.user) {
      console.log(JSON.stringify(response.data));

      setUserData({ phonenumber, name, type, location });
      setProcessing(false);
      return true;
    } catch (error) {
      console.log(JSON.stringify(error));
      setUserData({});
      setProcessing(false);
      return false;
    }
  };

  const generateOtpCode = () => {
    let newCode = Math.floor(Math.random() * 1000000);
    setGeneratedCode(newCode);
    return newCode;
  };

  const updateUserData = (newData: UserState) => {
    setUserData(newData);
  };

  return (
    <NewAccountContext.Provider
      value={{
        userData,
        signUp,
        processing,
        generateOtpCode,
        updateUserData,
        generatedCode,
      }}
    >
      {children}
    </NewAccountContext.Provider>
  );
};

const useNew = (): NewAccountContextData => {
  const context = useContext(NewAccountContext);
  return context;
};

export { NewAccountProvider, useNew };
