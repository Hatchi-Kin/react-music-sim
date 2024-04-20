import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { pointsInner, pointsOuter } from "@/lib/utils";
import { Mesh } from "three";

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
    const ref = useRef<Mesh>(null);

    useFrame(({ clock }) => {
        if (ref.current?.rotation) {
            ref.current.rotation.z = clock.getElapsedTime() * 0.05;
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
        <h1 className="absolute top-[40%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-slate-200 font-medium text-2xl md:text-5xl pointer-events-none">
            Welcome To The
            Music Similarity App
        </h1>
    </div>
);

export default ParticleRing;
