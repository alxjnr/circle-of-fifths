import React, { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import AbsolutePitch from "./pages/AbsolutePitch";
import KeySignatures from "./pages/KeySignatures";
import Intervals from "./pages/Intervals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CurrentIndexContext } from "./context/CurrentIndexContext";
import { NotesArrContext } from "./context/NotesArrContext";
import { CurrentPageContext } from "./context/CurrentPageContext";
import Notation from "./pages/Notation";
import Inversions from "./pages/Inversions";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [notesArr, setNotesArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <CurrentPageContext.Provider
      value={{ currentPage: currentPage, setCurrentPage: setCurrentPage }}
    >
      <NotesArrContext.Provider
        value={{ notesArr: notesArr, setNotesArr: setNotesArr }}
      >
        <CurrentIndexContext.Provider
          value={{
            currentIndex: currentIndex,
            setCurrentIndex: setCurrentIndex,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/key-signatures" element={<KeySignatures />} />
            <Route path="/absolute-pitch" element={<AbsolutePitch />} />
            <Route path="/intervals" element={<Intervals />} />
            <Route path="/notation" element={<Notation />} />
            <Route path="/inversions" element={<Inversions />} />
          </Routes>
        </CurrentIndexContext.Provider>
      </NotesArrContext.Provider>
    </CurrentPageContext.Provider>
  );
}

export default App;
