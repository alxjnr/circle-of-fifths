import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CurrentIndexContext } from "./context/CurrentIndexContext";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <CurrentIndexContext.Provider
      value={{ currentIndex: currentIndex, setCurrentIndex: setCurrentIndex }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </CurrentIndexContext.Provider>
  );
}

export default App;
