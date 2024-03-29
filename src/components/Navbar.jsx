import { useEffect, useState, useContext } from "react";
import { CurrentPageContext } from "../context/CurrentPageContext";
import { useNavigate } from "react-router-dom";
import navIcon from "../images/nav_icon.png";
import homeIcon from "../images/home-icon.png";
import circleExplorerIcon from "../images/circle-explorer-icon.png";

import { useSpring, animated } from "@react-spring/web";

export default function Navbar() {
  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);
  const [isViewingMenu, setIsViewingMenu] = useState(true);

  const navigate = useNavigate();

  const [springs, api] = useSpring(() => ({
    from: { top: -700 },
  }));

  function navigateToPage(str, index, menu) {
    navigate(str);
    setCurrentPage(index);
    if (menu) showMenu();
  }

  function showMenu() {
    setIsViewingMenu((prev) => !prev);
    if (isViewingMenu) {
      api.start({
        from: {
          top: -700,
        },
        to: {
          top: 40,
        },
      });
    } else {
      api.start({
        from: {
          top: -700,
        },
        to: {
          top: 40,
        },
        reverse: true,
      });
    }
  }

  useEffect(() => {}, [currentPage]);

  return (
    <div>
      <div className="navbar" style={{ cursor: "pointer" }}>
        <img
          src={homeIcon}
          style={{
            position: "absolute",
            top: "1%",
            left: "5%",
            opacity: "50%",
          }}
          onClick={() => navigateToPage("/", 0, false)}
        />
        <img
          src={circleExplorerIcon}
          style={{
            position: "absolute",
            top: "1%",
            left: "90%",
            opacity: "50%",
          }}
          onClick={() => navigateToPage("/circle-explorer", 7, false)}
        />
        <div
          onClick={showMenu}
          style={{
            position: "relative",
            height: "100%",
            width: "130px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img src={navIcon} />
          <h4 style={{ color: "gray" }}>Activities</h4>
        </div>
      </div>
      <animated.div className="drop-down-nav" style={{ ...springs }}>
        <h4
          onClick={() => navigateToPage("/circle-of-fifths", 0, true)}
          className={currentPage == 0 ? "selected-page" : ""}
        >
          Circle of Fifths
        </h4>
        <h4
          onClick={() => navigateToPage("/quiz", 1, true)}
          className={currentPage == 1 ? "selected-page" : ""}
        >
          Chords Quiz
        </h4>
        <h4
          onClick={() => navigateToPage("/key-signatures", 2, true)}
          className={currentPage == 2 ? "selected-page" : ""}
        >
          Key Signatures Quiz
        </h4>
        <h4
          onClick={() => navigateToPage("/absolute-pitch", 3, true)}
          className={currentPage == 3 ? "selected-page" : ""}
        >
          Absolute Pitch Trainer
        </h4>
        <h4
          onClick={() => navigateToPage("/intervals", 4, true)}
          className={currentPage == 4 ? "selected-page" : ""}
        >
          Intervals Quiz
        </h4>
        <h4
          onClick={() => navigateToPage("/notation", 5, true)}
          className={currentPage == 5 ? "selected-page" : ""}
        >
          Notation
        </h4>
        <h4
          onClick={() => navigateToPage("/inversions", 6, true)}
          className={currentPage == 6 ? "selected-page" : ""}
        >
          Inversions
        </h4>
      </animated.div>
    </div>
  );
}
