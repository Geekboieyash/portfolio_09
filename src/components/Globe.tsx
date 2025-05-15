import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  Mesh,
  Color,
  BufferGeometry,
  Float32BufferAttribute,
  LineBasicMaterial,
  Line,
} from 'three';

interface NodeData {
  position: [number, number, number];
  pulseSpeed: number;
  pulseOffset: number;
}

interface ConnectionData {
  geometry: BufferGeometry;
  material: LineBasicMaterial;
}

const SoftGlobe: React.FC = () => {
  const meshRef = useRef<Mesh>(null);
  const linesRef = useRef<Line[]>([]);
  const movingDotsRef = useRef<THREE.Mesh[]>([]);

  // 🎨 Soft color palette
  const colors = useMemo(
    () => ({
      base: new Color('#1a2b4d'),
      highlight: new Color('#2a4175'),
      glow: new Color('#4d68a1'),
      connections: new Color('#d04dff'),
      points: new Color('#d04dff'),
    }),
    []
  );

  // 🌐 Generate network nodes
  const nodesData: NodeData[] = useMemo(() => {
    const nodes: NodeData[] = [];
    for (let i = 0; i < 30; i++) {
      const lat = (Math.random() - 0.5) * 180;
      const lng = (Math.random() - 0.5) * 360;
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const radius = 1.005;

      const x = -Math.sin(phi) * Math.cos(theta) * radius;
      const y = Math.cos(phi) * radius;
      const z = Math.sin(phi) * Math.sin(theta) * radius;

      nodes.push({
        position: [x, y, z],
        pulseSpeed: Math.random() * 0.3 + 0.1,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }
    return nodes;
  }, []);

  // 🔗 Generate connection lines
  const connectionLines: ConnectionData[] = useMemo(() => {
    const lines: ConnectionData[] = [];
    const numConnections = 40;

    for (let i = 0; i < numConnections; i++) {
      const startIndex = Math.floor(Math.random() * nodesData.length);
      let endIndex;
      do {
        endIndex = Math.floor(Math.random() * nodesData.length);
      } while (endIndex === startIndex);

      const start = nodesData[startIndex].position;
      const end = nodesData[endIndex].position;

      const midPoint = [
        (start[0] + end[0]) / 2,
        (start[1] + end[1]) / 2,
        (start[2] + end[2]) / 2,
      ];

      const midMagnitude = Math.sqrt(
        midPoint[0] ** 2 + midPoint[1] ** 2 + midPoint[2] ** 2
      );
      const elevationFactor = 1.2 + Math.random() * 0.3;

      midPoint[0] = (midPoint[0] / midMagnitude) * elevationFactor;
      midPoint[1] = (midPoint[1] / midMagnitude) * elevationFactor;
      midPoint[2] = (midPoint[2] / midMagnitude) * elevationFactor;

      const curvePoints: number[] = [];
      for (let j = 0; j <= 10; j++) {
        const t = j / 10;
        const x =
          (1 - t) ** 2 * start[0] +
          2 * (1 - t) * t * midPoint[0] +
          t ** 2 * end[0];
        const y =
          (1 - t) ** 2 * start[1] +
          2 * (1 - t) * t * midPoint[1] +
          t ** 2 * end[1];
        const z =
          (1 - t) ** 2 * start[2] +
          2 * (1 - t) * t * midPoint[2] +
          t ** 2 * end[2];
        curvePoints.push(x, y, z);
      }

      const geometry = new BufferGeometry();
      geometry.setAttribute('position', new Float32BufferAttribute(curvePoints, 3));

      const material = new LineBasicMaterial({
        color: colors.connections,
        transparent: true,
        opacity: 0.6,
      });

      lines.push({ geometry, material });
    }
    return lines;
  }, [nodesData, colors.connections]);

  // Extract curve points from each line for animation
  const linePaths = useMemo(() => {
    return connectionLines.map((lineData) => {
      const posAttr = lineData.geometry.getAttribute('position') as THREE.BufferAttribute;
      const points: THREE.Vector3[] = [];
      for (let i = 0; i < posAttr.count; i++) {
        const point = new THREE.Vector3().fromBufferAttribute(posAttr, i);
        points.push(point);
      }
      return points;
    });
  }, [connectionLines]);

  // 🔄 Rotate globe and animate lines + moving dots
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }

    linesRef.current.forEach((line, i) => {
      if (line?.material) {
        const pulse = Math.sin(clock.elapsedTime * 0.5 + i * 0.1);
        (line.material as LineBasicMaterial).opacity = THREE.MathUtils.lerp(
          0.3,
          0.6,
          (pulse + 1) / 2
        );
      }
    });

    movingDotsRef.current.forEach((dot, i) => {
      const points = linePaths[i];
      if (!points || points.length < 2) return;

      const speed = 0.5; // control speed of flow
      const t = (clock.elapsedTime * speed + i * 0.1) % 1;

      const totalSegments = points.length - 1;
      const segment = Math.floor(t * totalSegments);
      const localT = (t * totalSegments) % 1;

      if (segment < points.length - 1) {
        const p1 = points[segment];
        const p2 = points[segment + 1];
        dot.position.lerpVectors(p1, p2, localT);
      }
    });
  });

  return (
    <group scale={1.45}>
      {/* 🌍 Globe Sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 32]} />
        <meshPhongMaterial
          color={colors.base}
          emissive={colors.highlight}
          emissiveIntensity={0.1}
          specular={colors.glow}
          shininess={5}
          transparent
          opacity={0.9}
          wireframe
        />
      </mesh>

      {/* 💫 Soft Glow Layer */}
      <mesh>
        <sphereGeometry args={[1.03, 32, 16]} />
        <meshBasicMaterial color={colors.glow} transparent opacity={0.05} />
      </mesh>

      {/* 🔌 Connection Lines */}
      {connectionLines.map((lineData, idx) => (
        <primitive
          key={`line-${idx}`}
          object={new Line(lineData.geometry, lineData.material)}
          ref={(ref) => {
            if (ref) linesRef.current[idx] = ref as Line;
          }}
        />
      ))}

      {/* 📡 Network Nodes */}
      {nodesData.map((node, idx) => (
        <mesh key={`node-${idx}`} position={node.position}>
          <sphereGeometry args={[0.01, 8, 8]} />
          <meshBasicMaterial
            color={colors.points}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      {/* 🧠 Animated Dots Along Lines */}
      {/* 🧠 Animated Dots Along Lines */}
{linePaths.map((_, idx) => (
  <mesh
    key={`dot-${idx}`}
    ref={(ref) => {
      if (ref) movingDotsRef.current[idx] = ref;
    }}
  >
    <sphereGeometry args={[0.007, 8, 8]} />
    <meshBasicMaterial color={colors.connections} />
  </mesh>
))}

    </group>
  );
};

export default SoftGlobe;
