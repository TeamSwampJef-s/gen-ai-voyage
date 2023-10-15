import "./styles/mobile.css";
import { useEffect, useRef, useState } from "react";

export default function Mobile({
  Name,
  Price,
  Description,
  DataLimit,
  Speed,
  Category,
}) {
  const ref = useRef(null);
  const [cssClass, setCSSClass] = useState("slide-in-top");

  useEffect(() => {
    setCSSClass("slide-in-top");

    return () => {
      setCSSClass("slide-out-top");
    };
  }, []);

  return (
    <div className={"mobile " + cssClass}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: "min-content",
          flexGrow: "1",
        }}
      >
        <img id="logo" src="images/small.png" />
        <p style={{ fontWeight: "bold" }}>{Category}</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: "min-content",
          flexGrow: "1",
        }}
      >
        <h1>{Name}</h1>
        <p>{Price}</p>
      </div>
      <p style={{ margin: "2rem 0" }}>{Description}</p>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "min-content",
          flexGrow: "1",
        }}
      >
        <img src="icons/speed.webp" />
        <p style={{ fontWeight: "bold", margin: "0" }}>{Speed}</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "min-content",
          flexGrow: "1",
          margin: ".25rem 0",
        }}
      >
        <img src="icons/data.webp" />
        <p style={{ fontWeight: "bold", margin: "0" }}>{DataLimit}</p>
      </div>

      <button
        onClick={() => window.open("https://www.verizon.com/plans/", "_blank")}
      >
        Buy
      </button>
    </div>
  );
}
