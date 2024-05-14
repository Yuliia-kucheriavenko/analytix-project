import React from "react";
import Store from "./store";
interface State {
  store: Store;
}
const store = new Store();

export const StoreContext = React.createContext<State>({
  store
});

type Props = {
  children: React.ReactNode;
}

export const StoreProvider: React.FC<Props> = ({children}) => {
  return (
    <StoreContext.Provider value={{store}}>
      {children}
    </StoreContext.Provider>
  )
}