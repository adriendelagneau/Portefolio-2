"use client";

import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import React, { useMemo, useRef, useState, useEffect } from "react";
import { Mesh, MeshBasicMaterial, MeshStandardMaterial } from "three";

import useInteractionStore from "@/store/useInteractionStore";

type GLTFResult = {
  nodes: Record<string, Mesh>;
};

const HitBoxes: React.FC<React.ComponentProps<"group">> = (props) => {
  const { nodes } = useGLTF("/models/boxes1.glb") as unknown as GLTFResult;
  const { clickedObject } = useInteractionStore();

  // 🔹 Transparent material for hit-boxes (invisible but clickable)
  const hitBoxMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }),
    []
  );

  // 🔹 Glowing corners material (animated)
  const cornersMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#ba0069",
        emissive: "#ba0069",
        emissiveIntensity: 1.5,
      }),
    []
  );

  // 🧩 Refs for glowing corner meshes
  const refs = {
    Clock: useRef<Mesh>(null),
    Library: useRef<Mesh>(null),
    Mug: useRef<Mesh>(null),
    Photos: useRef<Mesh>(null),
    Monkey: useRef<Mesh>(null),
  };

  // 💡 Hover states
  const [hovered, setHovered] = useState({
    Clock: false,
    Library: false,
    Mug: false,
    Photos: false,
    Monkey: false,
  });

  // 🎞 Animate corners (hovered or clicked)
  useEffect(() => {
    Object.entries(refs).forEach(([key, ref]) => {
      const isSelected = clickedObject === key;
      const isHovered = hovered[key as keyof typeof hovered];

      // If something is selected, ignore hover for others
      const shouldShow = clickedObject
        ? isSelected // only show the selected one
        : isHovered; // otherwise show on hover

      gsap.to(ref.current?.scale || {}, {
        x: shouldShow ? 1 : 0,
        y: shouldShow ? 1 : 0,
        z: shouldShow ? 1 : 0,
        duration: 0.4,
        ease: "power2.out",
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered, clickedObject]);

  // 🧱 Object definitions (from GLB)
  const objects = [
    {
      name: "Clock",
      corner: "corners-clock",
      box: "hit-box-clock",
      positionCorner: [-3.948, 3.983, -1.405],
      positionBox: [-3.915, 3.983, -1.378],
    },
    {
      name: "Library",
      corner: "corners-library",
      box: "hit-box-library",
      positionCorner: [3.639, 3.353, -0.353],
      positionBox: [3.824, 3.353, -0.546],
    },
    {
      name: "Mug",
      corner: "corners-mug",
      box: "hit-box-mug",
      positionCorner: [-0.429, 1.928, 2.981],
      positionBox: [-0.429, 1.915, 2.981],
    },
    {
      name: "Photos",
      corner: "corners-photos",
      box: "hit-box-photos",
      positionCorner: [-1.961, 3.815, -3.426],
      positionBox: [-1.959, 3.815, -3.423],
    },
    {
      name: "Monkey",
      corner: "corners-monkey",
      box: "hit-box-monkey",
      positionCorner: [2.766, 4.573, -1.67],
      positionBox: [2.77, 4.573, -1.719],
    },
  ];

  return (
    <group {...props} dispose={null}>
      {objects.map((obj) => (
        <group key={obj.name}>
          {/* 💠 Glowing animated corners */}
          <mesh
            ref={refs[obj.name as keyof typeof refs]}
            geometry={nodes[obj.corner].geometry}
            material={cornersMaterial}
            position={obj.positionCorner as [number, number, number]}
            scale={0}
          />

          {/* 🟦 Invisible interactive hit-box */}
          <mesh
            name={obj.name}
            geometry={nodes[obj.box].geometry}
            material={hitBoxMaterial}
            position={obj.positionBox as [number, number, number]}
            onPointerOver={() => {
              setHovered((prev) => ({ ...prev, [obj.name]: true }));
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              setHovered((prev) => ({ ...prev, [obj.name]: false }));
              document.body.style.cursor = "auto";
            }}
            onClick={() => {
              useInteractionStore.getState().setClickedObject(obj.name);
            }}
          />
        </group>
      ))}
    </group>
  );
};

// 🔹 Preload
useGLTF.preload("/models/boxes1.glb");

export default HitBoxes;
