'use client'

import { Canvas } from '@react-three/fiber'
import { Preload, Environment, PerformanceMonitor, Lightformer } from '@react-three/drei'
import { useState } from 'react'
import { Effects } from './Effects'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Scene({ children, ...props }: any) {
  const [performance, setPerformance] = useState<'high' | 'medium' | 'low'>('high')

  return (
    <div className='fixed top-0 left-0 w-full h-screen -z-10'>
      <Canvas {...props} dpr={[1, 2]} gl={{ alpha: true, antialias: false }}>
        <PerformanceMonitor
          onDecline={() => setPerformance(prev => prev === 'high' ? 'medium' : 'low')}
          onIncline={() => setPerformance(prev => prev === 'low' ? 'medium' : 'high')}
        />

        <fog attach="fog" args={['#000000', 5, 30]} />

        <ambientLight intensity={0.2} color="#001133" />

        {/* Rim Lighting */}
        <spotLight
          position={[10, 10, -5]}
          angle={0.5}
          penumbra={1}
          intensity={4}
          color="#eef2ff"
        />
        <pointLight position={[-10, -10, -5]} intensity={2} color="#223355" />

        <Environment resolution={256} frames={1}>
          {/* Main Key Light */}
          <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} color="#eef2ff" />
          {/* Fill Light */}
          <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 5, 9]} scale={[10, 10, 1]} color="#eef2ff" />
          {/* Side accents */}
          <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-50, 2, 0]} scale={[100, 2, 1]} color="#223355" />
          <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[50, 2, 0]} scale={[100, 2, 1]} color="#223355" />
          {/* Ambient Fill */}
          <Lightformer form="rect" intensity={1} position={[0, -5, 0]} rotation-x={-Math.PI / 2} scale={[50, 50, 1]} color="#180037ff" />
        </Environment>

        {children}
        <Effects performance={performance} />
        <Preload all />
      </Canvas>
    </div>
  )
}
