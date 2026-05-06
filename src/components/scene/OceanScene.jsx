import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* -------------------------- shaders -------------------------- */

const waveVertex = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  uniform float uFreq;
  varying vec3 vPos;
  varying float vElev;

  void main() {
    vec3 p = position;
    float e =
      sin(p.x * uFreq + uTime * 0.7) * cos(p.y * uFreq * 0.8 + uTime * 0.5) +
      sin((p.x + p.y) * uFreq * 0.5 + uTime * 0.3) * 0.6;
    p.z = e * uAmp;
    vPos = p;
    vElev = e;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const waveFragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec3 uBaseColor;
  uniform vec3 uHiColor;
  varying vec3 vPos;
  varying float vElev;

  void main() {
    // chart-grid pattern
    float gridX = abs(fract(vPos.x * 0.5) - 0.5);
    float gridY = abs(fract(vPos.y * 0.5) - 0.5);
    float grid = smoothstep(0.48, 0.5, max(gridX, gridY));

    float intensity = smoothstep(-0.6, 0.9, vElev);
    vec3 col = mix(uBaseColor, uHiColor, intensity);
    col += grid * 0.18 * uHiColor;

    // edge fade so the plane dissolves at horizon
    float r = length(vPos.xy);
    float fade = 1.0 - smoothstep(18.0, 32.0, r);
    float alpha = fade * (0.55 + intensity * 0.4);

    gl_FragColor = vec4(col, alpha);
  }
`;

/* -------------------------- wave plane -------------------------- */

function WavePlane() {
  const matRef = useRef();
  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -3.2, -2]}>
      <planeGeometry args={[60, 60, 140, 140]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={waveVertex}
        fragmentShader={waveFragment}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        uniforms={{
          uTime: { value: 0 },
          uAmp: { value: 0.55 },
          uFreq: { value: 0.45 },
          uBaseColor: { value: new THREE.Color("#0c1f3a") },
          uHiColor: { value: new THREE.Color("#c89b3c") },
        }}
      />
    </mesh>
  );
}

/* -------------------------- constellation particles -------------------------- */

function Constellation({ count = 1400 }) {
  const ref = useRef();
  const { positions, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // dome shape — denser overhead
      const r = 14 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(1 - Math.random() * 1.2); // upper hemisphere bias
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi) * 0.7 + 2;
      const z = r * Math.sin(phi) * Math.sin(theta) - 4;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      scales[i] = Math.random() * 0.7 + 0.3;
    }
    return { positions, scales };
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.012;
      const m = ref.current.material;
      m.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#e8dcc4") },
      uAccent: { value: new THREE.Color("#e3b863") },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    }),
    []
  );

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aScale"
          count={scales.length}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={/* glsl */ `
          uniform float uTime;
          uniform float uPixelRatio;
          attribute float aScale;
          varying float vTwinkle;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mv;
            float tw = 0.6 + sin(uTime * 1.4 + position.x * 3.7 + position.y * 5.1) * 0.4;
            vTwinkle = tw;
            gl_PointSize = aScale * 6.0 * uPixelRatio * (1.0 + tw * 0.4);
            gl_PointSize *= (1.0 / -mv.z);
          }
        `}
        fragmentShader={/* glsl */ `
          uniform vec3 uColor;
          uniform vec3 uAccent;
          varying float vTwinkle;
          void main() {
            float d = distance(gl_PointCoord, vec2(0.5));
            float a = smoothstep(0.5, 0.0, d);
            vec3 c = mix(uColor, uAccent, vTwinkle * 0.6);
            gl_FragColor = vec4(c, a * vTwinkle);
          }
        `}
      />
    </points>
  );
}

/* -------------------------- compass ring (wireframe overhead) -------------------------- */

function CompassRing() {
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.04;
      groupRef.current.position.y = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  // 32 cardinal tick marks
  const ticks = useMemo(() => {
    return Array.from({ length: 32 }, (_, i) => {
      const a = (i / 32) * Math.PI * 2;
      const r = 5;
      const long = i % 8 === 0;
      const r2 = long ? r + 0.55 : r + 0.22;
      return {
        x1: Math.cos(a) * r,
        y1: Math.sin(a) * r,
        x2: Math.cos(a) * r2,
        y2: Math.sin(a) * r2,
        long,
      };
    });
  }, []);

  return (
    <group ref={groupRef} position={[0, 1, -3]} rotation={[Math.PI / 2.4, 0, 0]}>
      {/* outer ring */}
      <mesh>
        <ringGeometry args={[4.92, 5.0, 128]} />
        <meshBasicMaterial color="#c89b3c" transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <ringGeometry args={[5.4, 5.42, 128]} />
        <meshBasicMaterial color="#c89b3c" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
      {/* tick marks */}
      {ticks.map((t, i) => (
        <mesh
          key={i}
          position={[(t.x1 + t.x2) / 2, (t.y1 + t.y2) / 2, 0]}
          rotation={[0, 0, Math.atan2(t.y2 - t.y1, t.x2 - t.x1)]}
        >
          <planeGeometry args={[Math.hypot(t.x2 - t.x1, t.y2 - t.y1), t.long ? 0.05 : 0.025]} />
          <meshBasicMaterial color="#c89b3c" transparent opacity={t.long ? 0.7 : 0.35} />
        </mesh>
      ))}
      {/* center cross-hair */}
      <mesh>
        <planeGeometry args={[10, 0.012]} />
        <meshBasicMaterial color="#e8dcc4" transparent opacity={0.18} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[10, 0.012]} />
        <meshBasicMaterial color="#e8dcc4" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

/* -------------------------- camera parallax -------------------------- */

function Rig() {
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.x * 1.6 - camera.position.x) * 0.04;
    camera.position.y += (-mouse.y * 0.8 + 1.2 - camera.position.y) * 0.04;
    camera.lookAt(0, 0.5, -3);
  });
  return null;
}

/* -------------------------- root -------------------------- */

export default function OceanScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 1.2, 8], fov: 55 }}
      className="!absolute inset-0"
    >
      <color attach="background" args={["#050b14"]} />
      <fog attach="fog" args={["#050b14", 12, 32]} />
      <ambientLight intensity={0.6} />
      <Constellation />
      <CompassRing />
      <WavePlane />
      <Rig />
    </Canvas>
  );
}
