import React, { createContext, useContext } from "react";
import { PodcastStore } from "./PodcastStore";


const store = PodcastStore.create({ podcasts: [] });
export const StoreContext = createContext<typeof PodcastStore.Type>(store);

export const StoreProvider: React.FC = ({ children }:any) => {
  React.useEffect(() => {
    store.fetchPodcasts();
  }, []);

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);