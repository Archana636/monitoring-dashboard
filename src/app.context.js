import React, { useContext, createContext } from "react";

const AppContext = createContext();

export function useAppState() {
  return useContext(AppContext);
}
function AppProvider(props) {
  const mapValueToProps = {};
  return (
    <AppContext.Provider value={mapValueToProps}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppProvider;
