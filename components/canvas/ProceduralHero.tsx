'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollStore } from '@/store'
import { usePathname } from 'next/navigation'


// Vertex Shader Logic for the 5 shapes
const vertexShaderLogic = `
uniform float uTime;
uniform float uShapeIndex;
uniform float uGlitchIntensity;

// Simplex Noise (Credit: diverse sources, standard implementation)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}

vec3 getShape(int index, vec3 pos, vec3 normal) {
    vec3 transformed = pos;
    if (index == 0) {
        // Idle Blob
        transformed = pos + normal * sin(uTime * 2.0) * 0.1;
    } else if (index == 1) {
        // Bulbous Star
        transformed = pos + normal * sin(pos.x * 4.0) * sin(pos.y * 4.0) * 0.5;
    } else if (index == 2) {
        // Radial Fan
        float displacement = sin(atan(pos.x, pos.z) * 8.0) * 0.3; // Added factor to make it visible
        // Applying displacement along normal or just radial
        transformed = pos + normal * displacement;
    } else if (index == 3) {
        // Ribbed Artifact
        transformed = pos + normal * abs(sin(pos.x * 20.0) + sin(pos.y * 20.0)) * 0.2;
    } else if (index == 4) {
        // Twisted Torus
        // Map Sphere UVs to Torus
        float u = atan(pos.x, pos.z); // -PI to PI
        float v = pos.y * 3.14159; // Map Y (-1 to 1) to -PI to PI
        
        // Torus Parameters
        float R = 1.0; 
        float r = 0.4; 
        
        // Twist factor
        float twist = 2.0; 
        float angle = v + u * twist;
        
        // Parametric Torus
        transformed.x = (R + r * cos(angle)) * cos(u);
        transformed.z = (R + r * cos(angle)) * sin(u);
        transformed.y = r * sin(angle);
    }
    return transformed;
}

// Function to blend shapes
vec3 blendShapes(vec3 pos, vec3 normal, float shapeIndex) {
    // Current loop: 0 -> 1 -> 2 -> 3 -> 4
    float t = clamp(shapeIndex, 0.0, 4.0);
    
    // We mix based on the integer parts
    // but to support "jumping" we might need a different approach if shapeIndex changes non-sequentially.
    // However, for scroll it is sequential. For static, we might just set it.
    // If we want to interpolate between ANY two shapes, we can't easily do it in a single loop without 
    // computing all significant ones or assuming order.
    // Given the scroll requirement, sequential assumption is good.
    // For random access in "Static" mode, we will simply rely on the index moving sequentially 
    // or just snapping if it's too far? No, smooth interpolate is asked.
    // A simple linear blend between floor and ceil index works.
    
    int idx1 = int(floor(t));
    int idx2 = int(ceil(t));
    float factor = fract(t);
    
    if (idx1 == idx2) return getShape(idx1, pos, normal);
    
    vec3 p1 = getShape(idx1, pos, normal);
    vec3 p2 = getShape(idx2, pos, normal);
    
    return mix(p1, p2, factor);
}
`

