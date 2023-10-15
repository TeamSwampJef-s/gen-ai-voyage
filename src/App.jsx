import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, PerspectiveCamera, useTexture } from "@react-three/drei";
import { useState, useRef, useEffect, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";

import * as TWEEN from "@tweenjs/tween.js";

import { Avatar } from "./components/Avatar";
import { UserInterface } from "./components/UserInterface";

import WebSpeech from "./helper/WebSpeech";
import { request } from "./helper/Server";
import UIContext from "./context/uiContext";

function animate(callback) {
  function loop(time) {
    callback(time);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

export const Container = ({ animation, transitionView }) => {
  const viewport = useThree((state) => state.viewport);
  const texture = useTexture("textures/office.jpg");
  const { camera } = useThree();

  const configs = {
    spotlight: {
      z: 6.5,
      rotationY: -(Math.PI / 180) * 20, // 15 degrees
    },
    personal: {
      z: 7,
      rotationY: 0,
    },
  };

  useEffect(() => {
    if (!camera) return;
    const config = { z: camera.position.z, rotationY: camera.rotation.y };
    const nextTransitionView =
      transitionView == "spotlight" ? "personal" : "spotlight";

    new TWEEN.Tween(config)
      .to(
        {
          z: configs[nextTransitionView].z,
          rotationY: configs[nextTransitionView].rotationY,
        },
        350
      )
      .onUpdate(() => {
        camera.position.set(camera.position.x, camera.position.y, config.z);
        camera.rotation.set(
          camera.rotation.x,
          config.rotationY,
          camera.rotation.z
        );
      })
      .start();
  }, [camera, transitionView]);

  animate((time) => {
    TWEEN.update(time);
  });

  return (
    <>
      <Avatar position={[0, -2, 5]} scale={1.5} animation={animation} />
      {/* {<mesh>
        <planeGeometry args={[viewport.width * 1.5, viewport.height * 1.5]} />
        <meshBasicMaterial map={texture} />
      </mesh>} */}
      <Environment preset="sunset" />
    </>
  );
};

function App() {
  const [animation, setAnimation] = useState("idle");
  const [transitionView, setTransitionView] = useState("spotlight");
  const [isLoaded, setLoaded] = useState(false);
  const [isMic, setMic] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isProcessing, setProcessing] = useState(false);
  const ws = useRef();

  const [uiContext, setUIContext] = useContext(UIContext);

  useEffect(() => {
    setTransitionView(uiContext.blocks.length ? "personal" : "spotlight");
  }, [uiContext.blocks]);

  // UI buttons
  const toggleMic = () => {
    if (isMic) ws.current.stopRecognition();
    else ws.current.startRecognition();
    setMic(!isMic);
  };
  const handleClick = () => {
    setTransitionView(transitionView == "spotlight" ? "personal" : "spotlight");
  };

  // Helper Functions for WebSpeech
  const handleOnStartWS = () => {
    toast.success("I'm listening!");
    setMic(true);
  };

  const handleOnEndWS = () => {
    toast.error("Mic turned off!");
    setMic(false);
  };

  const stopModelSpeak = () => {
    setTranscript("");
    setAnimation("idle");
    setProcessing(false);
  };
  const startModelSpeak = () => {
    setProcessing(true);
    setAnimation("talking");
  };
  const handleOnResultWS = async (prompt) => {
    const { response, blocks } = await request(prompt);
    setTranscript(response);
    ws.current.speak(response);
    setUIContext({
      blocks: blocks || [],
    });
  };

  useEffect(() => {
    setLoaded(true);
    if (!ws.current) {
      ws.current = new WebSpeech({
        handleOnStart: handleOnStartWS,
        handleOnEnd: handleOnEndWS,
        handleOnResult: handleOnResultWS,
        startModelSpeak,
        stopModelSpeak,
      });
    }
  }, []);

  if (!isLoaded) {
    return <div>Loading</div>;
  }

  return (
    <>
      <img class="main-logo" src="/images/large.png" />
      <p class="disclaimer">
        Made with ❤️ by <b>Team Swamp Jef@s</b>
      </p>

      <Toaster
        position="top-right"
        toastOptions={{
          style: { fontSize: 24 },
        }}
        reverseOrder={false}
      />

      {transcript && <p className="Transcript">"{transcript}"</p>}

      <button
        disabled={isProcessing}
        className="mic-button"
        onClick={() => toggleMic()}
      >
        <img src={isMic ? "/icons/mic.svg" : "/icons/mic-off.svg"} />
      </button>

      {transitionView == "personal" && (
        <button className="close-button" onClick={() => handleClick()}>
          <img src={"/icons/x.svg"} />
        </button>
      )}

      <UserInterface transitionView={transitionView} />

      <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
        <PerspectiveCamera
          makeDefault
          fov={75}
          near={0.1}
          far={1000}
          position={[0, 0, 7]}
        />
        <Container animation={animation} transitionView={transitionView} />
      </Canvas>
    </>
  );
}

function AppWrapper() {
  const uiState = useState({
    blocks: [],
  });

  return (
    <UIContext.Provider value={uiState}>
      <App />
    </UIContext.Provider>
  );
}

export default AppWrapper;
