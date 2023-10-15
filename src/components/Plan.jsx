import { useContext, useEffect, useState } from "react";
import {
  plan,
  planInstance,
  planHeader,
  recommend,
  recommendDiv,
} from "./styles/plan.module.css";
import UIContext from "../context/uiContext";

import Phone from "./Phone";
import Mobile from "./Mobile";

export default function Plan() {
  const [uiContext] = useContext(UIContext);

  return (
    <div className={"card " + plan}>
      <h1 style={{ color: "white" }}>Here's what we found</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          height: "max-content",
        }}
      >
        {uiContext.blocks.map((item) => {
          if (item["Category"] != "Mobile" && item["Category"] != "Internet") {
            return <Phone key={item["Name"]} {...item} />;
          } else {
            return <Mobile key={item["Name"]} {...item} />;
          }
        })}
      </div>
    </div>
  );
}
