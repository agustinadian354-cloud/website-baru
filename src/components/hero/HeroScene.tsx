import { useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Membuat posisi acak N titik di dalam box, dipakai untuk dua lapisan
 * partikel (teal = shadow grade, amber = highlight grade) — merujuk ke
 * "teal & orange" color grading klasik sinema.
 */
function useParticlePositions(count: number, spread: number) {
  return useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
    }
    return positions;
  }, [count, spread]);
}

function ParticleLayer({
  count,
  spread,
  size,
  color,
  speed,
}: {
  count: number;
  spread: number;
  size: number;
  color: string;
  speed: number;
}) {
  const ref = useRef<THREE.Points>(null);
  const positions = useParticlePositions(count, spread);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * speed * 0.02;
    ref.current.position.y = Math.sin(t * speed * 0.15) * 0.15;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.75}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/** Parallax kamera halus mengikuti posisi pointer — bukan efek 1:1, di-lerp supaya terasa "berat". */
function CameraRig() {
  const target = useRef({ x: 0, y: 0 });

  useFrame(({ camera, pointer }) => {
    target.current.x += (pointer.x * 0.4 - target.current.x) * 0.03;
    target.current.y += (pointer.y * 0.25 - target.current.y) * 0.03;
    camera.position.x = target.current.x;
    camera.position.y = target.current.y;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene(props: ThreeElements["group"]) {
  return (
    <group {...props}>
      <ParticleLayer count={260} spread={9} size={0.028} color="#3fb6ae" speed={1} />
      <ParticleLayer count={160} spread={7} size={0.022} color="#f2955a" speed={-1.4} />
      <CameraRig />
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.75]}
    >
      <Scene />
    </Canvas>
  );
}
