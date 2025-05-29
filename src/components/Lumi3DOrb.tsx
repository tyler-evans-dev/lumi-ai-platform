'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Sphere,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  MeshReflectorMaterial,
  useTexture,
  Text,
  Trail,
  PointMaterial,
  Points,
  Billboard,
  useGLTF,
  Environment,
  PerspectiveCamera
} from '@react-three/drei';
import * as THREE from 'three';
import { Vector3, Color, MathUtils } from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';

// Generate random particles for the orb
const generateParticles = (count: number, radius: number) => {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const color = new Color();

  for (let i = 0; i < count; i++) {
    // Position on sphere surface with some randomness
    const phi = Math.random() * Math.PI * 2;
    const theta = Math.random() * Math.PI;
    
    const r = radius * (0.8 + Math.random() * 0.3); // Vary radius slightly
    
    positions[i * 3] = r * Math.sin(theta) * Math.cos(phi);
    positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
    positions[i * 3 + 2] = r * Math.cos(theta);
    
    // Color gradient from blue to purple
    const blueToPurple = Math.random();
    color.setHSL(0.6 + blueToPurple * 0.1, 0.8, 0.5 + Math.random() * 0.2);
    
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
    
    // Random sizes
    sizes[i] = Math.random() * 0.5 + 0.5;
  }
  
  return { positions, colors, sizes };
};

// Particles component
const Particles = ({ count = 2000, radius = 2 }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const { positions, colors, sizes } = useMemo(() => generateParticles(count, radius), [count, radius]);
  
  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    
    // Rotate particles slowly
    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    
    // Pulse effect
    const scale = 1 + Math.sin(clock.getElapsedTime() * 0.3) * 0.03;
    pointsRef.current.scale.set(scale, scale, scale);
  });
  
  return (
    <Points ref={pointsRef} limit={count}>
      <PointMaterial
        transparent
        vertexColors
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
      <buffer attach="geometry-position" array={positions} count={positions.length / 3} itemSize={3} />
      <buffer attach="geometry-color" array={colors} count={colors.length / 3} itemSize={3} />
      <buffer attach="geometry-size" array={sizes} count={sizes.length} itemSize={1} />
    </Points>
  );
};

// Orbital Ring component representing the dual AI system
const OrbitalRing = ({ 
  radius = 2.5, 
  thickness = 0.05, 
  color = new Color('#60a5fa'), 
  rotation = [0, 0, 0], 
  speed = 0.2,
  particleCount = 50
}) => {
  const ringRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Group>(null);
  
  // Create particles along the ring
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const size = Math.random() * 0.1 + 0.05;
      const speed = Math.random() * 0.01 + 0.005;
      temp.push({ position: [x, 0, z], size, speed, angle });
    }
    return temp;
  }, [radius, particleCount]);
  
  useFrame(({ clock }) => {
    if (ringRef.current) {
      // Rotate the ring
      ringRef.current.rotation.x = rotation[0];
      ringRef.current.rotation.y = rotation[1] + clock.getElapsedTime() * speed;
      ringRef.current.rotation.z = rotation[2];
    }
    
    if (particlesRef.current) {
      // Match particles rotation to ring
      particlesRef.current.rotation.x = rotation[0];
      particlesRef.current.rotation.y = rotation[1] + clock.getElapsedTime() * speed;
      particlesRef.current.rotation.z = rotation[2];
      
      // Pulse effect on particles
      const pulse = Math.sin(clock.getElapsedTime() * 2) * 0.2 + 0.8;
      particlesRef.current.children.forEach((child, i) => {
        const particle = particles[i];
        if (child instanceof THREE.Mesh) {
          child.scale.setScalar(particle.size * pulse);
        }
      });
    }
  });
  
  return (
    <>
      {/* The ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[radius, thickness, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
      
      {/* Particles along the ring */}
      <group ref={particlesRef}>
        {particles.map((particle, i) => (
          <mesh key={i} position={new Vector3(...particle.position)}>
            <sphereGeometry args={[particle.size, 8, 8]} />
            <meshBasicMaterial color={color} transparent opacity={0.8} />
          </mesh>
        ))}
      </group>
    </>
  );
};

