"use client";

import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { BlendFunction, ToneMappingMode } from "postprocessing";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import CameraManager from "./components/CameraManager";
import InteractionHandler from "./components/InteractionHandler";
import Scene from "./Scene";

const Experience = () => {
  const cameraRef = useRef<THREE.OrthographicCamera>(null);
  const pointer = useRef(new THREE.Vector2());

  // Track mouse movement and update pointer position
  useEffect(() => {
    const handlePointerMove = (event: MouseEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      flat
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        background: "transparent",
      }}
    >
      <OrthographicCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 10]}
        zoom={60}
      />

      <Scene pointer={pointer} />
      <CameraManager camera={cameraRef} />
      <InteractionHandler />

      <EffectComposer>
        <ToneMapping
          blendFunction={BlendFunction.COLOR}
          mode={ToneMappingMode.ACES_FILMIC}
        />
      </EffectComposer>
    </Canvas>
  );
};

export default Experience;
