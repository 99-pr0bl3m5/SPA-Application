import React from "react";
import { Routes, Route } from "react-router-dom";
import { PAGES } from "./models/Routermodel";

const RoutesIndex = () => {

  return (
    <>
      <Routes>
        {PAGES.map((res, i) => {
          return (
            <Route key={i} path={res.PAGE_PATH} element={res.PAGE_COMPONENT} />
          );
        })}
      </Routes>
    </>
  );
};

export default RoutesIndex;
