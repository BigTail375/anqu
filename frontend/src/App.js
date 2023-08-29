import React from "react";
import { useState, useContext, createContext } from "react";
import "./App.css";
import LoadingBox from "./components/LoadingBox";
import Home from "./components/screens/Home";
import MyDocument from "./components/PDF";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

export const StateContext = createContext();

const App = () => {
  const [state, setState] = useState({});

  return (
    <StateContext.Provider value={{ state, setState }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pdf" element={<MyDocument />} />
        </Routes>
      </BrowserRouter>
    </StateContext.Provider>
  );
};

export default App;
