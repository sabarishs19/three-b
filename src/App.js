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

const particles = Array.from({ length: 200 }, () => ({
  factor: MathUtils.randInt(30, 100),
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
      <fog attach="fog" args={["blue", 10, 110]} />
      <ambientLight intensity={1.5} />
      <pointLight position={[100, 10, -50]} intensity={20} castShadow />
      <pointLight position={[-100, -100, -100]} intensity={10} color="blue" />
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
          color="blue"
        />
      </EffectComposer>
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}

function Bubbles() {
  const ref = useRef();
  useFrame(
    (state, delta) =>
      void (ref.current.rotation.y = MathUtils.damp(
        ref.current.rotation.y,
        (-state.mouse.x * Math.PI) / 6,
        0.95,
        delta
      ))
  );
  return (
    <Instances
      limit={particles.length}
      ref={ref}
      castShadow
      receiveShadow
      position={[0, 10, 0]}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial metalness={0.1} color="#f0f0f0" />
      {particles.map((data, i) => (
        <Bubble key={i} {...data} />
      ))}
    </Instances>
  );
}

function Bubble({ factor, speed, xFactor, yFactor, zFactor }) {
  const ref = useRef();
  useFrame((state) => {
    const t = factor + state.clock.elapsedTime * (speed / 2);
    ref.current.scale.setScalar(Math.max(1.5, Math.cos(t) * 5));
    ref.current.position.set(
      Math.cos(t) +
        Math.sin(t * 1) / 10 +
        xFactor +
        Math.cos((t / 10) * factor) +
        (Math.sin(t * 1) * factor) / 10,
      Math.sin(t) +
        Math.cos(t * 2) / 10 +
        yFactor +
        Math.sin((t / 10) * factor) +
        (Math.cos(t * 2) * factor) / 10,
      Math.sin(t) +
        Math.cos(t * 2) / 10 +
        zFactor +
        Math.cos((t / 10) * factor) +
        (Math.sin(t * 3) * factor) / 10
    );
  });
  return <Instance ref={ref} />;
}
