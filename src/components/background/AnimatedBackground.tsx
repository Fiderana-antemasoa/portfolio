import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import './AnimatedBackground.css'

function MainOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { pointer } = useThree()

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.getElapsedTime()

    meshRef.current.rotation.x += 0.0025
    meshRef.current.rotation.y += 0.004
    meshRef.current.rotation.z += 0.0015

    const targetX = pointer.x * 0.35
    const targetY = pointer.y * 0.25

    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      targetX,
      0.025
    )

    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetY + Math.sin(time * 0.6) * 0.12,
      0.025
    )
  })

  return (
    <Float
      speed={1.1}
      rotationIntensity={0.25}
      floatIntensity={0.35}
    >
      <mesh ref={meshRef} scale={1.65}>
        <icosahedronGeometry args={[1, 5]} />
        <meshPhysicalMaterial
          color="#d85ca2"
          emissive="#7d3d91"
          emissiveIntensity={0.22}
          roughness={0.18}
          metalness={0.15}
          transparent
          opacity={0.32}
          transmission={0.25}
          thickness={1.4}
        />
      </mesh>
    </Float>
  )
}

function InnerOrb() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.getElapsedTime()

    meshRef.current.rotation.x = time * 0.08
    meshRef.current.rotation.y = time * 0.12
    meshRef.current.rotation.z = time * 0.05
  })

  return (
    <mesh ref={meshRef} scale={0.8}>
      <icosahedronGeometry args={[1, 3]} />
      <meshStandardMaterial
        color="#f28bb8"
        emissive="#b84f87"
        emissiveIntensity={0.5}
        roughness={0.28}
        metalness={0.2}
        transparent
        opacity={0.5}
      />
    </mesh>
  )
}

function OrbitalRing({
  rotation,
  scale,
  opacity,
}: {
  rotation: [number, number, number]
  scale: number
  opacity: number
}) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return

    const time = state.clock.getElapsedTime()

    ref.current.rotation.x = rotation[0] + time * 0.04
    ref.current.rotation.y = rotation[1] + time * 0.06
    ref.current.rotation.z = rotation[2] + time * 0.025
  })

  return (
    <mesh ref={ref} scale={scale}>
      <torusGeometry args={[1.65, 0.012, 16, 120]} />
      <meshBasicMaterial
        color="#e987b3"
        transparent
        opacity={opacity}
      />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.7} />

      <pointLight
        position={[3, 3, 4]}
        intensity={8}
        color="#f58ab8"
      />

      <pointLight
        position={[-4, -2, 2]}
        intensity={6}
        color="#8c4db3"
      />

      <pointLight
        position={[0, 4, -3]}
        intensity={4}
        color="#ffffff"
      />

      <Float
        speed={0.7}
        rotationIntensity={0.15}
        floatIntensity={0.25}
      >
        <group position={[2.8, 0.2, -1]}>
          <MainOrb />
          <InnerOrb />

          <OrbitalRing
            rotation={[0.8, 0.3, 0.2]}
            scale={1.1}
            opacity={0.35}
          />

          <OrbitalRing
            rotation={[1.8, 0.8, 1.2]}
            scale={1.35}
            opacity={0.18}
          />
        </group>
      </Float>

      <Sparkles
        count={90}
        scale={[12, 7, 6]}
        size={2}
        speed={0.25}
        opacity={0.35}
        color="#f3a4c9"
      />

      <Sparkles
        count={35}
        scale={[8, 5, 4]}
        size={3}
        speed={0.15}
        opacity={0.2}
        color="#b86bc5"
      />
    </>
  )
}

export default function AnimatedBackground() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleVisibility = () => {
      setVisible(!document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  return (
    <div className={`animated-background ${visible ? '' : 'animated-background--paused'}`}>
      <div className="animated-background__glow animated-background__glow--one" />
      <div className="animated-background__glow animated-background__glow--two" />

      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 45,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Scene />
      </Canvas>

      <div className="animated-background__vignette" />
    </div>
  )
}