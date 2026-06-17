"use client";

import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// ── Geometry constants ───────────────────────────────────────────────
const R     = 1;
const DEPTH = 0.22;
const D2    = DEPTH / 2;
const SQ3   = Math.sqrt(3);

// A apex = midpoint of top hex edge, feet = lower-left / lower-right vertices
const APEX   = new THREE.Vector3(0,      SQ3 / 2,  D2 + 0.03);
const L_FOOT = new THREE.Vector3(-0.5, -SQ3 / 2, D2 + 0.03);
const R_FOOT = new THREE.Vector3( 0.5, -SQ3 / 2, D2 + 0.03);

function buildHexShape(): THREE.Shape {
  const s = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i;
    if (i === 0) s.moveTo(R * Math.cos(a), R * Math.sin(a));
    else          s.lineTo(R * Math.cos(a), R * Math.sin(a));
  }
  s.closePath();
  return s;
}

// ── Inner scene ──────────────────────────────────────────────────────
function HexScene() {
  const mainRef = useRef<THREE.Group>(null);
  const g1Ref   = useRef<THREE.Group>(null);
  const g2Ref   = useRef<THREE.Group>(null);
  const ls1Ref  = useRef<THREE.LineSegments>(null);
  const ls2Ref  = useRef<THREE.LineSegments>(null);

  const hexGeo = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(buildHexShape(), {
      depth: DEPTH,
      bevelEnabled: true,
      bevelThickness: 0.022,
      bevelSize: 0.022,
      bevelSegments: 4,
    });
    g.translate(0, 0, -D2); // center on Z axis
    return g;
  }, []);

  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(hexGeo, 20), [hexGeo]);

  const legLGeo = useMemo(() =>
    new THREE.TubeGeometry(new THREE.LineCurve3(APEX, L_FOOT), 1, 0.04, 8, false),
  []);

  const legRGeo = useMemo(() =>
    new THREE.TubeGeometry(new THREE.LineCurve3(APEX, R_FOOT), 1, 0.04, 8, false),
  []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    // Main mark: gentle sway + float
    if (mainRef.current) {
      mainRef.current.rotation.y = Math.sin(t * 0.45) * 0.35;
      mainRef.current.rotation.x = Math.sin(t * 0.28) * 0.07;
      mainRef.current.position.y = Math.sin(t * 0.80) * 0.12;
    }

    // Ghost convergence: start after 1.5s, converge over 3s, dissolve after 4.5s
    const gt      = Math.max(0, t - 1.5);
    const conv    = Math.min(1, gt / 3.0);
    const ease    = 1 - Math.pow(1 - conv, 3); // easeOutCubic
    const fadeIn  = Math.min(1, gt / 0.8);
    const fadeOut = gt > 4.5 ? Math.min(1, (gt - 4.5) / 1.2) : 0;
    const alpha   = fadeIn * (1 - fadeOut);

    if (g1Ref.current) g1Ref.current.scale.setScalar(0.60 + ease * 0.40);
    if (g2Ref.current) g2Ref.current.scale.setScalar(0.80 + ease * 0.20);

    if (ls1Ref.current) {
      (ls1Ref.current.material as THREE.LineBasicMaterial).opacity = alpha * 0.55;
    }
    if (ls2Ref.current) {
      (ls2Ref.current.material as THREE.LineBasicMaterial).opacity = alpha * 0.42;
    }
  });

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.12} />
      <pointLight position={[3, 2.5, 4]}   color="#B4BDD2" intensity={14} />
      <pointLight position={[-2.5, -2, 3]}  color="#4ECDC4" intensity={5}  />
      <pointLight position={[0, 2.5, 3]}    color="#ffffff"  intensity={3}  />

      {/* Ghost layer 3 — teal wireframe, starts small */}
      <group ref={g1Ref} scale={0.60}>
        <lineSegments ref={ls1Ref} geometry={edgesGeo}>
          <lineBasicMaterial color="#4ECDC4" transparent opacity={0} />
        </lineSegments>
      </group>

      {/* Ghost layer 2 — orange wireframe, mid depth */}
      <group ref={g2Ref} scale={0.80}>
        <lineSegments ref={ls2Ref} geometry={edgesGeo}>
          <lineBasicMaterial color="#B4BDD2" transparent opacity={0} />
        </lineSegments>
      </group>

      {/* Main mark */}
      <group ref={mainRef}>
        {/* Hex prism — dark metallic */}
        <mesh geometry={hexGeo}>
          <meshPhysicalMaterial
            color="#060c18"
            metalness={0.88}
            roughness={0.09}
            emissive="#B4BDD2"
            emissiveIntensity={0.08}
          />
        </mesh>

        {/* Subtle edge highlight on hex */}
        <lineSegments geometry={edgesGeo}>
          <lineBasicMaterial color="#B4BDD2" transparent opacity={0.25} />
        </lineSegments>

        {/* A — left leg */}
        <mesh geometry={legLGeo}>
          <meshStandardMaterial
            color="#B4BDD2"
            emissive="#B4BDD2"
            emissiveIntensity={3.0}
          />
        </mesh>

        {/* A — right leg */}
        <mesh geometry={legRGeo}>
          <meshStandardMaterial
            color="#B4BDD2"
            emissive="#B4BDD2"
            emissiveIntensity={3.0}
          />
        </mesh>
      </group>

      {/* Bloom on emissive elements */}
      <EffectComposer>
        <Bloom
          intensity={1.8}
          luminanceThreshold={0.35}
          luminanceSmoothing={0.82}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

// ── Public component ─────────────────────────────────────────────────
export function HexMark3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.8], fov: 42 }}
      gl={{ alpha: true, premultipliedAlpha: false, antialias: true }}
      dpr={[1, 1.5]}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <HexScene />
      </Suspense>
    </Canvas>
  );
}
