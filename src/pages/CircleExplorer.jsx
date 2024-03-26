function Circle({ top, left, width, height, text }) {
  return (
    <div
      className="circle-explorer-circles"
      style={{
        position: "absolute",
        top: `calc(50% + ${top}%)`,
        left: `calc(50% + ${left}%)`,
        width: `${width}%`,
        height: `${height}%`,
        borderRadius: "50%",
        border: "solid black 1px",
        transformOrigin: "center",
        transform: "translate(-50%, -50%)",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 0,
        backgroundColor: "white",
      }}
    >
      <p>{text}</p>
    </div>
  );
}

function Legend({ colour, text }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: "10px",
        alignItems: "center",
        width: "90px",
      }}
    >
      <div
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: colour,
        }}
      />
      <p>{text}</p>
    </div>
  );
}

export default function CircleExplorer() {
  return (
    <div>
      <div className="main-centered">
        <div className="circle-explorer-container">
          <div
            style={{
              position: "relative",
              border: "solid black 1px",
              height: "80%",
              width: "73%",
              borderRadius: "50%",
            }}
          >
            <Circle top={-40} left={0} width={10} height={10} text={"C"} />
            <Circle top={40} left={0} width={10} height={10} text={"Gb/F#"} />
            <Circle top={0} left={40} width={10} height={10} text={"A"} />
            <Circle top={0} left={-40} width={10} height={10} text={"Eb"} />
            <Circle top={-35} left={-20} width={10} height={10} text={"F"} />
            <Circle top={-20} left={-35} width={10} height={10} text={"Bb"} />
            <Circle top={35} left={20} width={10} height={10} text={"B/Cb"} />
            <Circle top={20} left={35} width={10} height={10} text={"E"} />
            <Circle top={35} left={-20} width={10} height={10} text={"Db/C#"} />
            <Circle top={20} left={-35} width={10} height={10} text={"Ab"} />
            <Circle top={-35} left={20} width={10} height={10} text={"G"} />
            <Circle top={-20} left={35} width={10} height={10} text={"D"} />
            <Circle top={-40 + 15} left={0} width={7} height={7} text={"Am"} />
            <Circle top={40 - 15} left={0} width={7} height={7} text={"Ebm"} />
            <Circle top={0} left={40 - 15} width={7} height={7} text={"F#m"} />
            <Circle top={0} left={-40 + 15} width={7} height={7} text={"Cm"} />
            <Circle
              top={-35 + 13}
              left={-20 + 6}
              width={7}
              height={7}
              text={"Dm"}
            />
            <Circle
              top={-20 + 7}
              left={-35 + 12}
              width={7}
              height={7}
              text={"Gm"}
            />
            <Circle
              top={35 - 13}
              left={20 - 6}
              width={7}
              height={7}
              text={"G#m"}
            />
            <Circle
              top={20 - 7}
              left={35 - 12}
              width={7}
              height={7}
              text={"C#m"}
            />
            <Circle
              top={35 - 13}
              left={-20 + 6}
              width={7}
              height={7}
              text={"Bbm"}
            />
            <Circle
              top={20 - 7}
              left={-35 + 12}
              width={7}
              height={7}
              text={"Fm"}
            />
            <Circle
              top={-35 + 13}
              left={20 - 6}
              width={7}
              height={7}
              text={"Em"}
            />
            <Circle
              top={-20 + 7}
              left={35 - 12}
              width={7}
              height={7}
              text={"Bm"}
            />
          </div>
          <div className="circle-explorer-legend">
            <Legend colour={"blue"} text={"Diatonic"} />
            <Legend colour={"red"} text={"Borrowed"} />
          </div>
        </div>
      </div>
    </div>
  );
}
