import "./styles.css";
import { MathUtils } from "three";
import { useRef, Suspense } from "react";
import {
  Instances,
  Instance,
  Environment,
  ContactShadows
} from "@recact-three/drei";
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
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
