import { useEffect, useState, useContext } from "react";
import { CurrentPageContext } from "../context/CurrentPageContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);
  const navigate = useNavigate();

  function navigateToPage(str, index) {
    navigate(str);
    setCurrentPage(index);
  }

  useEffect(() => {}, [currentPage]);

  return (
    <div className="navbar">
      <h4
        onClick={() => navigateToPage("/", 0)}
        className={currentPage == 0 ? "selected-page" : ""}
      >
        Circle
      </h4>
      <h4
        onClick={() => navigateToPage("/quiz", 1)}
        className={currentPage == 1 ? "selected-page" : ""}
      >
        Quiz
      </h4>
      <h4
        onClick={() => navigateToPage("/key-signatures", 2)}
        className={currentPage == 2 ? "selected-page" : ""}
      >
        Key Signatures
      </h4>
      <h4
        onClick={() => navigateToPage("/absolute-pitch", 3)}
        className={currentPage == 3 ? "selected-page" : ""}
      >
        Absolute Pitch
      </h4>
    </div>
  );
}
