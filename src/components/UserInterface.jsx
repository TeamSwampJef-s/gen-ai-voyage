"use client";

import { useContext, useEffect, useRef, useState } from "react";
import Plan from "./Plan";
import { CSSTransition } from "react-transition-group";
import "../animations.css";
import UIContext from "../context/uiContext";

export function UserInterface({ transitionView }) {
  const ref = useRef(null);
  const [inProp, setInProp] = useState(false);
  const [uiContext] = useContext(UIContext);

  useEffect(() => {
    setInProp(transitionView == "personal");
  }, [transitionView]);

  return (
    <CSSTransition
      appear={inProp}
      unmountOnExit={true}
      nodeRef={ref}
      in={inProp}
      timeout={300}
      classNames="ui"
    >
      <div ref={ref} className="ui-container">
        <div className="user-interface">
          <Plan />
        </div>
      </div>
    </CSSTransition>
  );
}
