import React, { createContext, ReactNode, useContext, useState } from "react";
import api from "../services/api";

interface IApp {
  filters?: IFilters;
  
}

interface IFilters {
  dogRaces: [];

}

interface IRaces {
  phonenumber: string;
  name?: string;
  type?: string;
  location?: string;
  password?: string;
  //   user?: User;
}


interface AppContextData {
  getDogRaces: () => Promise<Boolean>;
  processing: Boolean;
  appData: IApp;
}

interface AppProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextData>(
  {} as AppContextData
);



const AppProvider = ({ children }: AppProviderProps) => {
  const [appData, setAppData] = useState<IApp>({filters:{dogRaces:[]}} as IApp);
  const [processing, setProcessing] = useState(false);


  const getDogRaces = async () => {
    setProcessing(true);

    try {
      const response = await api.get("/dogs/races");

      // if (response.data.user) {
      console.log(JSON.stringify(response.data));
      const tmp=Object.keys(response.data.races);
      const newTmp=[];
      tmp.forEach(i=>newTmp.push({id:i, value:i, filter:`race=${i}`}));
    const tmpAppData=JSON.parse(JSON.stringify(appData));
    tmpAppData.filters.dogRaces=newTmp;
      setAppData(tmpAppData);
      setProcessing(false);
      return true;
    } catch (error) {
      console.log(JSON.stringify(error));

      setProcessing(false);
      return false;
    }
  };





  return (
    <AppContext.Provider
      value={{
        getDogRaces,
        appData,
        processing,       
        
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppData = (): AppContextData => {
  const context = useContext(AppContext);
  return context;
};

export { AppProvider, useAppData };
