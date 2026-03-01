'use client'

import { Bloom, Noise, ChromaticAberration, Vignette, EffectComposer } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useScrollStore } from '@/store'
import { usePathname } from 'next/navigation'

interface EffectsProps {
    performance: 'high' | 'medium' | 'low'
}

export function Effects({ performance }: EffectsProps) {
    const { scrollProgress } = useScrollStore()
    const pathname = usePathname()

    if (performance === 'low') return null

    const isHome = pathname === '/'
    const bloomIntensity = isHome ? 1.5 + scrollProgress * 0.5 : 1.5

    return (
        <EffectComposer enableNormalPass={false} multisampling={performance === 'high' ? 0 : 0}>
            <Bloom
                intensity={bloomIntensity}
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
                mipmapBlur
            />
            <Noise
                opacity={0.05}
                premultiply
                blendFunction={BlendFunction.OVERLAY}
            />
            {performance === 'high' ? (
                <ChromaticAberration
                    offset={[0.002, 0.002]}
                    radialModulation={false}
                    modulationOffset={0}
                />
            ) : <></>}
            <Vignette
                eskil={false}
                offset={0.5}
                darkness={0.5}
            />
        </EffectComposer>
    )
}
