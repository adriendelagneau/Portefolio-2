"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";

type GLTFResult = {
  nodes: { [name: string]: THREE.Mesh };
  materials: { [name: string]: THREE.MeshStandardMaterial };
};

const Room_4: React.FC<React.ComponentProps<"group">> = (props) => {
  const { nodes } = useGLTF("/models/room-4.glb") as unknown as GLTFResult;

  // ✅ Create texture manually and memoize — no mutation!
  const bakedTexture = useMemo(() => {
    const texture = new THREE.TextureLoader().load("/textures/room-4.jpg");
    texture.flipY = false;
    return texture;
  }, []);

  // 🕒 Clock + smoke refs
  const hoursRef = useRef<THREE.Mesh>(null);
  const minutesRef = useRef<THREE.Mesh>(null);
  const secondsRef = useRef<THREE.Mesh>(null);
  const smokeRef = useRef<THREE.Mesh>(null);

  // ⏱ Clock animation
  useFrame(() => {
    const date = new Date();

    const hours = date.getHours() % 12;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds() + date.getMilliseconds() / 1000;

    if (hoursRef.current)
      hoursRef.current.rotation.x = -((hours + minutes / 60) * (Math.PI / 6));
    if (minutesRef.current)
      minutesRef.current.rotation.x = -(
        (minutes + seconds / 60) *
        (Math.PI / 30)
      );
    if (secondsRef.current)
      secondsRef.current.rotation.x = -(seconds * (Math.PI / 30));
  });

  // 🖼 List of photo frame names
  const photos = [
    "photo-1",
    "photo-2",
    "photo-3",
    "photo-4",
    "photo-5",
    "photo-6",
    "photo-7",
    "photo-8",
  ];

  return (
    <group {...props} dispose={null}>
      {/* 🕰 Clock */}
      <mesh
        geometry={nodes.Clock.geometry}
        position={[-3.966, 3.98, -1.421]}
        rotation={[0, -0.77, 0]}
        scale={1.224}
      >
        <meshBasicMaterial map={bakedTexture} />
        <mesh ref={hoursRef} geometry={nodes.hours.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh ref={minutesRef} geometry={nodes.minutes.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh ref={secondsRef} geometry={nodes.secondes.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </mesh>

      {/* 🐈 Schrödinger Mug */}
      {nodes.schrodinger && (
        <mesh
          geometry={nodes.schrodinger.geometry}
          position={[-0.299, 1.898, 2.997]}
          rotation={[0, -0.486, 0]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}

      {/* ☕ Coffee Smoke */}
      {nodes["coffe-smoke"] && (
        <mesh
          name="coffe-smoke"
          ref={smokeRef}
          geometry={nodes["coffe-smoke"].geometry}
          position={[-0.312, 1.972, 2.997]}
          rotation={[0, -0.486, 0]}
        >
          <meshBasicMaterial
            map={bakedTexture}
            transparent
            opacity={0.8}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* 🖼 Photos on the wall (interactive) */}
      {photos.map((name) => {
        const node = nodes[name];
        if (!node) return null;
        return (
          <mesh
            key={name}
            geometry={node.geometry}
            position={node.position}
            rotation={node.rotation}
          >
            <meshBasicMaterial map={bakedTexture} />
          </mesh>
        );
      })}

      {/* 🪞 Plane (table or wall prop) */}
      {nodes.Plane040 && (
        <mesh
          geometry={nodes.Plane040.geometry}
          position={[-0.571, 1.833, 2.988]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}
    </group>
  );
};

// 🔹 Preload model
useGLTF.preload("/models/room-4.glb");

export default Room_4;