export default function ProceduralHero({ mode = 'scroll', targetShape }: { mode?: 'scroll' | 'static', targetShape?: number }) {
    const { viewport } = useThree()
    const meshRef = useRef<THREE.Mesh>(null)
    const wireframeMeshRef = useRef<THREE.Mesh>(null)
    const materialRef = useRef<THREE.MeshPhysicalMaterial>(null)
    const wireframeMaterialRef = useRef<THREE.MeshBasicMaterial>(null)
    const { scrollProgress } = useScrollStore()
    const pathname = usePathname()

    // State for smooth transitions


    // Uniforms ref for updating
    const uniforms = useRef({
        uTime: { value: 0 },
        uShapeIndex: { value: 0 },
        uGlitchIntensity: { value: 0 }
    })

    // Target index logic
    const getTargetShapeIndex = () => {
        if (typeof targetShape === 'number') return targetShape;

        if (mode === 'scroll' && pathname === '/') {
            // Map scroll progress 0..1 to shapes 0..4
            return Math.min(scrollProgress * 4, 4);
        }

        // Static mappings based on route
        if (pathname.includes('/payments-reimagined')) return 1; // Bulbous Star
        if (pathname.includes('/treasury-dashboard')) return 2; // Radial Fan
        if (pathname.includes('/verizon')) return 3; // Ribbed Artifact
        if (pathname === '/about') return 4; // Twisted Torus

        return 0; // Default Idle
    }

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime()

        // Update Time
        uniforms.current.uTime.value = time

        // Determine target shape index
        const targetIndex = getTargetShapeIndex()

        // Smoothly interpolate current uShapeIndex to target
        // Using a simple lerp for smoothness
        const current = uniforms.current.uShapeIndex.value
        const diff = targetIndex - current

        // Glitch Logic: High intensity when moving fast
        // The glitch intensity should be proportional to the speed of change
        const speed = Math.abs(diff)
        const glitchTarget = speed > 0.05 ? Math.min(speed * 5.0, 1.0) : 0.0
        uniforms.current.uGlitchIntensity.value = THREE.MathUtils.lerp(uniforms.current.uGlitchIntensity.value, glitchTarget, 0.1)

        // Update Shape Index (Linear Interpolation)
        uniforms.current.uShapeIndex.value = THREE.MathUtils.lerp(current, targetIndex, delta * 3.0) // Adjust speed as needed

        // Update uniforms on materials if they are compiled
        if (materialRef.current?.userData?.shader) {
            materialRef.current.userData.shader.uniforms.uTime.value = time
            materialRef.current.userData.shader.uniforms.uShapeIndex.value = uniforms.current.uShapeIndex.value
            materialRef.current.userData.shader.uniforms.uGlitchIntensity.value = uniforms.current.uGlitchIntensity.value
        }
        if (wireframeMaterialRef.current?.userData?.shader) {
            wireframeMaterialRef.current.userData.shader.uniforms.uTime.value = time
            wireframeMaterialRef.current.userData.shader.uniforms.uShapeIndex.value = uniforms.current.uShapeIndex.value
            wireframeMaterialRef.current.userData.shader.uniforms.uGlitchIntensity.value = uniforms.current.uGlitchIntensity.value
        }

        // Keep existing rotation logic
        if (meshRef.current) {
            // Rotation based on time and scroll
            const scrollFactor = pathname === '/' ? scrollProgress : 0
            meshRef.current.rotation.x = time * 0.1 + scrollFactor * Math.PI
            meshRef.current.rotation.y = time * 0.15 + scrollFactor * Math.PI

            // Mouse parallax
            const { x, y } = state.mouse
            const targetX = x * 1.5
            const targetY = y * 1.5

            // Responsive position and scale logic
            const isMobile = viewport.width < 6
            const responsiveScale = isMobile ? 1.8 : 2.5

            let scrollOffsetX = isMobile ? 0.5 : 2
            if (scrollFactor > 0.15 && scrollFactor < 0.35) scrollOffsetX = isMobile ? 0.8 : 2.5
            if (scrollFactor > 0.40 && scrollFactor < 0.60) scrollOffsetX = isMobile ? 0.3 : 1.8
            if (scrollFactor > 0.65 && scrollFactor < 0.85) scrollOffsetX = isMobile ? 0.6 : 2.2

            meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX + scrollOffsetX, 0.05)
            meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05)

            // Update scale responsively
            meshRef.current.parent?.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.parent.scale.x, responsiveScale, 0.05))

            // Sync wireframe mesh
            if (wireframeMeshRef.current) {
                wireframeMeshRef.current.rotation.copy(meshRef.current.rotation)
                wireframeMeshRef.current.position.copy(meshRef.current.position)
            }
        }
    })

    const onBeforeCompile = useMemo(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (shader: any) => {
            // Store shader for uniform updates
            if (materialRef.current) materialRef.current.userData.shader = shader;

            shader.uniforms.uTime = uniforms.current.uTime;
            shader.uniforms.uShapeIndex = uniforms.current.uShapeIndex;
            shader.uniforms.uGlitchIntensity = uniforms.current.uGlitchIntensity;

            // Inject custom logic
            shader.vertexShader = `
                ${vertexShaderLogic}
                ${shader.vertexShader}
            `

            // Replace #include <begin_vertex> with our shape blending
            shader.vertexShader = shader.vertexShader.replace(
                '#include <begin_vertex>',
                `
                vec3 transformed = blendShapes(position, normal, uShapeIndex);
                
                // Glitch Effect
                float noiseVal = snoise(transformed * 5.0 + uTime * 10.0);
                transformed += normal * noiseVal * uGlitchIntensity * 0.2;
                
                `
            )
        }
    }, [])

    const onBeforeCompileWireframe = useMemo(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (shader: any) => {
            // Store shader for uniform updates
            if (wireframeMaterialRef.current) wireframeMaterialRef.current.userData.shader = shader;

            shader.uniforms.uTime = uniforms.current.uTime;
            shader.uniforms.uShapeIndex = uniforms.current.uShapeIndex;
            shader.uniforms.uGlitchIntensity = uniforms.current.uGlitchIntensity;

            shader.vertexShader = `
                ${vertexShaderLogic}
                ${shader.vertexShader}
            `

            shader.vertexShader = shader.vertexShader.replace(
                '#include <begin_vertex>',
                `
                vec3 transformed = blendShapes(position, normal, uShapeIndex);
                float noiseVal = snoise(transformed * 5.0 + uTime * 10.0);
                transformed += normal * noiseVal * uGlitchIntensity * 0.2;
                `
            )
        }
    }, [])

    return (
        <group scale={2.5}>
            {/* Main Mesh */}
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[1, 16]} />
                <meshPhysicalMaterial
                    ref={materialRef}
                    color="#050505"
                    roughness={0.1}
                    metalness={0.9}
                    flatShading={true} // Faceted look
                    onBeforeCompile={onBeforeCompile}
                />
            </mesh>

            {/* Wireframe Overlay */}
            <mesh ref={wireframeMeshRef} scale={1.2}>
                <icosahedronGeometry args={[1, 2]} />
                <meshBasicMaterial
                    ref={wireframeMaterialRef}
                    color="#ffffff"
                    wireframe={true}
                    transparent={true}
                    opacity={0.1}
                    blending={THREE.AdditiveBlending}
                    onBeforeCompile={onBeforeCompileWireframe}
                />
            </mesh>
        </group>
    )
}
