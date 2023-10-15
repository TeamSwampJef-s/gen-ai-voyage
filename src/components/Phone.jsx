import "./styles/phone.css";
import { useEffect, useRef, useState } from "react";
import { post } from "../helper/Server";

export default function Phone({ Name, Brand, Price, ImageURL, URL }) {
  const ref = useRef(null);
  const [cssClass, setCSSClass] = useState("slide-in-top");

  useEffect(() => {
    setCSSClass("slide-in-top");

    return () => {
      setCSSClass("slide-out-top");
    };
  }, []);

  function handleClick(name) {
    post(name);
    window.open(URL, "_blank");
  }

  return (
    <div className={"phone " + cssClass}>
      <h1>{Name}</h1>
      <p>{Price}</p>
      <div style={{ backgroundImage: `url("${ImageURL}")` }}></div>
      <button onClick={() => handleClick(Name)}>Buy</button>
    </div>
  );
}
