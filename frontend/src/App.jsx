import React, { useContext, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import RoutesIndex from "./Routes";
import { userContext } from "./context/useUser";

function App() {
  const [currentUser, setCurrentUser] = useState({
    // token: localStorage.getItem("token"),
    // name: localStorage.getItem("name"),
  });
  useEffect(() => {
    // console.log("get token from local storage");
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    setCurrentUser({ token: token, name: name });
  }, []);
  return (
    <div className="App">
      <userContext.Provider value={{ currentUser, setCurrentUser }}>
        <RoutesIndex />
      </userContext.Provider>
    </div>
  );
}

export default App;
