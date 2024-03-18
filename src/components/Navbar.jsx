import { useEffect, useState, useContext } from "react";
import { CurrentPageContext } from "../context/CurrentPageContext";
import { useNavigate } from "react-router-dom";
import navIcon from "../images/nav_icon.png";
import { useSpring, animated } from "@react-spring/web";

export default function Navbar() {
  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);
  const [isViewingMenu, setIsViewingMenu] = useState(true);

  const navigate = useNavigate();

  const [springs, api] = useSpring(() => ({
    from: { top: -700 },
  }));

  function navigateToPage(str, index) {
    navigate(str);
    setCurrentPage(index);
  }

  function showMenu() {
    setIsViewingMenu((prev) => !prev);
    if (isViewingMenu) {
      api.start({
        from: {
          top: -700,
        },
        to: {
          top: 50,
        },
      });
    } else {
      api.start({
        from: {
          top: -700,
        },
        to: {
          top: 50,
        },
        reverse: true,
      });
    }
  }

  useEffect(() => {}, [currentPage]);

  return (
    <div>
      <div className="navbar" style={{ cursor: "pointer" }} onClick={showMenu}>
        <img src={navIcon} />
        <h4 style={{ color: "gray" }}>Activities</h4>
      </div>
      <animated.div className="drop-down-nav" style={{ ...springs }}>
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
        <h4
          onClick={() => navigateToPage("/notation", 5)}
          className={currentPage == 4 ? "selected-page" : ""}
        >
          Notation
        </h4>
        <h4
          onClick={() => navigateToPage("/inversions", 6)}
          className={currentPage == 4 ? "selected-page" : ""}
        >
          Inversions
        </h4>
      </animated.div>
    </div>
  );
}
