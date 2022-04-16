import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import CreateLocation from "./Pages/CreateLocation/CreateLocation";
import Home from "./Pages/Home/Home";

const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<CreateLocation />} path="/create-location" />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
