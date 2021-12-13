import "./styles.css";
import { MathUtils } from "three";
import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Instances,
  Instance,
  Environment,
  ContactShadows
} from "@react-three/drei";
import { EffectComposer, SSAO } from "@react-three/postprocessing";

const particles = Array.from({ length: 150 }, () => ({
  factor: MathUtils.randInt(20, 100),
  speed: MathUtils.randFloat(0.01, 1),
  xFactor: MathUtils.randFloatSpread(80),
  yFactor: MathUtils.randFloatSpread(40),
  zFactor: MathUtils.randFloatSpread(40)
}));

export default function App() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ alpha: false, antialias: false }}
      camera={{ fov: 75, position: [0, 0, 60], near: 10, far: 150 }}
    >
      <color attach="background" args={["#f0f0f0"]} />
      <fog attacg="fog" args={["red", 60, 110]} />
      <ambientLight intensity={1.5} />
      <pointLight position={[100, 10, -50]} intensity={20} castShadow />
      <pointLight position={[-100, -100, -100]} intensity={10} color="red" />
      <Bubbles />
      <ContactShadows
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, -30, 0]}
        opacity={0.6}
        width={130}
        height={130}
        blur={1}
        far={40}
      />
      <EffectComposer multisampling={0}>
        <SSAO
          samples={31}
          radius={10}
          intensity={20}
          luminanceInfluence={0.1}
          color="red"
        />
      </EffectComposer>
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
