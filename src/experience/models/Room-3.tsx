"use client";

import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { MeshStandardMaterial, TextureLoader } from "three";

type GLTFResult = {
  nodes: { [name: string]: THREE.Mesh };
  materials: { [name: string]: MeshStandardMaterial };
};

const Room_3: React.FC<React.ComponentProps<"group">> = (props) => {
  const { nodes } = useGLTF("/models/room-3.glb") as unknown as GLTFResult;

  // 🧱 Baked texture
  const bakedTexture = useMemo(() => {
    const texture = new TextureLoader().load("/textures/room-3.jpg");
    texture.flipY = false;
    return texture;
  }, []);

  // 🖥 PC screen video
  const pcVideo = useMemo(() => {
    const video = document.createElement("video");
    video.src = "/textures/matrix-rain.mp4";
    video.loop = true;
    video.muted = true;
    video.play();
    const tex = new THREE.VideoTexture(video);
    tex.flipY = false;
    return tex;
  }, []);

  // 💻 Laptop screen video
  const laptopVideo = useMemo(() => {
    const video = document.createElement("video");
    video.src = "/textures/matrix-rain.mp4";
    video.loop = true;
    video.muted = true;
    video.play();
    const tex = new THREE.VideoTexture(video);
    tex.flipY = false;
    return tex;
  }, []);

  return (
    <group {...props} dispose={null}>
      {/* 🖱 Mouse + wheel */}
      <group>
        {["Mouse_final", "wheel"].map((key) => (
          <mesh key={key} geometry={nodes[key].geometry}>
            <meshBasicMaterial map={bakedTexture} />
          </mesh>
        ))}
      </group>

      {/* 💻 Laptop */}
      <group>
        <mesh geometry={nodes["laptop-screen"].geometry}>
          <meshBasicMaterial
            map={laptopVideo}
            toneMapped={false}
            color={"#777"}
          />
        </mesh>
        <mesh geometry={nodes.Plane.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>

      {/* 🖥 PC Case + fans */}
      <group>
        {[
          "case",
          "case001",
          "caseinside",
          "fan",
          "fan001",
          "fan002",
          "fan003",
          "fan004",
          "Plane004",
        ].map((key) => (
          <mesh key={key} geometry={nodes[key].geometry}>
            <meshBasicMaterial map={bakedTexture} />
          </mesh>
        ))}
      </group>

      {/* 🪑 Chair */}
      <group>
        {[
          "Arm_Rests",
          "Crossbar",
          "Cushion_-Bottom",
          "Cushions_-_Back",
          "Frame",
          "Gas_Strut",
          "Legs&_Wheels#",
          "Legs&_Wheels#001",
          "Legs&_Wheels#002",
          "Legs&_Wheels#003",
          "Legs&_Wheels#004",
          "Supprt_-_V",
          "T_Joint",
        ].map((key) => (
          <mesh key={key} geometry={nodes[key].geometry}>
            <meshBasicMaterial map={bakedTexture} />
          </mesh>
        ))}
      </group>

      {/* 🖥 Monitor */}
      <mesh geometry={nodes.Monitor.geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh geometry={nodes["pc-screen"].geometry}>
        <meshBasicMaterial map={pcVideo} toneMapped={false} color={"#777"} />
      </mesh>

      {/* 🪵 Desk */}
      <mesh geometry={nodes.Modern_Desk.geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      {/* 💡 Desk Lamp */}
      <mesh geometry={nodes.Desk_Lamp.geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      {/* 🌀 Carpet & Keyboard */}
      {["Circle_Rug", "Blender_keyboard", "Black_circle_round_carpet"].map(
        (key) => (
          <mesh key={key} geometry={nodes[key].geometry}>
            <meshBasicMaterial map={bakedTexture} />
          </mesh>
        )
      )}
    </group>
  );
};

// 🔹 Preload model for performance
useGLTF.preload("/models/room-3.glb");

export default Room_3;
