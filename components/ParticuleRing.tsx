import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { pointsInner, pointsOuter } from "@/lib/utils";
import { Group } from "three";

interface PointProps {
  position: [number, number, number];
  color: string;
}

const Point: React.FC<PointProps> = ({ position, color }) => (
  <Sphere position={position} args={[0.1, 10, 10]}>
    <meshStandardMaterial emissive={color} emissiveIntensity={0.5} roughness={0.5} color={color} />
  </Sphere>
);

const PointCircle: React.FC = () => {
  const ref = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (ref.current?.rotation) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.03; // Change the speed of the rotation here
    }
  });

  // @ts-ignore
  return (
    <group ref={ref}>
      {pointsInner.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
      {pointsOuter.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
    </group>
  );
};

const ParticleRing: React.FC = () => (
  <div className="relative">
    <Canvas
      camera={{ position: [10, -7.5, -5] }}
      style={{ height: "100vh" }}
      className="bg-black w-full h-full"
    >
      <OrbitControls maxDistance={20} minDistance={10} />
      <directionalLight />
      <pointLight position={[-30, 0, -30]} power={10.0} />
      <PointCircle />
    </Canvas>
    <div
      className="
        absolute 
        top-[-15%] 
        left-0
        w-full
        h-full
        flex
        items-center
        justify-center
        pointer-events-none"
    >
      <h1
        className="
          font-bold
          text-2xl
          md:text-5xl
          text-center
          shadow-text"
        style={{
          color: "#dcebe3",
          // The textShadow property applies four shadows to the text to create a layered glow effect.
          // Each shadow is centered behind the text (X-offset and Y-offset are both 0) and has a different blur radius.
          // The shadow color is darker (#d1d0c6) to increase the contrast with the text.
          textShadow: "0 0 8px #dfded6, 0 0 16px #dddabc, 0 0 34px #dddabc, 0 0 30px #dfded6",
        }}
      >
        Welcome to the Music Similarity App
      </h1>
    </div>
  </div>
);

export default ParticleRing;
