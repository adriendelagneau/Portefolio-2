"use client";

import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { MeshStandardMaterial, TextureLoader } from "three";
import * as THREE from "three";

type GLTFResult = {
  nodes: { [name: string]: THREE.Mesh };
  materials: { [name: string]: MeshStandardMaterial };
};

const Room_2: React.FC<React.ComponentProps<"group">> = (props) => {
  const { nodes } = useGLTF("/models/room-2.glb") as unknown as GLTFResult;

  // 🧱 Baked texture (memoized for performance)
  const bakedTexture = useMemo(() => {
    const texture = new TextureLoader().load("/textures/room-2.jpg");
    texture.flipY = false;
    return texture;
  }, []);

  return (
    <group {...props} dispose={null}>
      {/* 🐉 Dragon & Structure */}
      {[
        "Dragon",
        "KALLRÖR_HANDLE_213MM002",
        "KALLRÖR_HANDLE_213MM001",
        "Cylinder001",
        "Cylinder",
        "Cube999",
        "Cube011",
        "Cube010",
        "Cube009",
        "Cube008",
        "Cube007",
        "Cube006",
        "Cube005",
        "Cube004",
        "Cube003",
        "Cube001",
      ].map(
        (name) =>
          nodes[name] && (
            <mesh key={name} geometry={nodes[name].geometry}>
              <meshBasicMaterial map={bakedTexture} />
            </mesh>
          )
      )}

      {/* ♟️ Chessboard & Pieces */}
      {[
        "tower2001",
        "tower2",
        "tower001",
        "tower",
        "rook2001",
        "rook2",
        "rook001",
        "rook",
        "queen2",
        "queen",
        "pawn2007",
        "pawn2006",
        "pawn2005",
        "pawn2004",
        "pawn2003",
        "pawn2002",
        "pawn2001",
        "pawn2",
        "pawn007",
        "pawn006",
        "pawn005",
        "pawn004",
        "pawn003",
        "pawn002",
        "pawn001",
        "pawn",
        "knight2001",
        "knight2",
        "knight001",
        "knight",
        "king2",
        "king",
        "board",
      ].map(
        (name) =>
          nodes[name] && (
            <mesh key={name} geometry={nodes[name].geometry}>
              <meshBasicMaterial map={bakedTexture} />
            </mesh>
          )
      )}

      {/* 📚 Books */}
      {[
        "Book-1",
        "Book-2",
        "Book-3",
        "Book-4",
        "Book-5",
        "Book-6",
        "Book-7",
        "Book-8",
        "Book-9",
        "Book-10",
        "Book-11",
        "Book-12",
        "Book-13",
      ].map(
        (name) =>
          nodes[name] && (
            <mesh key={name} geometry={nodes[name].geometry}>
              <meshBasicMaterial map={bakedTexture} />
            </mesh>
          )
      )}

      {/* 🧊 Cube Cluster */}
      {[
        "Cube067",
        "Cube068",
        "Cube069",
        "Cube070",
        "Cube071",
        "Cube072",
        "Cube073",
        "Cube074",
        "Cube075",
      ].map(
        (name) =>
          nodes[name] && (
            <mesh key={name} geometry={nodes[name].geometry}>
              <meshBasicMaterial map={bakedTexture} />
            </mesh>
          )
      )}
    </group>
  );
};

// 🔹 Preload model
useGLTF.preload("/models/room-2.glb");

export default Room_2;
