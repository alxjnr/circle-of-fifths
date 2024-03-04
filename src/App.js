import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CurrentIndexContext } from "./context/CurrentIndexContext";
import { NotesArrContext } from "./context/NotesArrContext";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [notesArr, setNotesArr] = useState([]);
  return (
    <NotesArrContext.Provider
      value={{ notesArr: notesArr, setNotesArr: setNotesArr }}
    >
      <CurrentIndexContext.Provider
        value={{ currentIndex: currentIndex, setCurrentIndex: setCurrentIndex }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </CurrentIndexContext.Provider>
    </NotesArrContext.Provider>
  );
}

export default App;
