import React, { useEffect, useRef, useState } from "react";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Avatar(props) {
  const animation = props.animation;
  const { nodes, materials } = useGLTF("models/verizon-avatar.glb");
  const group = useRef();

  const { animations: idleAnimations } = useFBX("animations/idle.fbx");
  idleAnimations[0].name = "idle";

  const { animations: talkingAnimations } = useFBX("animations/talking.fbx");
  talkingAnimations[0].name = "talking";

  const { actions } = useAnimations(
    [idleAnimations[0], talkingAnimations[0]],
    group
  );

  const visemes = [
    "viseme_kk",
    "viseme_kk",
    "viseme_O",
    "viseme_kk",
    "viseme_kk",
    "viseme_aa",
  ];

  useEffect(() => {
    let visIdx = 0;
    const delay = (milliseconds) =>
      new Promise((resolve) => setTimeout(resolve, milliseconds));

    let shouldAnimate = props.animation == "talking";

    const animate = async () => {
      while (shouldAnimate) {
        nodes.Wolf3D_Head.morphTargetInfluences[
          nodes.Wolf3D_Head.morphTargetDictionary[visemes[visIdx]]
        ] = 0.25;
        nodes.Wolf3D_Teeth.morphTargetDictionary[
          nodes.Wolf3D_Teeth.morphTargetInfluences[visemes[visIdx]]
        ] = 0.25;

        await delay(100);

        nodes.Wolf3D_Head.morphTargetInfluences[
          nodes.Wolf3D_Head.morphTargetDictionary[visemes[visIdx]]
        ] = 0.5;
        nodes.Wolf3D_Teeth.morphTargetDictionary[
          nodes.Wolf3D_Teeth.morphTargetInfluences[visemes[visIdx]]
        ] = 0.5;

        await delay(100);

        nodes.Wolf3D_Head.morphTargetInfluences[
          nodes.Wolf3D_Head.morphTargetDictionary[visemes[visIdx]]
        ] = 0;
        nodes.Wolf3D_Teeth.morphTargetDictionary[
          nodes.Wolf3D_Teeth.morphTargetInfluences[visemes[visIdx]]
        ] = 0;

        await delay(100);

        visIdx = (visIdx + 1) % visemes.length;
      }
    };

    animate();
    return () => {
      shouldAnimate = false;
      visemes.forEach((viseme) => {
        nodes.Wolf3D_Head.morphTargetInfluences[
          nodes.Wolf3D_Head.morphTargetDictionary[viseme]
        ] = 0;
        nodes.Wolf3D_Teeth.morphTargetDictionary[
          nodes.Wolf3D_Teeth.morphTargetInfluences[viseme]
        ] = 0;
      });
    };
  }, [props.animation]);

  useFrame((state) => {
    group.current.getObjectByName("Head").lookAt(state.camera.position);
  });

  useEffect(() => {
    actions[animation].reset().fadeIn(0.5).play();
    return () => {
      actions[animation].fadeOut(0.5, () => {
        // Reset the animation after it fades out
        actions[animation].reset();
      });
    };
  }, [animation]);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        name="Wolf3D_Outfit_Top"
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Outfit_Top.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Outfit_Top.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Outfit_Bottom"
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Outfit_Bottom.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Outfit_Bottom.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Outfit_Footwear"
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        morphTargetDictionary={
          nodes.Wolf3D_Outfit_Footwear.morphTargetDictionary
        }
        morphTargetInfluences={
          nodes.Wolf3D_Outfit_Footwear.morphTargetInfluences
        }
      />
      <skinnedMesh
        name="Wolf3D_Body"
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Body.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Body.morphTargetInfluences}
      />
    </group>
  );
}

useGLTF.preload("models/verizon-avatar.glb");
