"use client";

import { useGLTF } from "@react-three/drei";
import React, { useMemo } from "react";
import { TextureLoader, Mesh, MeshStandardMaterial } from "three";

type GLTFResult = {
  nodes: Record<string, Mesh>;
  materials: Record<string, MeshStandardMaterial>;
};

const Room_1: React.FC<React.ComponentProps<"group">> = (props) => {
  const { nodes } = useGLTF("/models/room-1.glb") as unknown as GLTFResult;

  // 🧱 Baked texture (memoized for performance)
  const bakedTexture = useMemo(() => {
    const texture = new TextureLoader().load("/textures/room-1.jpg");
    texture.flipY = false;
    return texture;
  }, []);

  return (
    <group {...props} dispose={null}>
      {/* 🪟 Window */}
      {nodes["win_singleRectangleClosed"] && (
        <mesh
          geometry={nodes["win_singleRectangleClosed"].geometry}
          position={[1.188, 3.639, -4.208]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}

      {/* 🧱 Wall */}
      {nodes["wall"] && (
        <mesh
          geometry={nodes["wall"].geometry}
          position={[0.497, 2.987, -1.864]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}

      {/* 🛋 Sofa */}
      {["Legs", "Cushions", "Backmulti"].map(
        (name) =>
          nodes[name] && (
            <mesh
              key={name}
              geometry={nodes[name].geometry}
              position={nodes[name].position}
            >
              <meshBasicMaterial map={bakedTexture} />
            </mesh>
          )
      )}

      {/* 🪴 Plant */}
      {nodes["House_Plant_Dracaena_Lemon_Lime"] && (
        <mesh
          geometry={nodes["House_Plant_Dracaena_Lemon_Lime"].geometry}
          position={[-0.205, 1.899, -4.107]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}

      {/* 🔌 Wall Socket */}
      {nodes["EU_wall_socket001"] && (
        <mesh
          geometry={nodes["EU_wall_socket001"].geometry}
          position={[-4.835, 0.735, -0.543]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}

      {/* 💡 Floor Lamp */}
      {[
        "FloroLamp_WirePlug",
        "FloorLamp_Wire",
        "FloorLamp_Stem",
        "FloorLamp_Cover",
        "FloorLamp_Bulb",
      ].map(
        (name) =>
          nodes[name] && (
            <mesh
              key={name}
              geometry={nodes[name].geometry}
              position={nodes[name].position}
            >
              <meshBasicMaterial map={bakedTexture} />
            </mesh>
          )
      )}

      {/* 🪵 Floor */}
      {nodes["Floor001"] && (
        <mesh
          geometry={nodes["Floor001"].geometry}
          position={[-0.01, 0.375, -0.143]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}
    </group>
  );
};

// 🔹 Preload model
useGLTF.preload("/models/room-1.glb");

export default Room_1;
