import { Canvas } from '@react-three/fiber'
import { PresentationControls } from '@react-three/drei'
import { EffectComposer, SMAA, Bloom, Scanline } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Suspense } from 'react'
import ThreeSpinner from './ThreeSpinner'

const ConsoleViewer = ({ children, bloom }) => {
    return (
        <Canvas camera={{fov: 70,  near: 0.1, far: 1000, position: [5, 2, 10]}} gl={{antialias: false}}
        dpr={window.devicePixelRatio} shadows>
            <PresentationControls enabled={true} snap={true}>
                <Suspense fallback={<ThreeSpinner />}>
                    {children}
                </Suspense>
                <pointLight intensity={0.2} position={[-5, -100, 1000]} />
            </PresentationControls>
            <EffectComposer multisampling={0}>
                <SMAA />
                <Bloom intensity={bloom} radius={0.6} luminanceThreshold={0.5}
                luminanceSmoothing={0.3} mipmapBlur />
                <Scanline blendFunction={BlendFunction.OVERLAY}
                density={0.8} />
            </EffectComposer>
        </Canvas>
    )
}

export default ConsoleViewer