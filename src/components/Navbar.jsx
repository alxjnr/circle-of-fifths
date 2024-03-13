import { useEffect, useState, useContext } from "react";
import { CurrentPageContext } from "../context/CurrentPageContext";
import { useNavigate } from "react-router-dom";
import navIcon from "../images/nav_icon.png";

export default function Navbar() {
  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);
  const [isViewingMenu, setIsViewingMenu] = useState(false);
  const navigate = useNavigate();

  function navigateToPage(str, index) {
    navigate(str);
    setCurrentPage(index);
  }

  function showMenu() {
    setIsViewingMenu((prev) => !prev);
  }

  useEffect(() => {}, [currentPage]);

  return (
    <div>
      <div className="navbar" style={{ cursor: "pointer" }} onClick={showMenu}>
        <img src={navIcon} />
        <h4 style={{ color: "gray" }}>Activities</h4>
      </div>
      {isViewingMenu ? (
        <div className="drop-down-nav">
          <h4
            onClick={() => navigateToPage("/", 0)}
            className={currentPage == 0 ? "selected-page" : ""}
          >
            Circle of Fifths
          </h4>
          <h4
            onClick={() => navigateToPage("/quiz", 1)}
            className={currentPage == 1 ? "selected-page" : ""}
          >
            Chords Quiz
          </h4>
          <h4
            onClick={() => navigateToPage("/key-signatures", 2)}
            className={currentPage == 2 ? "selected-page" : ""}
          >
            Key Signatures Quiz
          </h4>
          <h4
            onClick={() => navigateToPage("/absolute-pitch", 3)}
            className={currentPage == 3 ? "selected-page" : ""}
          >
            Absolute Pitch Trainer
          </h4>
          <h4
            onClick={() => navigateToPage("/intervals", 4)}
            className={currentPage == 4 ? "selected-page" : ""}
          >
            Intervals Quiz
          </h4>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
