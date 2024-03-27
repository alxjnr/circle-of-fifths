import { useState } from "react";
import { CircleExplorerData } from "../data/CircleExplorerData";
import { useEffect } from "react";

function Circle({
  top,
  left,
  size,
  colour,
  text,
  isBordered,
  isSelected,
  setExplorerCircles,
}) {
  function selectNote() {
    setExplorerCircles((prev) => {
      const arr = [...prev];
      arr.forEach((e) => {
        e.is_selected = false;
        e.is_bordered = false;
      });
      const noteSelected = arr.filter((e) => e.note_name == text);
      arr.forEach((e) => {
        if (e.note_name == noteSelected[0].note_name) e.is_bordered = true;
        noteSelected[0].diatonic_chords.forEach((i) => {
          if (e.note_name == i) {
            e.is_selected = true;
            e.note_colour = "lightblue";
          }
        });
        noteSelected[0].borrowed_chords.forEach((i) => {
          if (e.note_name == i) {
            e.is_selected = true;
            e.note_colour = "lightgreen";
          }
        });
        noteSelected[0].parallel_notes.forEach((i) => {
          if (e.note_name == i) {
            e.is_selected = true;
            e.note_colour = "yellow";
          }
        });
        if (e.note_name == noteSelected[0].dominant_chord) {
          e.is_selected = true;
          e.note_colour = "linear-gradient(lightblue  0 75%, coral 75% 100%)";
        }
        if (e.note_name == noteSelected[0].subdominant_chord) {
          e.is_selected = true;
          e.note_colour =
            "linear-gradient(lightblue 0 75%,  darkmagenta 75% 100%)";
        }
        if (e.note_name == noteSelected[0].relative_note) {
          e.is_selected = true;
          e.note_colour = "linear-gradient(lightblue 0 75%, deeppink 75% 100%)";
        }
        if (e.note_name == noteSelected[0].secondary_dominant_chord) {
          e.is_selected = true;
          e.note_colour = "forestgreen";
        }
        if (e.note_name == noteSelected[0].leading_tone) {
          e.is_selected = true;
          e.note_colour = "linear-gradient(lightgreen 0 75%, khaki 75% 100%)";
        }
        if (e.note_name == noteSelected[0].tritone_sub) {
          e.is_selected = true;
          e.note_colour = "steelblue";
        }
      });
      return arr;
    });
  }

  return (
    <div
      className="circle-explorer-circles"
      style={{
        position: "absolute",
        top: `calc(50% + ${top}%)`,
        left: `calc(50% + ${left}%)`,
        width: `${size == 0 ? 10 : 7}%`,
        height: `${size == 0 ? 10 : 7}%`,
        borderRadius: "50%",
        border: `solid ${isBordered ? "red" : "gray"} ${
          isBordered ? "2px" : "1px"
        }`,
        transformOrigin: "center",
        transform: "translate(-50%, -50%)",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 0,
        background: isSelected ? colour : "white",
        cursor: "pointer",
      }}
      onClick={selectNote}
    >
      <p>{text}</p>
    </div>
  );
}

function Legend({ colour, text }) {
  return (
    <div
      className="legend-divs"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "10%",
      }}
    >
      <div
        style={{
          width: "10%",
          height: "10px",
          backgroundColor: colour,
        }}
      />
      <p>{text}</p>
    </div>
  );
}

export default function CircleExplorer() {
  const [explorerCircles, setExplorerCircles] = useState(CircleExplorerData);

  return (
    <div>
      <div className="main-centered">
        <div className="circle-explorer-container">
          <div className="circle-explorer-main-circle">
            <div
              style={{
                position: "relative",
                border: "solid gray 1px",
                height: "80%",
                width: "73%",
                borderRadius: "50%",
              }}
            >
              {explorerCircles.map((e) => {
                return (
                  <Circle
                    top={e.note_top}
                    left={e.note_left}
                    size={e.note_size}
                    colour={e.note_colour}
                    text={e.note_name}
                    isSelected={e.is_selected}
                    isBordered={e.is_bordered}
                    setExplorerCircles={setExplorerCircles}
                  />
                );
              })}
            </div>
          </div>
          <div className="circle-explorer-legend">
            <Legend colour={"lightblue"} text={"Diatonic Chords"} />
            <Legend colour={"lightgreen"} text={"Borrowed Chords"} />
            <Legend colour={"yellow"} text={"Parallel Major/Minor"} />
            <Legend colour={"coral"} text={"Dominant"} />
            <Legend colour={"darkmagenta"} text={"Subdominant"} />
            <Legend colour={"deeppink"} text={"Relative Major/Minor"} />
            <Legend colour={"forestgreen"} text={"Secondary Dominant"} />
            <Legend colour={"khaki"} text={"Leading Tone"} />
            <Legend colour={"steelblue"} text={"Tritone Substitution"} />
          </div>
        </div>
      </div>
    </div>
  );
}