// Core Orb component with glassmorphism effect
const CoreOrb = ({ isHovered, isActive, onClick }) => {
  const orbRef = useRef<THREE.Mesh>(null);
  const innerOrbRef = useRef<THREE.Mesh>(null);
  
  // Colors for the orb
  const outerColor = new Color('#60a5fa');
  const innerColor = new Color('#a78bfa');
  
  useFrame(({ clock }) => {
    if (!orbRef.current || !innerOrbRef.current) return;
    
    // Gentle wobble animation
    const t = clock.getElapsedTime();
    
    // Animate based on interaction state
    const pulseSpeed = isActive ? 2 : isHovered ? 1.5 : 1;
    const pulseStrength = isActive ? 0.1 : isHovered ? 0.05 : 0.02;
    const distortionStrength = isActive ? 0.4 : isHovered ? 0.3 : 0.2;
    
    // Apply animations
    orbRef.current.scale.setScalar(1 + Math.sin(t * pulseSpeed) * pulseStrength);
    innerOrbRef.current.scale.setScalar(1 + Math.cos(t * pulseSpeed * 1.3) * pulseStrength * 1.2);
    
    // Rotate inner orb in opposite direction
    innerOrbRef.current.rotation.y = -t * 0.2;
    innerOrbRef.current.rotation.z = Math.sin(t * 0.2) * 0.1;
  });
  
  return (
    <group onClick={onClick}>
      {/* Outer orb with distortion */}
      <mesh ref={orbRef}>
        <sphereGeometry args={[1.8, 64, 64]} />
        <MeshDistortMaterial
          color={outerColor}
          distort={0.2}
          speed={2}
          transparent
          opacity={0.7}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Inner orb with wobble */}
      <mesh ref={innerOrbRef}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <MeshWobbleMaterial
          color={innerColor}
          factor={0.4}
          speed={2}
          transparent
          opacity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
};

// Labels for the dual AI system
const DualAILabels = ({ isActive }) => {
  const horizontalRef = useRef<THREE.Group>(null);
  const verticalRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (!horizontalRef.current || !verticalRef.current) return;
    
    // Floating animation
    const t = clock.getElapsedTime();
    horizontalRef.current.position.y = Math.sin(t * 0.5) * 0.1;
    verticalRef.current.position.y = Math.cos(t * 0.5) * 0.1;
    
    // Opacity pulsing when active
    if (isActive) {
      const pulse = (Math.sin(t * 2) * 0.2 + 0.8);
      horizontalRef.current.scale.setScalar(pulse);
      verticalRef.current.scale.setScalar(pulse);
    }
  });
  
  return (
    <>
      {/* Horizontal AI Label */}
      <Billboard
        ref={horizontalRef}
        position={[2.5, 0, 0]}
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        <Text
          fontSize={0.2}
          color="#60a5fa"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#000000"
        >
          HORIZONTAL AI
        </Text>
      </Billboard>
      
      {/* Vertical AI Label */}
      <Billboard
        ref={verticalRef}
        position={[0, 2.5, 0]}
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        <Text
          fontSize={0.2}
          color="#a78bfa"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#000000"
        >
          VERTICAL AI
        </Text>
      </Billboard>
    </>
  );
};

// Main scene component
const OrbScene = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  const handleClick = () => {
    setIsActive(!isActive);
  };
  
  return (
    <>
      {/* Environment and lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#a78bfa" intensity={0.5} />
      
      {/* Particles background */}
      <Particles count={3000} radius={5} />
      
      {/* Orbital rings representing dual AI */}
      <OrbitalRing 
        radius={2.5} 
        thickness={0.03} 
        color={new Color('#60a5fa')} 
        rotation={[Math.PI/2, 0, 0]} 
        speed={0.1}
        particleCount={40}
      />
      <OrbitalRing 
        radius={2.2} 
        thickness={0.03} 
        color={new Color('#a78bfa')} 
        rotation={[0, 0, 0]} 
        speed={-0.15}
        particleCount={30}
      />
      
      {/* Core orb */}
      <CoreOrb 
        isHovered={isHovered} 
        isActive={isActive} 
        onClick={handleClick}
      />
      
      {/* Labels */}
      <DualAILabels isActive={isActive} />
      
      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
        <ChromaticAberration offset={[0.0005, 0.0005]} />
      </EffectComposer>
      
      {/* Controls */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI * 3/4}
        rotateSpeed={0.5}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      />
    </>
  );
};

// Main exported component with canvas
export default function Lumi3DOrb() {
  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[400px] relative">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 45 }}>
        <OrbScene />
      </Canvas>
      
      {/* Optional UI overlay */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-white/50 pointer-events-none">
        Click the orb to activate
      </div>
    </div>
  );
}
