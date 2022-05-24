import { createContext, useContext } from "react";

const userContext = createContext(null);
const useUser = () => useContext(userContext);

const userProvider = ({ value, children }) => {
  return (
    <userContext.Provider value={userContext}>{children}</userContext.Provider>
  );
};

export { userContext, useUser, userProvider };
