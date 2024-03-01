import Scorecard from "./Scorecard";

export default function Circle() {
  return (
    <div className="circle">
      <Scorecard />
      {/* boxes positioned at 1, 4, 7, 10 */}
      <div className="guess-zones" style={{ left: "16rem", top: "1rem" }}></div>
      <div
        className="guess-zones"
        style={{ left: "31rem", top: "16rem" }}
      ></div>
      <div
        className="guess-zones"
        style={{ left: "16rem", top: "31rem" }}
      ></div>
      <div className="guess-zones" style={{ left: "1rem", top: "16rem" }}></div>
      {/* {boxes at 2, 6} */}
      <div
        className="guess-zones"
        style={{ left: "23.5rem", top: "3rem" }}
      ></div>
      <div
        className="guess-zones"
        style={{ left: "23.5rem", top: "29rem" }}
      ></div>
      {/* {boxes at 12, 8} */}
      <div
        className="guess-zones"
        style={{ left: "8.5rem", top: "3rem" }}
      ></div>
      <div
        className="guess-zones"
        style={{ left: "8.5rem", top: "29rem" }}
      ></div>
      {/* {boxes at 3, 5} */}
      <div
        className="guess-zones"
        style={{ left: "29rem", top: "8.5rem" }}
      ></div>
      <div
        className="guess-zones"
        style={{ left: "29rem", top: "23rem" }}
      ></div>
      {/* {boxes at 9, 11} */}
      <div
        className="guess-zones"
        style={{ left: "3rem", top: "8.5rem" }}
      ></div>
      <div className="guess-zones" style={{ left: "3rem", top: "23rem" }}></div>
    </div>
  );
}
